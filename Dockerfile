# Step 1: Build app
FROM node:lts-bookworm-slim AS build

WORKDIR /budgetapp

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

# Step 2: Run with NGINX
FROM nginx:alpine

COPY --from=build /budgetapp/build /usr/share/nginx/html

# For React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf
