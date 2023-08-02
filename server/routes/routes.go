package routes

import "github.com/labstack/echo/v4"

func RouteInit(e *echo.Group) {
	AuthRoutes(e)
	UserRoutes(e)
	ProductRoutes(e)
	OrderRoutes(e)
	CartRoutes(e)
	TransactionRoutes(e)
}
