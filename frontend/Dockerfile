FROM node:latest

RUN apt-get update && apt-get install apt-file -y && apt-file update

WORKDIR /usr/src/app/frontend/

COPY ./package.json         ./
COPY ./package-lock.json    ./

RUN npm i
# RUN npm run build
COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]
