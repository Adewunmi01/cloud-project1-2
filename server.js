import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan'
import 'express-async-errors';
import helmet from 'helmet';
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
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public/')))
app.use(logger('combined'))

app.get('/hello', (req,res) => {
  res.send('<h1>Octave Website API</h1> <a href="/api-docs">Documentation</a>')
})

const port = process.env.PORT || 6000

const start = async () => {
    try {
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`))
  
      //CHECK THE RESULTS ON THE CONSOLE
      
     // console.log(setTrans);
      //console.log(setUsers);
    } catch (error) {
      console.log(error)
    }
  };
  
  start()