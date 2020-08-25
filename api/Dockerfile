# base image
FROM node:alpine

# set working directory
WORKDIR /usr/api

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH ./node_modules/.bin:$PATH
# install app dependencies
COPY package.json yarn.lock ./
RUN yarn install

EXPOSE 3000
CMD ["node", "."]