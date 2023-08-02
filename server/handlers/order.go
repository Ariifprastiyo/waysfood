package handlers

import (
	dto "WaysFood/dto/result"
	"WaysFood/models"
	"WaysFood/repositories"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerOrder struct {
	OrderRepository repositories.OrderRepository
}

func HandlerOrder(OrderRepository repositories.OrderRepository) *handlerOrder {
	return &handlerOrder{OrderRepository}
}

func (h *handlerOrder) DeleteAllOrder(c echo.Context) error {

	userLogin := c.Get("userLogin")
	buyerId := userLogin.(jwt.MapClaims)["id"].(float64)
	data, err := h.OrderRepository.DeleteAllOrder(int(buyerId))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}

func (h *handlerOrder) OrderId(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	Order, err := h.OrderRepository.OrderId(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: Order})
}

func (h *handlerOrder) DeleteOrder(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	order, err := h.OrderRepository.OrderId(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.OrderRepository.DeleteOrder(order, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}

func (h *handlerOrder) CreateOrder(c echo.Context) error {
	request := new(models.Order)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	userLogin := c.Get("userLogin")
	buyerId := userLogin.(jwt.MapClaims)["id"].(float64)

	Order := models.Order{
		Qty:       request.Qty,
		BuyerID:   int(buyerId),
		PartnerID: request.PartnerID,
		ProductID: request.ProductID,
	}

	data, err := h.OrderRepository.CreateOrder(Order)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})

	// OrderBuyer, _ := h.OrderRepository.GetOrderByUserProduct(request.BuyerID, request.ProductID)

	// if OrderBuyer.ID == 0 {
	// 	data, err := h.OrderRepository.CreateOrder(Order)
	// 	if err != nil {
	// 		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	// 	}
	// 	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
	// } else {
	// 	OrderBuyer.Qty = request.Qty
	// 	UpdateOrder, _ := h.OrderRepository.UpdateOrder(OrderBuyer)
	// 	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: UpdateOrder})
	// }

}

func (h *handlerOrder) FindOrder(c echo.Context) error {
	order, err := h.OrderRepository.FindOrder()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: order})
}

func (h *handlerOrder) GetOrderbyUser(c echo.Context) error {
	userLogin := c.Get("userLogin")
	buyerId := userLogin.(jwt.MapClaims)["id"].(float64)
	orders, err := h.OrderRepository.GetOrderbyUser(int(buyerId))

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: orders})
}
