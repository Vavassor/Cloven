FROM node:12
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . /app
RUN yarn install --frozen-lockfile
RUN yarn build
EXPOSE 80
CMD [ "yarn", "start" ]
