package routes

import (
	"WaysFood/handlers"
	"WaysFood/pkg/middleware"
	"WaysFood/pkg/mysql"
	"WaysFood/repositories"

	"github.com/labstack/echo/v4"
)

func ProductRoutes(e *echo.Group) {
	productRepository := repositories.RepositoryProduct(mysql.DB)
	h := handlers.HandlerProduct(productRepository)

	e.POST("/product", middleware.Auth(middleware.UploadFile(h.CreateProduct)))
	e.GET("/products", h.FindProduct)
	e.GET("/products/:id", h.GetPartnerProduct)
	e.GET("/product/:id", h.GetProduct)
}
