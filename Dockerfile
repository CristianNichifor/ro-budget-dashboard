# Build stage: install deps and produce the static bundle.
FROM node:22-alpine AS build

ARG PNPM_VERSION=12.3.4
ARG VITE_API_BASE_URL=http://localhost:3000

ENV HUSKY=0
RUN npm install -g pnpm@${PNPM_VERSION}

WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
RUN pnpm build

# Runtime stage: serve the bundle with nginx (SPA fallback).
FROM nginx:1.27-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
