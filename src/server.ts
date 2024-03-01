import app from "./app";
import { AppConfig } from './configs';

app.listen(AppConfig.port, () => {
    console.log('Server is listening on port', AppConfig.port);
});
