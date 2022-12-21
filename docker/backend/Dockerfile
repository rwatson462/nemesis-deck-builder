FROM node:18

RUN apt-get update && apt-get upgrade -y

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh


# This may help fix an error install node modules
RUN mkdir /tmp/npm
RUN npm config set cache /tmp/npm --global
RUN chown -R 1000:1000 /tmp/npm

RUN mkdir /app
WORKDIR /app

ENTRYPOINT /entrypoint.sh
