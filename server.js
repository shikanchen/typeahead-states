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
  {name : "Wisconsin", lat: 44.500000,	lng: -89.500000},
  {name : "West Virginia", lat: 39.000000,	lng: -80.500000},
  {name : "Vermont", lat: 44.000000,	lng: -72.699997},
  {name: "Texas", lat: 31.000000, lng:	-100.000000},
  {name: "South Dakota",	lat: 44.500000, lng:	-100.000000},
  {name: "Rhode Island",	lat: 41.742325, lng:	-71.742332},
  {name: "Oregon",	lat: 44.000000, lng:	-120.500000},
  {name : "New York", lat: 43.000000,	lng: -75.000000},
  {name : "New Hampshire", lat: 44.000000,	lng: -71.500000},
  {name : "Nebraska", lat: 41.500000,	lng: -100.000000},
  {name: "Kansas",	lat: 38.500000, lng:	-98.000000},
  {name: "Mississippi",	lat: 33.000000, lng:	-90.000000},
  {name : "Illinois", lat: 40.000000,	lng: -89.000000},
  {name: "Delaware",	lat: 39.000000, lng:	-75.500000},
  {name : "Connecticut", lat: 41.599998,	lng: -72.699997},
  {name: "Arkansas",	lat: 34.799999, lng:	-92.199997},
  {name : "Indiana", lat: 40.273502,	lng: -86.126976},
  {name : "Missouri", lat: 38.573936,	lng: -92.603760},
  {name : "Florida", lat: 27.994402,	lng: -81.760254},
  {name : "Nevada", lat: 39.876019,	lng: -117.224121},
  {name: "Maine", lat: 45.367584, lng:	-68.972168},
  {name : "Michigan", lat: 44.182205,	lng: -84.506836},
  {name: "Georgia", lat: 33.247875, lng:	-83.441162},
  {name : "Hawaii", lat: 19.741755,	lng: -155.844437},
  {name : "Alaska", lat: 66.160507,	lng: -153.369141},
  {name : "Tennessee", lat: 35.860119,	lng: -86.660156},
  {name : "Virginia", lat: 37.926868,	lng: -78.024902},
  {name : "New Jersey", lat: 39.833851,	lng: -74.871826},
  {name : "Kentucky", lat: 37.839333,	lng: -84.270020},
  {name : "North Dakota", lat: 47.650589,	lng: -100.437012},
  {name : "Minnesota", lat: 46.392410,	lng: -94.636230},
  {name: "Oklahoma", lat: 36.084621, lng:	-96.921387},
  {name : "Montana", lat: 46.965260,	lng: -109.533691},
  {name: "Washington", lat: 47.751076, lng:	-120.740135},
  {name : "Utah", lat: 39.419220,	lng: -111.950684},
  {name : "Colorado", lat: 39.113014,	lng: -105.358887},
  {name : "Ohio", lat: 40.367474,	lng: -82.996216},
  {name : "Alabama", lat: 32.318230,	lng: -86.902298},
  {name: "Iowa", lat: 42.032974, lng:	-93.581543},
  {name : "New Mexico", lat: 34.307144,	lng: -106.018066},
  {name : "South Carolina", lat: 33.836082,	lng: -81.163727},
  {name : "Pennsylvania", lat: 41.203323,	lng: -77.194527},
  {name : "Arizona", lat: 34.048927,	lng: -111.093735},
  {name : "Maryland", lat: 39.045753,	lng: -76.641273},
  {name : "Massachusetts", lat: 42.407211,	lng: -71.382439},
  {name: "California", lat: 36.778259, lng:	-119.417931},
  {name : "Idaho", lat: 44.068203,	lng: -114.742043},
  {name : "Wyoming", lat: 43.075970,	lng: -107.290283},
  {name : "North Carolina", lat: 35.782169,	lng: -80.793457},
  {name : "Louisiana", lat: 30.391830,	lng: -92.329102}
]

var getStates = function(args) {
  if (args.keyword) {
    var keyword = args.keyword;
    return statesData.filter(state => state.name.toLowerCase().includes(keyword.toLowerCase()));
  } else {
    return statesData.filter(state => state.name === "");
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
