import 'dotenv/config';

import express from 'express';
import { mediaRoutes } from './routes/mediaRoutes';

const PORT = process.env.PORT;

const app = express();

app.use('/media', mediaRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});