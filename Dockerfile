FROM node:12-alpine as build

RUN mkdir -p /usr/build/ts-event-processor

COPY ./package.json /usr/build/ts-event-processor

WORKDIR /usr/build/ts-event-processor

RUN yarn

COPY . /usr/build/ts-event-processor

RUN yarn build

RUN ls -lt

CMD ["node", "/usr/build/ts-event-processor/dist/server.js"]