FROM node:12-alpine
WORKDIR /app
COPY . .
RUN yarn install --production
RUN yarn build
CMD ["yarn", "start"]