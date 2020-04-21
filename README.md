# angular 基于docker的打包发布--踩坑记录

## 简单暴力的做法

### 本地打包+nginx启动

> 最简单暴力的做法，docker镜像中不需要集成任何环境，只需要安装nginx，配置http服务即可

> 具体配置如下

    FROM nginx:1.17.9
    LABEL maintainer="qichangjun<qicj@amberdata.cn>"
    COPY ./admin /usr/share/nginx/html/admin
    COPY ./nginx/nginx.conf /etc/nginx
    EXPOSE 7001
    CMD ["nginx","-g","daemon off;"]
    
> 直接拷贝打包好的文件，放到容器的nginx目录下，然后拷贝nginx配置文件启动nginx，搞定。但思前想后，这个做法太不优雅，且没有技术含量，所以琢磨在docker镜像里打包并用koa启动一个静态资源服务器

## 基于docker容器内打包angular

### 初次尝试

> 直接在网上找了一个项目的dockerfile文件，在其基础上进行改造,


    #引入node环境,版本为slim,网上查了下，这个好像是轻量级的带有node环境的系统
    FROM node:10-slim
    #个人标签
    LABEL MAINTAINER https://github.com/DIYgod/RSSHub/

    #这里算是我踩的第一个坑，后面详细说
    ENV NODE_ENV production
    ENV TZ Asia/Shanghai

    #设置变量，我这里暂时用不到
    ARG USE_CHINA_NPM_REGISTRY=0;
    ARG PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1;

    
    #更新apt-get,然后安装了一些他要用到的环境
    RUN apt-get update && apt-get install -yq libgconf-2-4 apt-transport-https git dumb-init --no-install-recommends && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

    #指定路径根目录
    WORKDIR /app

    #先拷贝package.json
    COPY package.json clean-nm.sh /app/

    #设置成国内的npm镜像
    RUN if [ "$USE_CHINA_NPM_REGISTRY" = 1 ]; then \
    echo 'use npm mirror'; npm config set registry https://registry.npm.taobao.org; \
    fi;

    #根据判断做了一些命令
    RUN if [ "$PUPPETEER_SKIP_CHROMIUM_DOWNLOAD" = 0 ]; then \
    apt-get install -y wget --no-install-recommends \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst ttf-freefont \
    --no-install-recommends \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get purge --auto-remove -y wget\
    && rm -rf /src/*.deb \
    && npm install --production && sh ./clean-nm.sh;\
    else \
    export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true && \
    npm install --production && sh ./clean-nm.sh;\
    fi;

    #拷贝整个项目到app目录下
    COPY . /app
    #指定暴露出的端口
    EXPOSE 1200
    ENTRYPOINT ["dumb-init", "--"]
    #执行启动命令
    CMD ["npm", "run", "start"]

### 加入python环境

> 我这里也用了 FROM node:10-slim
> 然后开始执行npm install,内部报错，提示安装node-gyp时没有找到python环境
> 开始在网上找方法，最初我直接在头上引入了 FROM python:2.7,但网上解释说这样会增加不必要的容器体积
> 开始尝试用linux安装python的方法
> 一开始我试着用apt-get install -y python2.7,结果报本地没有这个包，经过一番寻找，找到了正确的使用方法
>
    RUN set -ex \
    && apt-get update \
    && apt-get install -y make gcc g++ python \
    && rm -rf /var/lib/apt/lists/*   

> 这里包含了gcc g++ python，都是node-gyp需要使用的必要环境
> 开始执行............
> .........
> ......
> ....
> 发现奇慢无比，看来需要自己设置下国内镜像
> 创建文件sources.list,内容如下

    # 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
    deb http://mirrors.tuna.tsinghua.edu.cn/debian/ stretch main contrib non-free
    # deb-src http://mirrors.tuna.tsinghua.edu.cn/debian/ stretch main contrib non-free
    deb http://mirrors.tuna.tsinghua.edu.cn/debian/ stretch-updates main contrib non-free
    # deb-src http://mirrors.tuna.tsinghua.edu.cn/debian/ stretch-updates main contrib non-free
    deb http://mirrors.tuna.tsinghua.edu.cn/debian/ stretch-backports main contrib non-free
    # deb-src http://mirrors.tuna.tsinghua.edu.cn/debian/ stretch-backports main contrib non-free
    deb http://mirrors.tuna.tsinghua.edu.cn/debian-security stretch/updates main contrib non-free
    # deb-src http://mirrors.tuna.tsinghua.edu.cn/debian-security stretch/updates main contrib non-free

> 在Dockerfile中加入 COPY ./sources.list /etc/apt/
> 再次启动,发现npm install成功了，开始执行npm run build


###  ENV NODE_ENV production

> 控制台直接报错，说没有找到angular-devkit/build-angular,奇怪的是我在package.json的devDependencies里是声明了这个的,为什么他没有去下载?
> 找了半天，发现原来在Dockerfile里开头声明了

    ENV NODE_ENV production

> 这个意思就是你之后执行所有的npm命令，都是自带--production,所以npm install的命令自然没有去安装devDependencies里的内容
> 果断去掉

### 安装devDependencies里的依赖

> 首先就是node-sass报出 cannot donwload from github.com/xxxxxx/node-sass/...的错误，所以在Dockerfile里加上 npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
> 这样之后下载所有和node-sass有关的镜像都是从淘宝镜像上下载了

> 然后node-gyp rebuild的时候直接卡住，网上查了下，是因为他会去node官网下载node的源代码，而这个在国内也是因为网络问题导致下载奇慢
> 又经过一番搜索,发现可以自己在本地先下载下node的源代码包，然后再放进node-gyp中，于是开干

我本地下载了 node-v10.20.1-headers.tar.gz 的压缩包，然后在dockerfile中加入命令 


    RUN rm -rf ~/.node-gyp \
        && mkdir ~/.node-gyp \
        # 解压缩并重命名到正确格式
        && tar zxf node-v10.20.1-headers.tar.gz -C ~/.node-gyp \
        && mv ~/.node-gyp/node-v10.20.1 ~/.node-gyp/10.20.1 \
        # 创建一个标记文件
        && printf "9\n">~/.node-gyp/10.20.1/installVersion \

> npm install 终于能正确执行了
> ng build 也正常执行了

### 用koa启动http服务
> 在根目录创建index.js文件,加入以下代码

    const Koa = require('koa');
    const app = new Koa();
    const route = require('koa-route');
    const serve = require('koa-static');
    const path = require("path")

    // 1.主页静态网页 把静态页统一放到dist中管理
    const home   = serve(path.join(__dirname)+'/dist/');
    // 2.默认页
    const hello = ctx => {
    ctx.response.body = 'Hello World';
    };

    // 3.分配路由
    app.use(home); 
    app.use(route.get('/', hello));
    app.listen(3000);

    console.log('listening on port 3000');

> 由于我在angular.json里的outputPath写的是 'dist/teamwork'
> 所以我把更目录设置在dist目录下，这样访问 localhost:3000/teamwork就能访问到我的应用，而直接访问localhost:3000 看到的是'hello world'

### 打包运行镜像

> docker build -t teamwork:1.0 .
> ...没有报错
> docker run docker run -p 3000:3000 teamwork:1.0

> 访问我们本地的localhost:3000/teamwork ,启动成功

##大功告成