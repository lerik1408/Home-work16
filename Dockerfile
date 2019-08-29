
FROM node:10.15.1

RUN mkdir -p /project
WORKDIR /project

COPY . /project

EXPOSE 3000

CMD ["node", "server.js"]
