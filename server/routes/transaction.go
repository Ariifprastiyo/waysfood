package routes

import (
	"WaysFood/handlers"
	"WaysFood/pkg/middleware"
	"WaysFood/pkg/mysql"
	"WaysFood/repositories"

	"github.com/labstack/echo/v4"
)

func TransactionRoutes(e *echo.Group) {
	transactionRepository := repositories.RepositoryTransaction(mysql.DB)
	cartsRepository := repositories.RepositoryCart(mysql.DB)
	orderRepository := repositories.RepositoryOrder(mysql.DB)
	h := handlers.HandlerTransaction(transactionRepository, cartsRepository, orderRepository)

	e.GET("/buyer-transaction", middleware.Auth(h.GetBuyerTransaction))
	e.GET("/partner-transaction", middleware.Auth(h.GetPartnerTransaction))
	e.GET("/transaction/:id", h.GetTransaction)
	e.GET("/transactions", h.FindTransaction)
	e.POST("/transaction", middleware.Auth(h.CreateTransaction))
	e.POST("/notification", h.Notification)
}
