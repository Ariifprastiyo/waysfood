# Menggunakan node image sebagai base image
FROM node:16

# Menentukan direktori kerja di dalam container
WORKDIR /app

# Menyalin package.json dan package-lock.json ke dalam direktori kerja
COPY package*.json ./

# Menginstall dependensi proyek
RUN npm install

# Menyalin seluruh konten proyek ke dalam direktori kerja di dalam container
COPY . .

# Port yang digunakan oleh proyek (sesuai dengan konfigurasi Vite)
EXPOSE 5173

# Menjalankan perintah untuk menjalankan aplikasi
CMD ["npm", "run", "dev"]
