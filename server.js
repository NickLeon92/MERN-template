const express = require('express')
const app = express()
const port = process.env.PORT || 3000
//------------------------------------------------------new
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');



const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

const Person = require('./models/Person')

// const db = mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/testdb', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// });
console.log('apollo check: ', ApolloServer)
const startServer = async () => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });
  await apolloServer.start()
  console.log('apollo server check: ', server)
  apolloServer.applyMiddleware({ app });
}

startServer()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.post('/create', (req,res) => {
  Person.create(req.body).then(data => {
    res.json(data)
  }).catch(err => {
    res.status(400).json(err)
  })
})

app.get('/find', async (req,res) => {
  Person.find().then(data => res.json(data))
})
const publicPath = path.join(__dirname, './client/', 'build/');
app.use(express.static(publicPath));
app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});
//------------------------------------------------------new
// NOTE THIS FUNCTION ABSORBED ABOVE
// app.get('/', (req, res) => {
//   res.send('Server is up!')
// })

db.once('open', () => {
  app.listen(port, () => {
    console.log(`API server running on port ${port}!`);
  });
});