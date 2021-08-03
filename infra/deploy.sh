#get the tag from git
SHA=$(git rev-parse HEAD)
#Build  and tag docker image
docker build  -t hobbies/api:latest -t hobbies/api:$SHA -f ../api/Dockerfile ../api


#apply the deployment files 
kubectl apply -f k8s

#set the latest iamge tag 
kubectl set image deployments/api-depl hobbies/api:$SHA