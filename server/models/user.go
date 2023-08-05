package models

type User struct {
	ID        int    `json:"id" gorm:"primaryKey:autoIncrement"`
	Email     string `json:"email" form:"email" gorm:"type: varchar(255)"`
	Password  string `json:"password" form:"password" gorm:"type: varchar(255)"`
	FullName  string `json:"fullname" form:"fullname" gorm:"type: varchar(255)"`
	Gender    string `json:"gender" form:"gender" gorm:"type: varchar(255)"`
	Phone     string `json:"phone" form:"phone" gorm:"type: varchar(255)"`
	Role      string `json:"role" form:"role" gorm:"type: varchar(255)"`
	Image     string `json:"image" form:"image" gorm:"type: varchar(255)"`
	Location  string `json:"location" form:"location" gorm:"type: varchar(255)"`
	Latitude  string `json:"latitude" form:"latitude" gorm:"type: varchar(255)"`
	Longitude string `json:"longitude" form:"longitude" gorm:"type: varchar(255)"`
}

type UsersProfileResponse struct {
	ID         int    `json:"id"`
	FullName   string `json:"fullname"`
	Email      string `json:"email"`
	Phone      string `json:"phone"`
	Image      string `json:"image"`
	Location   string `json:"location"`
	Latitude   string `json:"latitude"`
	Longtitude string `json:"longtitude"`
}

func (UsersProfileResponse) TableName() string {
	return "users"
}
