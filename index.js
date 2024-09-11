import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import  routes  from './routes/aiRoute.js';
const app = express();
app.use(express.json());
app.use(morgan('combined'));
app.use(cors());

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });
app.use('/api',routes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

