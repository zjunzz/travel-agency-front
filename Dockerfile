FROM node:8.9.4

RUN mkdir -p /nodeApp

COPY Gruntfile.js /nodeApp/Gruntfile.js
COPY public /nodeApp/public
COPY scripts /nodeApp/scripts
COPY *.json /nodeApp/

WORKDIR /nodeApp

RUN npm install grunt -g && \
    npm install

EXPOSE 8000

CMD ["npm", "start"]
