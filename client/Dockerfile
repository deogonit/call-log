FROM node:13.12.0-alpine

WORKDIR /app/front/


# install app dependencies
COPY package.json /app/front/
RUN npm install

COPY . /app/front

EXPOSE 3000
CMD npm start
