package models

type Transaction struct {
	ID         int    `json:"id" gorm:"primaryKey:autoIncrement"`
	TotalPrice int    `json:"total_price" `
	BuyerID    int    `json:"buyer_id" form:"buyer_id"`
	Buyer      User   `json:"buyer"`
	PartnerID  int    `json:"partner_id" form:"buyer_id"`
	Partner    User   `json:"partner"`
	Status     string `json:"status" form:"status"`
	Cart       []Cart `json:"cart"`
}
