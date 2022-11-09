const express = require('express');
const cors = require('cors');
 const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const reviewCollection = client.db('onlineSeller').collection('review');
         
        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            res.send(service);
        });

        app.post('/services', async (req, res) => {
            const addService = req.body;
            const result = await serviceCollection.insertOne(addService);
            res.send(result);
        });


        app.post('/review', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        })
 
    }
    finally {
 
    }
}

run().catch(err => console.log(err))


app.listen(port, () => {
    console.log(`online is running on ${port}`)
})
