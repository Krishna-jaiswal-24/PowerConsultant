import { createServer } from 'http';
import app from './api/app.js';

const server = createServer(app);

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
