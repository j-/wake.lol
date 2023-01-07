FROM node:lts-alpine3.17 as builder

WORKDIR /tmp

RUN chown node:node ./
USER node

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

COPY --chown=node:node package*.json ./

RUN npm ci && npm cache clean --force

COPY --chown=node:node . .

RUN npm run build
RUN npm prune --production

FROM nginx:stable-alpine
COPY --from=builder /tmp/out /usr/share/nginx/html
