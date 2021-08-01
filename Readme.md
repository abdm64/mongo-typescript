## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Development ](#development)

  - [App Architecture](#app-archi)
  - [API Architecture Explained](#app-exp)
  - [Running the API](#app-run)
  - [Testing](#Test)

- [Deployment ](#deployment)
  - [Deployment Architecture](#dep-archi)
  - [Deployment Architecture Explained](#dep-exp)
  - [Docker](#docker)
  - [Kubernetes GKE](#k8s)
- [Built Using](#built_using)
- [Author](#authors)

## 🧐 About <a name = "about"></a>

- This  API allow you connect to a mongodb database  and preform CRUD operation via http request

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a Kubernetes  live system.

### Prerequisites

You need to install the fellowing software in order to get the application up and running :

- Node.js and npm.
- Docker.
- Kubernetes on cloud.
- Mongodb.

# Development <a name = "development"></a>

## APP Architecture <a name = "app-archi"></a>

- ![Alt text](./images/api-archi.png?raw=true "Title")

### APP Architecture Explained <a name = "app-exp"></a>

The application architecture contain 2 part

- express Nodejs application written in typescript that connect to mongodb to preform a CRUD Operations 
- the api get all the information from the  request to preform CRUD operation to the database ( see the api docs on /docs) 




### Installing

- Download and Install node.js and NPM from https://nodejs.org/en/download/ .

### Running the Node.js application <a name = "app-run"></a>

- Download or clone the project code from https://github.com/abdm64/mongo-typescript.git

- Install all required npm packages by running npm install from the command line in the app folder (where the package.json is located).

```
cd api
```

```
npm install
```

- Before start the application you should change the  keys in the api/src/config folder (ip, user, password etc) in order to connect to the database the default value will connect to a local database.

- Start the application in watch mode by running npm run serve from the command line in the app folder, you should see the message: "Server started on port: 3000". 
```
npm run serve
```

- Now you have  api that connected to the mongo database,you can visit the swagger documentation on http://localhost:3000/docs

### Testing <a name = "test"></a>
- to run the the test on watch mode just run npm run test:watch in the api directory 
```
npm run test:watch
```
- to run the test with Coverage just run npm run test in the api directory 

```
npm run test:watch
```
PS : the tests does NOT cover all use cases

# 🚀 Deployment <a name = "deployment"></a>

## Deployment Architecture <a name = "dep-archi"></a>

- ![Alt text](./images/api-dep.png?raw=true "Title")

## Deployment Architecture Explained <a name = "dep-exp"></a>

- In order to deploy this application in production mode we need :
  - Docker to build image for this application and push it to the docker hub or private registry .
  - Kubernetes cluster to run the application in production  mode from the image that was created .
  - Access to a bash CLI 

## Docker <a name = "docker"></a>

### Installing

- Download and install docker on your machine

### Build Docker image

- Build your own docker image and push it to your repo by running "docker build -t my-app-name:v1 . "
  from the command line in app folder

```
cd api
```

```
docker build -t my-app-name:v1 .
```

you need to push the image to [Docker hub](https://hub.docker.com) or your own registry .

### Run Docker image

- Run your Docker image for the application by the command line

```
docker run -e [inject your env variable here] my-app-name:v1
```


## Kubernetes  <a name = "k8s"></a>

- you should have access to Kubernetes cluster GKE or you can download and install a Kubernetes cluster  in your machine for  development purposes 
- install and configure ingress nginx on your Kubernetes cluster Please see [ingress nginx] (https://kubernetes.github.io/ingress-nginx/)



- To run the application on Kubernetes  just run the fellowing command from infra directory 


```
cd infra
```

```
bash deploy.sh 
```
- This script take care of everything, build docker image and deploy it to a kubernetes you must have kubectl cli 

- this will create 3 Kubernetes objects:

  - Deployment for the application with one pod ( running container) insuring high availability for that service.
  - Cluster ip service that connected to the pod .
  - ingress service that connect the cluster ip service with ingress-nginx load balancer .
  - Statefulset the mongodb database. 
  - PVC (Persistent Volume Claim) to store the data from the database 


- to drop the application just run the command :

```
kubectl delete  -f infra/k8s
```
PS : the config provided works on local k8s cluster with docker desktop in order to works in cloud  you must change env varible 

## ⛏️ Built Using <a name = "built_using"></a>
- [Mongodb](https://www.mongodb.com/) -  Node.js ORM for mongodb
- [Mongoose](https://mongoosejs.com/) -  Node.js ORM for mongodb
- [NodeJs](https://nodejs.org/en/) - Server side environment for javascript .
- [Express](https://nodejs.org/en/) -  back end web application framework for Node.js .
- [typescript](https://www.typescriptlang.org/) - TypeScript is an open-source language which builds on JavaScript .
- [Docker](https://www.docker.com/) - Software platform for building and packaging applications.
- [Kubernetes](https://kubernetes.io/) - Container Orchestration.

## ✍️ Author <a name = "authors"></a>

- [@abdm64](https://github.com/abdm64) Backend | DevOps Engineer @ [Cureety](https://www.cureety.com/en)

Made with ❤️ by Abdellah
