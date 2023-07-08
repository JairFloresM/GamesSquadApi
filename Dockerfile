FROM node:latest

WORKDIR /app

COPY . ./

RUN chmod -R 777 src/public/images

RUN npm install

EXPOSE 5000

RUN rm -fr .git

CMD npm run start