package productdto

type CreateProduct struct {
	Title  string `json:"title" form:"title"`
	Price  int    `json:"price" form:"price"`
	Image  string `json:"image" form:"image"`
	Qty    int    `json:"qty" form:"qty" gorm:"type : int"`
	UserID int    `json:"user_id" form:"user_id"`
}
