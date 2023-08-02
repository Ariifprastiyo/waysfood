package routes

import (
	"WaysFood/handlers"
	"WaysFood/pkg/middleware"
	"WaysFood/pkg/mysql"
	"WaysFood/repositories"

	"github.com/labstack/echo/v4"
)

func UserRoutes(e *echo.Group) {
	userRepository := repositories.RepositoryUser(mysql.DB)
	h := handlers.HandlerUser(userRepository)

	e.POST("/user", h.CreateUser)
	e.GET("/users", h.FindUsers)
	e.GET("/user/:id", h.GetUser)
	e.GET("/profile", middleware.Auth(h.GetUserProfile))
	e.GET("/partner", h.GetPartnerUser)
	e.PATCH("/user", middleware.Auth(middleware.UploadFile(h.UpdateUser)))
}
