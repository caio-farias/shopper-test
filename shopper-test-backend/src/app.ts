import express, { urlencoded, json } from 'express'
import logger from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import { errorHandler, notFoundHandler } from './util/util.module'
import { userRouter, orderRouter, productRouter } from './resources/resources.module'

const app = express()
const contextPath = process.env.CONTEXT_PATH || '/api/v1'

app.use(json())
app.use(urlencoded({ extended: true }))

app.use(helmet())
app.use(cors())
app.use(logger('dev'))

app.use(contextPath, userRouter)
app.use(contextPath, productRouter)
app.use(contextPath, orderRouter)

app.use(errorHandler)
app.use(notFoundHandler)

export default app
