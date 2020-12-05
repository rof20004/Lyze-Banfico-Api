FROM node:10.22-alpine AS builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY yarn.lock .
COPY package.json .
RUN yarn --frozen-lockfile --ignore-optional

#COPY data data
COPY config config
COPY .babelrc .babelrc

COPY src/server src/server
RUN yarn run build:server:production


FROM node:10.22-alpine

WORKDIR /usr/src/app

RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.2/dumb-init_1.2.2_amd64 && \
    chmod +x /usr/local/bin/dumb-init

RUN chown node:node /usr/src/app

USER node

COPY yarn.lock .
COPY package.json .
RUN yarn --production=true --pure-lockfile --ignore-optional && yarn cache clean

COPY config config
#COPY --from=builder /usr/src/app/data ./data
COPY --from=builder /usr/src/app/build ./build

USER root

USER node

EXPOSE 8330

ENTRYPOINT ["/usr/local/bin/dumb-init", "--"]
CMD ["yarn", "start"]
