#get the tag from git
SHA=$(git rev-parse HEAD)
#Build  and tag docker image
docker build  -t getarive/api:latest -t getarive/api:$SHA -f ../api/Dockerfile ../api


#apply the deployment files 
kubectl apply -f k8s

#set the latest iamge tag 
kubectl set image deployments/api-depl getarive/api:$SHA