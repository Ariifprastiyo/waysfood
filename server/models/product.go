package models

type Product struct {
	ID     int                  `json:"id" gorm:"primaryKey:autoIncrement"`
	Title  string               `json:"title" form:"title" gorm:"type: varchar(255)"`
	Price  int                  `json:"price" form:"price" gorm:"type: int"`
	Image  string               `json:"image" form:"image" gorm:"type: varchar(255)"`
	Qty    int                  `json:"qty" form:"qty"`
	UserID int                  `json:"user_id" form:"user_id"`
	User   UsersProfileResponse `json:"user"`
}

type ProductResponse struct {
	ID     int                  `json:"id"`
	Title  string               `json:"title"`
	Price  int                  `json:"price"`
	Image  string               `json:"image"`
	UserID int                  `json:"user_id"`
	User   UsersProfileResponse `json:"user"`
}

func (ProductResponse) TableName() string {
	return "products"
}
