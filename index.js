import Server from './server/server.js'; // IMPORT default, sin llaves
import colors from 'colors';
import dotenv from 'dotenv';
dotenv.config();

const server = new Server(process.env.MONGO_URL);
server.listen();
console.log('Hola Nodemon')
