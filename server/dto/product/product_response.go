package productdto

type ProductResponse struct {
	ID     int    `json:"id"`
	Title  string `json:"title"`
	Price  int    `json:"price"`
	Image  string `json:"image"`
	UserID int    `json:"user_id"`
}
