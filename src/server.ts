import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

let server: Server;

//main function
async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`App is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

//Gracefully shutting down
process.on('unhandledRejection', () => {
  console.log(`UnahandledRejection Detected , Shutting Down`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

//Instantly shutting down
process.on('uncaughtException', () => {
  console.log(`UncaughtException Detected , Shutting Down`);
  process.exit(1);
});
