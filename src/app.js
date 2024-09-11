import cookieParser from 'cookie-parser'
import e from 'express'
import morgan from 'morgan'
import cors from 'cors'

import authRoutes from './routes/auth.routes.js'
import postsRoutes from './routes/posts.routes.js'

const app = e()

// basic middleware
app.use(cors())
app.use(e.json())
app.use(morgan('dev'))
app.use(cookieParser())

//routes
app.use('/api', authRoutes)
app.use('/api', postsRoutes)

export default app
