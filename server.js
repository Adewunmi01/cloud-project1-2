import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan'
import 'express-async-errors';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import logger from 'morgan';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.json())
app.use(cors())
app.use(xss())
app.use(mongoSanitize())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(logger('combined'))

app.get('/', (req,res) => {
  res.send('<h1>TASK 1</h1>')
})

app.get('/hello', (req,res) => {
  res.send('<h1>TESTING WEB-SERVER</h1>')
})

app.get('/me', (req,res) => {
  res.send(`
       <h1>FULLNAME: Augustina Olawunmi Inumohi</h1>
       <h1>STUDENT ID: S2232380</h1>
  
  `)
})


app.get('/image', (req,res) => {
  const imagePath = path.join(__dirname, 'images', 'image1.jpg')
  res.sendFile(imagePath)
})

app.get('/images', (req,res) => {
  const filePath = path.join(__dirname, 'public','images.html')
  res.sendFile(filePath)
})

app.get('/images/1', (req,res) => {
  res.send(`
  <figure>
  <img style="width:200px; height=250px" src="https://storage.googleapis.com/serve-images/how-to-build-a-machine-learning-portfolio.jpeg" alt="image1">
    <figcaption style="font-style: italic; ">
      <h1>Image One</h1>
  </figcaption>
  </figure>
  
  `)
})

app.get('/images/2', (req,res) => {
  res.send(`
      <figure>
        <img style="width:200px; height=200px" src="https://storage.googleapis.com/serve-images/pexels-pixabay-220383.jpg" alt="image2">
          <figcaption style="font-style: italic; ">
            <h1>Image Two</h1>
        </figcaption>
      </figure>
  `)
})

app.get('/images/3', (req,res) => {
  res.send(`
  <figure>
  <img style="width:200px; height=200px" src="https://storage.googleapis.com/serve-images/logan-weaver-lgnwvr-amgv9YUg-MA-unsplash.jpg" alt="image3">
    <figcaption style="font-style: italic; ">
      <h1>Image Three</h1>
  </figcaption>
  </figure>
  `)
})



const port = process.env.PORT || 6000

const start = async () => {
    try {
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`))
  
    } catch (error) {
      console.log(error)
    }
  };
  
  start()

