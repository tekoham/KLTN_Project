# pull official base image
FROM node:14.15.3-alpine

ENV PATH /app/node_modules/.bin:$PATH

# add app
RUN apk add git
RUN npm i -isilent
# start app

EXPOSE 3000
