const express = require('express');
const cors = require('cors');
 const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('online seller is running')
})

 

const uri = `mongodb+srv://${process.env.DB_SELLER}:${process.env.DB_PASSWORD}@cluster0.cg4wmwy.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
 
async function run() {
    try {
        const serviceCollection = client.db('onlineSeller').collection('services');
         
        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });
 
    }
    finally {
 
    }
}

run().catch(err => console.log(err))


app.listen(port, () => {
    console.log(`online is running on ${port}`)
})