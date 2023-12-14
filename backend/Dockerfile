FROM node:20 As development

WORKDIR /app

COPY package.json .

COPY yarn.lock .

COPY . .

RUN yarn install --frozen-lockfile --non-interactive

RUN yarn run build

RUN yarn global add npm@10.2.5

EXPOSE 3000

COPY --chmod=744 ./docker-entrypoint.sh /docker-entrypoint.sh

ENTRYPOINT "/docker-entrypoint.sh"