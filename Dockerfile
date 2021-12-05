FROM node:16.10
ARG APP_NAME
ENV APP_NAME $APP_NAME

WORKDIR /usr/src/app
COPY . .
#Install Dependencies
RUN npm install nx -g
RUN yarn install
EXPOSE 3333
EXPOSE 8080
ENTRYPOINT ["npm", "run"]
