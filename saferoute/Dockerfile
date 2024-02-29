FROM node:18-alpine

WORKDIR /app/

# Copy app from host environment into image
COPY public/ /app/public
COPY src/ /app/src
COPY package.json /app/

ENV BROWSER=none

LABEL org.opencontainers.image.source https://github.com/MurrayGroves/saferoute

# Install dependencies
RUN npm install

CMD ["npm", "start"]