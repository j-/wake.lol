FROM node:16 as builder

ENV SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN}

WORKDIR /tmp
COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build
RUN npm prune --production

FROM nginx:stable-alpine
COPY --from=builder /tmp/out /usr/share/nginx/html
