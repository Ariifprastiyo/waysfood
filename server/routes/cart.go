package routes

import (
	"WaysFood/handlers"
	"WaysFood/pkg/mysql"
	"WaysFood/repositories"

	"github.com/labstack/echo/v4"
)

func CartRoutes(e *echo.Group) {
	cartRepository := repositories.RepositoryCart(mysql.DB)
	h := handlers.HandlerCart(cartRepository)

	e.POST("/cart", h.CreateCart)
	e.GET("/cart/:id", h.GetCart)
}
