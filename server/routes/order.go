package routes

import (
	"WaysFood/handlers"
	"WaysFood/pkg/middleware"
	"WaysFood/pkg/mysql"
	"WaysFood/repositories"

	"github.com/labstack/echo/v4"
)

func OrderRoutes(e *echo.Group) {
	orderRepository := repositories.RepositoryOrder(mysql.DB)
	h := handlers.HandlerOrder(orderRepository)

	e.POST("/order", middleware.Auth(h.CreateOrder))
	e.GET("/order", h.FindOrder)
	e.GET("/order-user", middleware.Auth(h.GetOrderbyUser))
	e.DELETE("/order/:id", middleware.Auth(h.DeleteOrder))
}
