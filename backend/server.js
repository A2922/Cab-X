import express from 'express'
// import cabsRoutes from './routes/cabsRoutes.js'
import bookingsRoutes from './routes/bookingsRoute.js'
import userRoutes from './routes/usersRoute.js'
import cabRoutes from './routes/cabsRoute.js'
import connectDB from './config/db.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT;



connectDB(); // Connect to the database

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Server is ready')
})


app.use('/api/bookings',bookingsRoutes);
app.use('/api/users',userRoutes);
app.use('/api/cabs',cabRoutes);



app.listen(port, () => {
    console.log(`Server is running at ${port}`)
})