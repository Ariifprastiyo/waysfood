package transactiondto

type CreateTransactionRequest struct {
	Status     string `json:"status" form:"status"`
	Qty        int    `json:"qty" form:"qty" gorm:"type: int"`
	PartnerID  int    `json:"partner_id" form:"partner_id"`
	OrderID    int    `json:"order_id" form:"order_id"`
	TotalPrice int    `json:"total_price" form:"total_price"`
}
