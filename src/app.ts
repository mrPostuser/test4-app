import express from 'express';
import userRoutes from './routes/user';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.send('Task3 working');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
