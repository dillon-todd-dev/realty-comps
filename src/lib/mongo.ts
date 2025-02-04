import { env } from '@/env';
import { MongoClient, Db } from 'mongodb';

let client: MongoClient | null = null;
let mongoDb: Db | null = null;

export async function getMongoDb() {
  if (mongoDb) return mongoDb;

  client = new MongoClient(env.MONGO_URL);
  await client.connect();
  mongoDb = client.db();

  return mongoDb;
}
