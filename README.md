# devops-backend

FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Copy package*.json for dependencies requirements
COPY package*.json ./

# Install all required dependencies
RUN npm ci --only=production

# Bundle app source
COPY . .

# Expose port 7000 for our backend server
EXPOSE 7000

# Start server
CMD ["node", "./bin/www"]


# Commands to build container
docker build -t erwinlo/devops-backend .

docker images

test Github Actions trigger
