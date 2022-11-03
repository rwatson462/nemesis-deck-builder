FROM node:16

RUN apt-get update && apt-get upgrade -y

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

RUN mkdir /app
WORKDIR /app

ENTRYPOINT /entrypoint.sh
