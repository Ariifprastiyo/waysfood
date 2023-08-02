package repositories

import (
	"WaysFood/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	CreateTransaction(transaction models.Transaction) (models.Transaction, error)
	FindTransaction() ([]models.Transaction, error)
	GetTransaction(ID int) (models.Transaction, error)
	GetBuyerTransaction(BuyerID int) ([]models.Transaction, error)
	GetPartnerTransaction(PartnerID int) ([]models.Transaction, error)
	UpdateTransaction(status string, orderId int) (models.Transaction, error)
}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

// Create Transaction
func (r *repository) CreateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Preload("Cart.Product").Create(&transaction).Error

	return transaction, err
}

// Find All Transaction
func (r *repository) FindTransaction() ([]models.Transaction, error) {
	var transactions []models.Transaction
	err := r.db.Preload("Cart.Product").Preload("Buyer").Find(&transactions).Error

	return transactions, err
}

// Get Buyer Transaction
func (r *repository) GetBuyerTransaction(BuyerID int) ([]models.Transaction, error) {
	var transactions []models.Transaction
	err := r.db.Where("buyer_id=?", BuyerID).Preload("Cart.Product").Preload("Buyer").Preload("Partner").Find(&transactions).Error

	return transactions, err
}

func (r *repository) GetPartnerTransaction(PartnerID int) ([]models.Transaction, error) {
	var transactions []models.Transaction
	err := r.db.Where("partner_id=?", PartnerID).Preload("Cart.Product").Preload("Buyer").Preload("Partner").Find(&transactions).Error

	return transactions, err
}

// Get ID Transaction
func (r *repository) GetTransaction(ID int) (models.Transaction, error) {
	var transactions models.Transaction
	err := r.db.Preload("Buyer").First(&transactions, ID).Error

	return transactions, err
}

func (r *repository) UpdateTransaction(status string, orderId int) (models.Transaction, error) {
	var transaction models.Transaction
	r.db.Preload("Buyer").First(&transaction, orderId)

	transaction.Status = status
	err := r.db.Save(&transaction).Error
	return transaction, err
}
