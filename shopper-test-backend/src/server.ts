import 'dotenv/config'
import app from './app'
import './config/db/db'

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log('Server is running on port ', PORT))
