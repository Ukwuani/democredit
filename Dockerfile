FROM node:18-alpine

# Working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./

RUN yarn run ci --silent

# Copy source
COPY . .

# Build and cleanup
ENV NODE_ENV=development
RUN yarn run build \
 && yarn prune

# Start server
CMD yarn run start