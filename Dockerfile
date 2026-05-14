FROM node:22-alpine

WORKDIR /app

# Copy the workspace configuration and lockfiles first
COPY package.json package-lock.json ./
COPY frontend/package.json frontend/
COPY backend/package.json backend/

# Install dependencies cleanly
RUN npm ci

# Copy the rest of the monorepo codebase
COPY . .

# Build both frontend and backend
RUN npm run build

# Start the application
EXPOSE 3000
ENV NODE_ENV=production

CMD ["npm", "start"]
