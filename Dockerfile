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

ARG REACT_APP_FIREBASE_API_KEY
ARG REACT_APP_AUTHDOMAIN
ARG REACT_APP_PROJECT_ID
ARG REACT_APP_STORAGE_BUCKET
ARG REACT_APP_MESSAGING_SENDER_ID
ARG REACT_APP_APP_ID
ARG REACT_APP_SUPABASE_URL
ARG REACT_APP_SUPABASE_ANON_KEY

ENV REACT_APP_FIREBASE_API_KEY=$REACT_APP_FIREBASE_API_KEY
ENV REACT_APP_AUTHDOMAIN=$REACT_APP_AUTHDOMAIN
ENV REACT_APP_PROJECT_ID=$REACT_APP_PROJECT_ID
ENV REACT_APP_STORAGE_BUCKET=$REACT_APP_STORAGE_BUCKET
ENV REACT_APP_MESSAGING_SENDER_ID=$REACT_APP_MESSAGING_SENDER_ID
ENV REACT_APP_APP_ID=$REACT_APP_APP_ID
ENV REACT_APP_SUPABASE_URL=$REACT_APP_SUPABASE_URL
ENV REACT_APP_SUPABASE_ANON_KEY=$REACT_APP_SUPABASE_ANON_KEY

# npm ci instead of npm install to ensure reproduceable builds
RUN npm ci --legacy-peer-deps && chown -R node:node /usr/src/app
# Copy application source code (run as non-root user)
COPY --chown=node:node . .
USER node
RUN npm run build

# --- Production stage ---
FROM nginx:alpine AS production
COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
