# base image
FROM node:alpine

# set working directory
WORKDIR /usr/tunebook-app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH ./node_modules/.bin:$PATH
# install app dependencies
COPY package.json yarn.lock ./
RUN yarn install
# Add the wait script to the image
EXPOSE 80
CMD yarn start