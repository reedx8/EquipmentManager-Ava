# Use the official Node.js 20 as a base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your application's code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run your app
CMD ["npm", "run", "dev"]
