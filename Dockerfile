FROM node:8.9.4

RUN mkdir -p /nodeApp

COPY Gruntfile.js /nodeApp/Gruntfile.js
COPY src /nodeApp/src
COPY scripts /nodeApp/scripts
COPY *.json /nodeApp/ 

WORKDIR /nodeApp

RUN npm install grunt -g && \
    npm install && \
    grunt build

EXPOSE 8000

CMD ["grunt", "serve"]
