import { MongoClient } from 'mongodb'

// Connection URL
const url = Deno.env.get("MONGO_KEY");
if(!url) {
    Deno.exit(1);
}
const client = new MongoClient(url);

// Database Name
const dbName = 'harryPotterCompleto';

// Use connect method to connect to the server
await client.connect();
console.log('Connected successfully to server');
const db = client.db(dbName);
const collectionLogin = db.collection('login');
const collectionFavoritos = db.collection('favoritos');

export { collectionLogin, collectionFavoritos };