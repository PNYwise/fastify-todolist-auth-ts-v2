
import logger from "./config/winston";
import bootstrap from "./bootstrap";
import app from "./config/app";
import AppDataSource from "./config/database";



const server = bootstrap();
const appPort = app.appPort;
async function main() {
     AppDataSource.initialize().then(() => {
          logger.info('database connected');
          /**
           * run server
          */
         server.listen({ port: Number(appPort), host: '0.0.0.0' }, (err, address) => {
              if (err) {
                   logger.error(err);
                   logger.error("server down");
                   AppDataSource.destroy()
                   process.exit(1);
               }
               logger.info(`Server listening at ${address}`);
          });
     }).catch((error) => console.log(error))
}
main();
