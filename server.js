const express = require('express')
const app = express()
const port = process.env.PORT || 3000
//------------------------------------------------------new
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});
// server.applyMiddleware({ app });
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// const publicPath = path.join(__dirname, './client/', 'build/');
// app.use(express.static(publicPath));
// app.get('*', (req, res) => {
//    res.sendFile(path.join(publicPath, 'index.html'));
// });
//------------------------------------------------------new
// NOTE THIS FUNCTION ABSORBED ABOVE
app.get('/', (req, res) => {
  res.send('Server is up!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})