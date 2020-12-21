FROM node:14.13.1-alpine3.11

# RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories && \
#     apk add --update ca-certificates git openssh-client && \
#     rm -rf /var/cache/apk/* /tmp/*

# Configure Git to download private modules
# RUN mkdir -p /root/.ssh
# COPY .gitconfig /root/.gitconfig
# COPY id_rsa /root/.ssh/id_rsa
# RUN git config --global url."git@code.aliyun.com:".insteadOf "https://code.aliyun.com/" && \
#     echo "ssh -l git -o StrictHostKeyChecking=no \"\$@\"" > /root/ssh.sh && \
#     chmod +x /root/ssh.sh
# ENV GIT_SSH=/root/ssh.sh

WORKDIR /opt

COPY package.json .

RUN npm config set registry https://registry.npm.taobao.org && npm install

COPY . .

# RUN git submodule init && git submodule update --remote
ENV EGG_SERVER_ENV=prod 

# TODO egg.js 生产环境需要 npm run tsc 编译为 js 后才能运行，但是 type-graphql 编译后反射 schema 会异常，因此这里暂时先用开发环境启动
RUN npm run tsc

# CMD [ "npm", "run", "dev" ]

CMD [ "npm", "start" ]
EXPOSE 7001
