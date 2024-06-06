import express from 'express';

import userRoutes from './routes/userRoutes';

const PORT = 3001;

const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

process.on('SIGINT', async () => {
  process.exit();
});
