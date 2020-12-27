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
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait ./wait
RUN chmod +x ./wait
EXPOSE 80
CMD ./wait && yarn start