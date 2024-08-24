FROM node:20.17-alpine3.20

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install \
    && yarn cache clean

COPY . .

EXPOSE 5173

ENTRYPOINT [ "yarn" ]
CMD [ "serve" ]
