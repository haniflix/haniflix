
# Running
The backend deployment uses docker, to start the backend: run "docker compose up -d" and to stop it "docker compose down".
You can edit the docker-compose.yml.

## Setup Movie & Image Uploads folder

### Dev
Ensure movies are in ../../test movies

### Production
Ensure movies are in /var/www/html/cdn.haniflix.com/movies
Ensure docker has permission to create folders in /var/www/html/

## deployment

#### Setup bare git project on vps host and push
//old
git remote add production root@144.126.157.233:~/haniflix.git
//new
git remote add production root@86.48.21.215:~/haniflix.git

`git push production master`

