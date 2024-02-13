# API

I didn't use any database, I'm using in-memory storage for user data. So if you restart the server, all the data will be lost.
Also didn't find any need to throw 404 Not found error, since the only valid user is `JohnDoe@example.com`

## Run it locally

Make sure you are in the src folder, before run those commands.

```bash
npm i
```

```bash
node server.js
```

## Use docker

```bash
docker push adsonatural/api-demo:latest
```

```bash
docker run --name api-demo -p 3000:3000 -d adsonatural/api-demo
```

Do requests to http://localhost:3000/user/:username
