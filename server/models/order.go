package models

type Order struct {
	ID        int     `json:"id" gorm:"primaryKey:autoIncrement"`
	Qty       int     `json:"qty"`
	BuyerID   int     `json:"buyer_id" form:"buyer_id"`
	Buyer     User    `json:"buyer"`
	PartnerID int     `json:"partner_id" form:"partner_id"`
	Partner   User    `json:"partner"`
	ProductID int     `json:"product_id" form:"product_id" gorm:" type: int"`
	Product   Product `json:"product"`
}
