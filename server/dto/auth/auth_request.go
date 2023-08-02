package authdto

type AuthRequest struct {
	Email    string `json:"email" validate:"required" form:"email"`
	Password string `json:"password" validate:"required" form:"password"`
	FullName string `json:"fullname" validate:"required" form:"fullname"`
	Gender   string `json:"gender" validate:"required" form:"gender"`
	Phone    string `json:"phone" validate:"required" form:"phone"`
	Role     string `json:"role" validate:"required" form:"role"`
}

type LoginRequest struct {
	Email    string `json:"email" validate:"required" form:"email"`
	Password string `json:"password" validate:"required" form:"password"`
}

type LoginResponse struct {
	Email    string `json:"email"`
	FullName string `json:"fullname"`
	Role     string `json:"role"`
	Image    string `json:"image"`
	Token    string `json:"token"`
}
