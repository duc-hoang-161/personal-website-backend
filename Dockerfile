# Use an official Node.js image as the base image
FROM node:16

# Set the working directory in the image to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the image
COPY package*.json ./

# Copy the rest of the application code to the image
COPY . .

# Install the application dependencies
RUN yarn install

RUN yarn build

# Specify the command to start the Next.js application
CMD ["npm", "run", "start"]
EXPOSE 3000
