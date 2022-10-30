# AN-frontend <a target="_blank" rel="noopener noreferrer nofollow" href="https://github.com/among-neighbors/AN-frontend/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-Apache2.0-brightgreen" alt="license" data-canonical-src="https://img.shields.io/badge/License-Apache2.0-brightgreen" style="max-width: 100%;"></a> <a target="_blank" rel="noopener noreferrer nofollow" href="https://github.com/among-neighbors/AN-frontend/releases/tag/1.0.0"><img src="https://img.shields.io/badge/Release-1.0.0-ec8034" alt="license" data-canonical-src="https://img.shields.io/badge/Release-1.0.0-ec8034" style="max-width: 100%;"></a>
## 1. 소개

<img width="157" alt="logo" src="https://user-images.githubusercontent.com/67043922/198819170-dbb0ef03-cb85-4220-bfbd-3f1276776cf3.png">

> 소중한 이웃과 함께하는 이웃사이

이웃 간의 단절과 고령 1인 가구 증가로 인한 다양한 사회 문제를 해결하고자 다양한 주거 형태에 적용 가능한 관리 시스템 모델을 제시합니다.<br>
서비스에서 제공되는 편의 기능을 통해 이웃 간의 소통을 증진하고, 긴급 상황에 대처할 수 있는 환경을 조성합니다.

[이웃사이 위키 바로가기](https://github.com/among-neighbors/AN-backend/wiki)

<br>

## 2. 온프레미스 환경 구축 방법

### 사전 요구사항 (권장 버전)
git (1.8.3.1)<br/>
node (16.15.0)<br/>
npm (8.5.5)<br/>
docker (20.10.17)<br/>
docker-compose (1.26.0)<br/>
개인 소유의 도메인<br/>

### git clone을 통한 파일 다운로드

```shell
$ git clone https://github.com/among-neighbors/AN-frontend.git
```

### 빌드 파일 생성

```
$ cd /
$ cd AN-frontend/client
$ npm install
$ npm run build
```

### docker-compose 파일 실행을 위한 파일 디렉토리

```
home
├── AN-frontend
├── AN-frontend-manager
├── AN-frontend-builtin
└── Dockerfile
    ├── data
    ├── application.yml
    └── default.conf
```

application.yml과 default.conf 파일은 아래에 있습니다.<br/>
개인 소유 도메인을 default.conf의 [개인 소유 도메인]란에 작성합니다.<br/>
이때, Dockerfile 내 data는 certbot을 통한 ssl data이므로 밑의 과정을 실행할 시 자동 생성됩니다.<br/>

### docker-compose 파일 실행

```
$ cd /
$ cd Dockerfile
$ docker-compose -f application.yml up -d
```

<details>
<summary>application.yml</summary>
<div markdown="1">

```yaml
version: "3"
services:
  nginx:
    image: nginx:latest
    restart: unless-stopped
    volumes:
      - ./default.conf:/etc/nginx/conf.d/default.conf
      - ./data/certbot/conf:/etc/letsencrypt
      - ./data/certbot/www:/var/www/certbot
      - ../AN-frontend/client/dist:/usr/share/nginx/user
      - ../AN-frontend-manager/client/dist:/usr/share/nginx/manager
      - ../AN-frontend-builtin/client/dist:/usr/share/nginx/builtin
    ports:
      - 80:81
      - 443:443
  certbot:
    image: certbot/certbot
    restart: unless-stopped
    volumes:
      - ./data/certbot/conf:/etc/letsencrypt
      - ./data/certbot/www:/var/www/certbot
```

</div>
</details>

<details>
<summary>default.conf</summary>
<div markdown="1">

```nginx
server {
    listen       81;
    listen       [::]:81;
    server_name  [개인 소유 도메인];
    # access_log /var/log/nginx/local.access.log main;

    location /.well-known/acme-challenge/ {
        allow all;
        root /var/www/certbot;
     }

     location / {
         return 301 https://$host$request_uri;
     }

}

server {
    listen  443 ssl;
    listen  [::]:443 ssl;
    server_name [개인 소유 도메인];

    ssl_certificate /etc/letsencrypt/live/[개인 소유 도메인]/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/[개인 소유 도메인]/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_pass  http://localhost:80/user;
        proxy_set_header    Host                $http_host;
        proxy_set_header    X-Real-IP           $remote_addr;
        proxy_set_header    X-Forwarded-For     $proxy_add_x_forwarded_for;
    }

    location ^~ /manager {
        proxy_pass  http://localhost:80/manager;
        proxy_set_header    Host                $http_host;
        proxy_set_header    X-Real-IP           $remote_addr;
        proxy_set_header    X-Forwarded-For     $proxy_add_x_forwarded_for;
    }

    location ^~ /builtin {
        proxy_pass  http://localhost:80/builtin;
        proxy_set_header    Host                $http_host;
        proxy_set_header    X-Real-IP           $remote_addr;
        proxy_set_header    X-Forwarded-For     $proxy_add_x_forwarded_for;
    }

}

server {
    listen       80;
    listen       [::]:80;
    server_name  localhost;

     location /user {
        alias  /usr/share/nginx/user/;
        index  index.html index.htm;
        try_files   $uri $uri/ /user/index.html;
        sub_filter ../public/img ../img;
        sub_filter_once off;
        sub_filter_types *;
    }
    location /manager {
        alias  /usr/share/nginx/manager/;
        index  index.html index.htm;
        try_files   $uri $uri/ /manager/index.html;
        sub_filter ../public/img ../manager/img;
        sub_filter /assets/ /manager/assets/;
        sub_filter_once off;
        sub_filter_types *;
    }
    location /builtin {
        alias  /usr/share/nginx/builtin/;
        index  index.html index.htm;
        try_files   $uri $uri/ /builtin/index.html;
        sub_filter ../public/img ../builtin/img;
        sub_filter ../public/model ../builtin/model;
        sub_filter /assets/ /builtin/assets/;
        sub_filter_once off;
        sub_filter_types *;
    }
}
```

</div>
</details>

<br>

## 3. 이웃사이 웹서버 환경

이웃사이는 Nginx 도커 컨테이너를 통해 웹서버 환경을 구축하였습니다.

![이웃사이 웹서버 환경](https://github.com/among-neighbors/AN-frontend/blob/main/imgForReadme/client-runtime.jpeg?raw=true)

<br>

## 4. Open Source

[APACHE License](LICENSE)

[Contribution Guideline](CONTRIBUTING.md)
