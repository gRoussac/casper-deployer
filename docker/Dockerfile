# syntax=docker/dockerfile:1

FROM debian:12.4-slim
RUN apt-get update && apt-get install -y unzip wget
SHELL ["/bin/bash", "--login", "-c"]
RUN wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
RUN . ~/.bashrc
RUN nvm install --lts
WORKDIR /app
ADD https://github.com/gRoussac/casper-deployer-hackathon-oct-2022/archive/refs/heads/master.zip .
ARG TMP="./tmp"
RUN unzip -q ./*.zip -d ${TMP}
RUN mv ${TMP}/*/casper-rust-wasm-sdk/ ./
RUN mv ${TMP}/*/w* ./ && rm -rf ${TMP} *.zip
WORKDIR /app/www
ENV PORT=4242
RUN npm install --verbose
RUN npm run build --verbose
CMD npm run serve
