FROM node:14-alpine3.10 as ts-compiler

WORKDIR /usr/app

COPY package.json yarn.lock ./
COPY tsconfig*.json ./
RUN yarn
COPY . ./
RUN yarn build

FROM node:14-alpine3.10 as ts-remover
WORKDIR /usr/app
COPY --from=ts-compiler /usr/app/package.json ./
COPY --from=ts-compiler /usr/app/yarn.lock ./
COPY --from=ts-compiler /usr/app/build ./
RUN yarn --production

FROM gcr.io/distroless/nodejs:14
WORKDIR /usr/app
COPY --from=ts-remover /usr/app ./
USER 1000
CMD ["index.js"]