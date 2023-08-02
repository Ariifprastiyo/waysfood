package repositories

import (
	"WaysFood/models"

	"gorm.io/gorm"
)

type UserRepository interface {
	CreateUser(user models.User) (models.User, error)
	FindUsers() ([]models.User, error)
	GetUser(ID int) (models.User, error)
	GetUserProfile(UserID int) (models.User, error)
	GetPartnerUser() ([]models.User, error)
	UpdateUser(user models.User) (models.User, error)
}

func RepositoryUser(db *gorm.DB) *repository {
	return &repository{db}
}

// Create User
func (r *repository) CreateUser(user models.User) (models.User, error) {
	err := r.db.Create(&user).Error

	return user, err
}

// Find All User
func (r *repository) FindUsers() ([]models.User, error) {
	var users []models.User
	err := r.db.Find(&users).Error

	return users, err
}

// Get User By ID
func (r *repository) GetUser(ID int) (models.User, error) {
	var user models.User
	err := r.db.First(&user, ID).Error

	return user, err
}

// Get User Profiel
func (r *repository) GetUserProfile(UserID int) (models.User, error) {
	var user models.User
	err := r.db.First(&user, "user_id", UserID).Error

	return user, err
}

// Get Partner User
func (r *repository) GetPartnerUser() ([]models.User, error) {
	var users []models.User
	var role = "partner"
	err := r.db.Find(&users, "role=?", role).Error

	return users, err
}

// Update User
func (r *repository) UpdateUser(user models.User) (models.User, error) {
	err := r.db.Save(&user).Error

	return user, err
}
