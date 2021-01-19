FROM node:lts-alpine
MAINTAINER erwinlo@u.nus.edu

# Create app directory
WORKDIR /usr/src/app

# Copy package*.json for dependencies requirements
COPY package*.json ./

# Install all required dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose port 7000 for our backend server
EXPOSE 7000

# Start server
CMD ["node", "./bin/www"]
