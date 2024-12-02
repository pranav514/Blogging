# Use Node.js 20 base image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy only the package.json and package-lock.json to leverage caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Expose the port your app will run on
EXPOSE 3000

# Run the development server
CMD ["npm", "run", "dev"]
