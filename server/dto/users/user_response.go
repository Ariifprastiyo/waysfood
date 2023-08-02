package usersdto

type UserResponse struct {
	ID       int    `json:"id"`
	Email    string `json:"email" form:"email"`
	Password string `json:"password" form:"password"`
	FullName string `json:"fullname" form:"fullname"`
	Gender   string `json:"gender" form:"gender"`
	Phone    string `json:"phone" form:"phone"`
	Role     string `json:"role" form:"role"`
	Image    string `json:"image" form:"image"`
	Location string `json:"location" form:"location"`
}
