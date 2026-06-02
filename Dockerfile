# --- Base stage ---
FROM node:lts-bookworm-slim AS base
WORKDIR /usr/src/app
COPY package*.json ./

# --- Development stage ---
FROM base AS development
RUN npm ci --legacy-peer-deps
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

# --- Build stage ---
FROM base AS build

ARG VITE_FIREBASE_API_KEY
ARG VITE_AUTHDOMAIN
ARG VITE_PROJECT_ID
ARG VITE_STORAGE_BUCKET
ARG VITE_MESSAGING_SENDER_ID
ARG VITE_APP_ID
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ENV VITE_FIREBASE_API_KEY=$VITE_FIREBASE_API_KEY
ENV VITE_AUTHDOMAIN=$VITE_AUTHDOMAIN
ENV VITE_PROJECT_ID=$VITE_PROJECT_ID
ENV VITE_STORAGE_BUCKET=$VITE_STORAGE_BUCKET
ENV VITE_MESSAGING_SENDER_ID=$VITE_MESSAGING_SENDER_ID
ENV VITE_APP_ID=$VITE_APP_ID
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY

# npm ci instead of npm install to ensure reproduceable builds
RUN --mount=type=cache,target=/root/.npm \
    npm ci --legacy-peer-deps --cache /root/.npm \
    && chown -R node:node /usr/src/app
# Copy application source code (run as non-root user)
COPY --chown=node:node . .
USER node
RUN npm run build

# --- Production stage ---
FROM nginx:alpine AS production
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
