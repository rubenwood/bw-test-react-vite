# Tech Test

This project uses vite, react, typescript and express.
We also use concurrently to run the client and server together.

## Running the app

First, get all the dependencies, its also a good idea to build both the client and server before running.

In root:
```bash 
npm install
```

in client:
```bash
npm install
npm run build
```

in server:
```bash
npm install
npm run build
```

then you can go back to the root and run:
```bash
npm run dev
```

then

open http://localhost:5173


## Deployment

This project is deployed on Render.

You can access it here: https://bw-test-react-vite.onrender.com/

## Tests

There are some unit tests in client/src/tests/filterSpaces.test.ts
you can run those test with (assuming your cwd is root):
```bash
npx tsx .\client\src\tests\filterSpaces.test.ts
```