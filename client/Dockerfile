# base image
FROM node:alpine

# set working directory
WORKDIR /usr/tunebook-app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH ./node_modules/.bin:$PATH
EXPOSE 80
# install app dependencies
COPY package.json yarn.lock ./
RUN yarn install

# start app
CMD [ "yarn", "start", "port", "80"]
