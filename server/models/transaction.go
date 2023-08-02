package models

type Transaction struct {
	ID         int                  `json:"id" gorm:"primaryKey:autoIncrement"`
	TotalPrice int                  `json:"total_price" `
	BuyerID    int                  `json:"buyer_id" form:"buyer_id"`
	Buyer      UsersProfileResponse `json:"buyer"`
	PartnerID  int                  `json:"partner_id" form:"buyer_id"`
	Partner    UsersProfileResponse `json:"partner"`
	Status     string               `json:"status" form:"status"`
	Cart       []Cart               `json:"cart"`
}
