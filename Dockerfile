FROM node:16 as builder

WORKDIR /tmp

RUN chown node:node ./
USER node

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

COPY --chown=node:node package*.json ./

RUN npm ci && npm cache clean --force

COPY next.config.js *.d.ts ./
COPY src/ public/ ./

RUN npm run build
RUN npm prune --production

FROM nginx:stable-alpine
COPY --from=builder /tmp/out /usr/share/nginx/html
