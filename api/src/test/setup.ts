import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';


let mongod: any;
beforeAll(async () => {
   mongod = await MongoMemoryServer.create()
   const mongoUri =  mongod.getUri();
  const url = "mongodb://localhost:27017/driveTest"

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  
  await mongod.stop();
  await mongoose.connection.close();
  
});