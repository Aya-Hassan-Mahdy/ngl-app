import 'dotenv/config'

import "./lib/db/mongoose.js"
import express from 'express';
import cors from 'cors' 
import { globalErrorHandler } from './lib/error/errror.handler.js';
import { router } from './route.js';
import { correlationId } from './pkg/correlation/correlationId.js';
import cookieParser from 'cookie-parser';

export function createApp(){

const app= express();

app.use(cookieParser())

app.use(cors( {origin: 'http://localhost:4200' }))

app.use('/src', express.static('uploads'))

app.use (express.json());

app.use(correlationId)

app.use('/api', router);


app.use (globalErrorHandler)

return app
}