FROM oven/bun:1 AS builder

WORKDIR /tmp

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

COPY package.json bun.lock ./

RUN bun install --production

COPY . .

RUN bun run build

FROM nginx:stable-alpine
COPY --from=builder /tmp/dist /usr/share/nginx/html
