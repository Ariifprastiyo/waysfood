package handlers

import (
	productdto "WaysFood/dto/product"
	dto "WaysFood/dto/result"
	"WaysFood/models"
	"WaysFood/repositories"
	"context"
	"fmt"
	"net/http"
	"os"
	"strconv"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerProduct struct {
	ProductRepository repositories.ProductRespository
}

func HandlerProduct(ProductRepository repositories.ProductRespository) *handlerProduct {
	return &handlerProduct{ProductRepository}
}

// Create Product
func (h *handlerProduct) CreateProduct(c echo.Context) error {
	dataFile := c.Get("dataFile").(string)
	fmt.Println("This is data file", dataFile)

	price, _ := strconv.Atoi(c.FormValue("price"))
	Qty, _ := strconv.Atoi(c.FormValue("qty"))
	UserId, _ := strconv.Atoi(c.FormValue("user_id"))

	request := productdto.CreateProduct{
		Title:  c.FormValue("title"),
		Price:  price,
		Image:  dataFile,
		Qty:    Qty,
		UserID: UserId,
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	// Add your Cloudinary credentials ...
	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	// Upload file to Cloudinary ...
	resp, err := cld.Upload.Upload(ctx, dataFile, uploader.UploadParams{Folder: "WaysFood"})

	if err != nil {
		fmt.Println(err.Error())
	}

	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	product := models.Product{
		Title:  request.Title,
		Image:  resp.SecureURL,
		Price:  request.Price,
		UserID: int(userId),
	}

	data, err := h.ProductRepository.CreateProduct(product)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}

// Find Product
func (h *handlerProduct) FindProduct(c echo.Context) error {
	products, err := h.ProductRepository.FindProduct()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: products})
}

// Get ID Product
func (h *handlerProduct) GetProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	products, err := h.ProductRepository.GetProduct(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: products})
}

// Get Partner Product
func (h *handlerProduct) GetPartnerProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	products, err := h.ProductRepository.GetPartnerProduct(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: products})
}
