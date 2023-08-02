package repositories

import (
	"WaysFood/models"

	"gorm.io/gorm"
)

type ProductRespository interface {
	CreateProduct(product models.Product) (models.Product, error)
	FindProduct() ([]models.Product, error)
	GetProduct(ID int) (models.Product, error)
	GetPartnerProduct(ID int) ([]models.Product, error)
}

func RepositoryProduct(db *gorm.DB) *repository {
	return &repository{db}
}

// Create Product
func (r *repository) CreateProduct(product models.Product) (models.Product, error) {
	err := r.db.Create(&product).Error

	return product, err
}

// Find All Product
func (r *repository) FindProduct() ([]models.Product, error) {
	var products []models.Product
	err := r.db.Preload("User").Find(&products).Error

	return products, err
}

// Get ID Product
func (r *repository) GetProduct(ID int) (models.Product, error) {
	var product models.Product
	err := r.db.Preload("User").First(&product, ID).Error

	return product, err
}

// Get Partner Product
func (r *repository) GetPartnerProduct(ID int) ([]models.Product, error) {
	var products []models.Product
	err := r.db.Preload("User").Find(&products, "user_id", ID).Error

	return products, err
}
