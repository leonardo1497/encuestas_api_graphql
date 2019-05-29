const express = require('express');
const app = express();


var graphqlHTTP = require("express-graphql");
var {buildSchema} = require("graphql");
var {getEncuestas, addEncuesta,deleteEncuesta,updateEncuesta} = require("./data/encuestas");


var cors = require("cors");
var schema = buildSchema(`
    type Encuesta {
        fecha: String,
        estado: Int,
        preguntas: String,
        descripcion: String,
        nombre: String,
        id: Int
    },
    type Query {
        hello: String,
        encuestas: [Encuesta],
        encuesta(id: Int!): Encuesta,
    },
    type Mutation {
        createEncuesta(nombre:String!, descripcion: String!, preguntas: String!, estado: Int!,fecha: String!): Encuesta,
        deleteEncuesta(id: Int!): Encuesta,
        updateEncuesta(id: Int!, nombre:String!, descripcion: String!, preguntas: String!, estado: Int!,fecha: String!): Encuesta
    }
`);

var root = {
    hello:() =>{
        return "Hello world";
    },
    encuestas:() =>{
        return getEncuestas();
    },
    encuesta:({id}) => {
        const encuestas = getEncuestas();
        return encuestas.find(p => p.id === id);
    },
    createEncuesta: (args) => {
        const {nombre,descripcion,preguntas,estado,fecha} = args;
        return addEncuesta(nombre,descripcion,preguntas,estado,fecha);
    },
    deleteEncuesta:({id})=>{
        return deleteEncuesta(id);
    },
    updateProduct: args => {
        const {id,nombre,descripcion,preguntas,estado,fecha} = args;
        return updateProduct(id,nombre,descripcion,preguntas,estado,fecha);
    }
};

app.use(cors());

app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true
    })
);


app.listen(4000);
console.log("running a GraphQL API server at localhost:4000");