FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 5173

# Start the application
CMD ["yarn", "dev"]
