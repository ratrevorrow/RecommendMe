# FS-Beer-Recommender-frontend

## Install dependencies

`npm install`

## Run application

`npm start`

## Docker commands

[Reference](https://mherman.org/blog/dockerizing-a-react-app/)

build the project: `docker build -t sample:dev .`
run the project:
`docker run \
    -it \
    --rm \
    -v ${PWD}:/app \
    -v /app/node_modules \
    -p 3001:3000 \
    -e CHOKIDAR_USEPOLLING=true \
    recommendme:frontend`
