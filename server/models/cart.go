package models

type Cart struct {
	ID            int         `json:"id" gorm:"primaryKey:autoIncrement"`
	Qty           int         `json:"qty" form:"qty"`
	ProductID     int         `json:"product_id" form:"product_id" gorm:"type: int"`
	Product       Product     `json:"product"`
	TransactionID int         `json:"-" form:"transaction_id"`
	Transaction   Transaction `json:"-"`
}
