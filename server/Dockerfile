# base image
FROM node:alpine

# set working directory
WORKDIR /usr/tunebook

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH ./node_modules/.bin:$PATH
# install app dependencies
COPY package*.json ./
RUN npm install

EXPOSE 8000
CMD ["npm", "start"]