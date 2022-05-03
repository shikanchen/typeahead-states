var express = require('express');
var cors = require('cors');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// GraphQL schema
var schema = buildSchema(`
  type Query {
    states(keyword: String): [State]
  },
  type State {
    id: Int
    name: String
  }
`);

var statesData = [
  {
    id: 0,
    name: 'New York'
  },
  {
    id: 1,
    name: 'California'
  }
]

var getStates = function(args) { 
  if (args.keyword) {
    var keyword = args.keyword;
    return statesData.filter(state => state.name.includes(keyword));
  } else {
    return statesData;
  }
}

// Root resolver
var root = {
  states: getStates,
};

var app = express();

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');