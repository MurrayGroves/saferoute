FROM node:18-alpine


COPY ./ ./

ENV BROWSER=none

LABEL org.opencontainers.image.source https://github.com/MurrayGroves/saferoute

# Install dependencies
RUN yarn install

CMD ["yarn", "start"]