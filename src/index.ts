

const express = require ('express')
const http = require ('http')
const cors = require('cors')
const compression = require('compression')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose');
require('dotenv').config();
import authRouter from './router/authentification';




const dbURI = process.env.REACT_APP_API_URL;
console.log('MongoDB URI:', process.env.REACT_APP_API_URL);
mongoose.connect(dbURI)
   .then(() => {
    console.log('Connected to MongoDB');
  }).catch((err: any) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Middleware for handling CORS requests. This allows requests from different origins.
const app = express()

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'https://example.com'], // add your frontend URL here
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

app.use(compression())
app.use(bodyParser.json())
app.use(cookieParser())

const server = http.createServer(app)

// Sample route

// app.get('/', (req: any, res:any): any => {
//     res.json({ message: 'Hello, World!' })
//     res.send('hello world')

// })
// Routes 
app.use(authRouter);


server.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})



// Doc
 // Express server on the given port.
 // The server will start listening for incoming requests.
 // The console.log statement will be executed once the server is started.
 // Replace 'http://localhost:3000' with your frontend URL.
 // Replace 'https://example.com' with your frontend URL if you're using HTTPS.
 // Replace 'cors' with your preferred CORS middleware if you're using one.
 // Replace 'compression' with your preferred compression middleware if you're using one.
 // Replace 'bodyParser.json()' with your preferred body parser middleware if you're using one.
 // Replace 'cookieParser()' with your preferred cookie parser middleware if you're using one.
 // Replace '/api' with your desired API endpoint prefix.
 // Replace '/sample' with your desired API endpoint.
 // Replace 'GET' with the HTTP method you want to use for your API endpoint.
 // Replace 'res.json({ message: 'Hello, World!' })' with your desired response.
 // Replace 'console.log' with your preferred logging mechanism.
 // Replace 'http://localhost:3000' with your frontend URL.
 // Replace 'https://example.com' with your frontend URL if you're using HTTPS.
 // Replace 'cors' with your preferred CORS middleware if you're using one.
 