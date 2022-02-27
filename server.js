const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');

app.get('/', (req, res) => {
  res.send('Server is up!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})