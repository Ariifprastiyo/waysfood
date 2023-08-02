package repositories

import (
	"WaysFood/models"

	"gorm.io/gorm"
)

type OrderRepository interface {
	CreateOrder(order models.Order) (models.Order, error)
	FindOrder() ([]models.Order, error)
	GetOrderbyUser(ID int) ([]models.Order, error)
	UpdateOrder(order models.Order) (models.Order, error)
	GetOrderByUserProduct(IDB int, IDS int) (models.Order, error)

	DeleteAllOrder(IDB int) (models.Order, error)
	DeleteOrder(order models.Order, ID int) (models.Order, error)
	OrderId(ID int) (models.Order, error)
}

func RepositoryOrder(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) DeleteAllOrder(ID int) (models.Order, error) {
	var Order models.Order
	err := r.db.Where("buyer_id = ?", ID).Delete(&Order).Error

	return Order, err
}

func (r *repository) DeleteOrder(order models.Order, ID int) (models.Order, error) {
	err := r.db.Delete(&order, ID).Error

	return order, err
}

func (r *repository) OrderId(ID int) (models.Order, error) {
	var order models.Order
	err := r.db.First(&order, ID).Error

	return order, err
}

func (r *repository) CreateOrder(order models.Order) (models.Order, error) {
	err := r.db.Preload("Buyer").Create(&order).Error

	return order, err
}

func (r *repository) FindOrder() ([]models.Order, error) {
	var order []models.Order
	err := r.db.Preload("Product").Preload("Buyer").Preload("Partner").Find(&order).Error

	return order, err
}

func (r *repository) GetOrderbyUser(ID int) ([]models.Order, error) {
	var order []models.Order
	err := r.db.Where("buyer_id = ?", ID).Preload("Buyer").Preload("Product").Preload("Partner").Find(&order).Error

	return order, err
}

func (r *repository) UpdateOrder(order models.Order) (models.Order, error) {
	err := r.db.Save(&order).Error
	return order, err
}

func (r *repository) GetOrderByUserProduct(IDB int, IDP int) (models.Order, error) {
	var Order models.Order
	err := r.db.Where("buyer_id = ? AND product_id = ?", IDB, IDP).First(&Order).Error

	return Order, err
}
