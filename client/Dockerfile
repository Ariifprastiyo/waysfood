# Set the base image to Node 16 (distroless)
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory in the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose the port that the Vite development server will listen on
EXPOSE 5173

# Start the Vite development server
CMD ["npm", "run", "host", "--", "--host", "0.0.0.0"]
