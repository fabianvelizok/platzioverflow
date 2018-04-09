import Debug from 'debug';
import app from './app';

const PORT = 3000;
const debug = new Debug('Platzioverflow:root');

app.listen(PORT, () => {
  debug(`Server is running on port ${PORT}`);
});
