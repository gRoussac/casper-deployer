FROM --platform=linux/amd64 node:22.14-alpine as build
WORKDIR /app
RUN npm install -g npm@latest

ADD https://github.com/gRoussac/casper-deployer/archive/refs/heads/master.zip .
ARG TMP="./tmp"
RUN unzip -q ./*.zip -d ${TMP}
RUN mv ${TMP}/*/casper-rust-wasm-sdk/ ./
RUN mv ${TMP}/*/w* ./
RUN rm -rf ${TMP}
WORKDIR /app/www
ENV PORT=4242
RUN npm install
RUN npm run build

FROM --platform=linux/amd64 node:22.14-alpine as production

# Set the working directory in the production image
WORKDIR /app

# Copy only the build output from the build stage
COPY --from=build /app/www/dist /app/www/dist
RUN npm install @nestjs/common @nestjs/core @nestjs/platform-express http-proxy-middleware
COPY --from=build /app/www/node_modules/casper-rust-wasm-sdk-nodejs /app/node_modules/casper-rust-wasm-sdk-nodejs
COPY --from=build /app/www/package.json /app/www/package.json

# Set environment variables
ENV PORT=4242

# Expose the port (optional, but useful for Docker to know which port is exposed)
EXPOSE 4242

WORKDIR /app/www

# Run the application
CMD npm run serve
