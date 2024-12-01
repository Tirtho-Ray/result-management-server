import app from './app';
import mongoose from 'mongoose';
import {Server} from 'http';
import config from './app/config';
const port = config.port  ;
const url = config.database_url
// console.log(port,url);


let server:Server

async function main() {
  try{
    await mongoose.connect(url as string);
    server = app.listen(port,()=>{
      console.log(`Example app listening on port ${config.port}`);
    })
  }catch(err){
    // console.log(err);
  }

}
main();



process.on('unhandledRejection',()=>{
  // console.log(`👿😈unhandledRejection is detected , shutting down `);
  if(server){
    server.close(()=>{
      process.exit(1);
    })
  }
  process.exit(0);
})

process.on('uncaughtException',()=>{
  // console.log(`👿😈unhandledRejection is detected , shutting down `);
  process.exit(1);
})

