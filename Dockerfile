
FROM node:10-slim

LABEL MAINTAINER https://github.com/qichangjun/

ARG NEED_NPM_REBUILD_NODE_SASS=0;

COPY ./sources.list /etc/apt/
RUN set -ex \
  && apt-get update \
  && apt-get install -y make gcc g++ python \
  && rm -rf /var/lib/apt/lists/*   

RUN mkdir /app 
WORKDIR /app
COPY . /app/

# 获得 nodejs 版本号
RUN rm -rf ~/.node-gyp \
    && mkdir ~/.node-gyp \
# 解压缩并重命名到正确格式
    && tar zxf node-v10.20.1-headers.tar.gz -C ~/.node-gyp \
    && mv ~/.node-gyp/node-v10.20.1 ~/.node-gyp/10.20.1 \
# 创建一个标记文件
    && printf "9\n">~/.node-gyp/10.20.1/installVersion \
    && npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/ \
    && npm install -g @angular/cli@7.3.9 \
    && npm install \    
    && npm run build;

# RUN if [ "$NEED_NPM_REBUILD_NODE_SASS" = 1 ]; then \
#   echo '需要在install后重新构建node_sass'; npm install \
#   && npm rebuild node-sass;\
#   else \
#   npm install;\
#   fi;

# RUN 

EXPOSE 3000

CMD ["npm", "run", "start:serve"]
