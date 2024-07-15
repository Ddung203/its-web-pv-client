# Notes about Docker

## This project

docker-compose up --build --no-cache

## Quản lý Docker Compose

docker-compose up

docker-compose up -d

docker-compose down

docker-compose up --build

docker-compose logs -f

## Khởi động và dừng container

docker stop my-container

docker start my-container

docker restart my-container

docker stop $(docker ps -q)

## Quản lý container

docker ps

docker ps -a

docker rm my-container

docker rm $(docker ps -a -q)

## Truy cập vào container

docker exec -it my-container /bin/bash

- -it: Chạy tương tác với terminal.
- /bin/bash: Chạy shell bash bên trong container.

docker exec my-container ls /app

docker logs -f my-container

docker stats my-container

## Sao lưu và khôi phục container

docker export my-container -o my-container.tar

docker import my-container.tar

## Tạo và sử dụng Docker volume

docker volume create my-volume

docker run -d --name my-container -v my-volume:/app my-image

docker volume ls

docker volume rm my-volume

## Networking trong Docker

docker network ls

docker network inspect my-bridge-network

docker network create my-bridge-network

docker network connect my-bridge-network my-container

docker network disconnect my-bridge-network my-container

docker network rm my-bridge-network

## Quản lý Docker Images

- Liệt kê tất cả các images đang có trên máy local

  docker images

- Tải một image từ Docker Hub về máy local

  docker pull image-name

- Xóa một image từ máy local

  docker rmi image-name

- Xóa tất cả các images không sử dụng (dangling)

  docker image prune

- Xây dựng (build) một image từ Dockerfile

  docker build -t image-name

- Đặt tag cho một image đã có

  docker tag id-image image-name:tag

- Đăng ký (push) một image lên Docker Hub

  docker push image-name

## Docker run

docker pull ddung203/web-pv-be:latest

docker run -d -p 8181:8181 ddung203/web-pv-be:latest

docker stop <CONTAINER_ID>

docker rm <CONTAINER_ID>

docker rmi <IMAGE_ID>

<http://localhost:8181/api/v1/ping>
