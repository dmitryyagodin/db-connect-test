# helsinki-city-bike-app

Uses docker with:
docker run --name bike-mysql-wvol -p 3306:3306 -e MYSQL_ROOT_PASSWORD=my-secret-pw -d --mount source=bikesvolume,target=/var/lib/mysql mysql

Tests db connection Node.js --> MySQL