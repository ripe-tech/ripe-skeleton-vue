FROM node:lts-alpine

LABEL version="1.0"
LABEL maintainer="Platforme <development@platforme.com>"

EXPOSE 8080

ENV LEVEL INFO
ENV ENCODING gzip
ENV HOST 0.0.0.0
ENV PORT 8080
ENV CACHE 86400
ENV INDEX_FILES index.html
ENV PATH_REGEX ^[^\.]*$:index.html
ENV LIST_DIRS 0
ENV CORS 1
ENV BASE_PATH /app/dist
ENV NODE_ENV production

ADD .eslintrc.js /app/
ADD index.html /app/
ADD package.json /app/
ADD webpack.config.js /app/
ADD css /app/css
ADD js /app/js
ADD res /app/res
ADD vue /app/vue

WORKDIR /app

RUN apk update &&\
    apk add --no-cache git python3 py3-pip make g++
RUN pip3 install --no-cache-dir --upgrade netius &&\
    NODE_ENV=dev yarn install &&\
    yarn run build

CMD ["/usr/bin/python3", "-m", "netius.extra.filea"]
