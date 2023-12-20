FROM node:20

WORKDIR /usr/src/app/frontend/

COPY ./package.json         ./
COPY ./package-lock.json    ./

RUN npm i

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev", "--strictPort", "--host" ]
# -l 5157 is a port