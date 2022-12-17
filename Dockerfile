FROM node:16 as builder

WORKDIR /tmp

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

COPY package*.json ./

RUN npm ci && npm cache clean --force

COPY next.config.js *.d.ts ./
COPY src/ ./

RUN npm run build
RUN npm prune --production

FROM nginx:stable-alpine
COPY --from=builder /tmp/out /usr/share/nginx/html
