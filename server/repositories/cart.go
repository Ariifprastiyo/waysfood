package repositories

import (
	"WaysFood/models"

	"gorm.io/gorm"
)

type CartRepository interface {
	CreateCart(cart models.Cart) (models.Cart, error)
	GetCart(ID int) (models.Cart, error)
	FindProductID(ProductID []int) ([]models.Product, error)

	FindProductsById(ProductID []int) ([]models.Product, error)
	CartByTransaction(TrID int) ([]models.Cart, error)
}

func RepositoryCart(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindProductsById(ProductID []int) ([]models.Product, error) {
	var products []models.Product
	err := r.db.Find(&products, ProductID).Error

	return products, err
}

func (r *repository) CartByTransaction(TrID int) ([]models.Cart, error) {
	var cart []models.Cart
	err := r.db.Preload("Product").Find(&cart, "transaction_id = ?", TrID).Error

	return cart, err
}

// Create Cart
func (r *repository) CreateCart(cart models.Cart) (models.Cart, error) {
	err := r.db.Create(&cart).Error

	return cart, err
}

// Get Cart
func (r *repository) GetCart(ID int) (models.Cart, error) {
	var cart models.Cart
	err := r.db.Preload("Product").Preload("Product.User").Preload("Transaction").Preload("Transaction.Buyer").First(&cart, ID).Error

	return cart, err
}

// FindProduct
func (r *repository) FindProductID(ProductID []int) ([]models.Product, error) {
	var products []models.Product
	err := r.db.Find(&products, ProductID).Error

	return products, err
}
