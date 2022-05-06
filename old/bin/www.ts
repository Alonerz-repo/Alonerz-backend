import { AppConfig } from '../common/interface';
import app from '../app';

const config: AppConfig = app.get('config');
const port = config.server.port;

const listenLog = `Server running on port ${port}`;
const listening = () => console.log(listenLog);

app.listen(port, listening);
