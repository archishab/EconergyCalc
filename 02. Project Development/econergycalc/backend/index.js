const connectToMongo = require('./db')

connectToMongo().then(() => {
    console.log('Database initialization completed.');
}).catch((error) => {
    console.error('Error during database initialization:', error);
});

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})