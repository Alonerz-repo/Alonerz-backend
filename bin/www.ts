import app from '../src/app';
import { AppConfig } from '../src/common/interface';

const config: AppConfig = app.get('config');
const port = config.server.port;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
