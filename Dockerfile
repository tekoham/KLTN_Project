# pull official base image
FROM node:14.15.3-alpine

ENV PATH /app/node_modules/.bin:$PATH

RUN mkdir -p /app
COPY . /app
WORKDIR /app
# add app

# start app

EXPOSE 3000
