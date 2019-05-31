const sqlite3 = require('sqlite3').verbose();  
const database = new sqlite3.Database("./encuestas.db");  
const createContactTable = () => {  
    const query = `
        CREATE TABLE IF NOT EXISTS encuesta (
        id integer PRIMARY KEY,
        nombre varchar,
        descripcion text,
        preguntas text,
        estado integer,
        fecha date)`;
    return database.run(query);
}
createContactTable();  
var knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: "encuestas.db"
    }
  });

  const addEncuesta = (nombre,descripcion,preguntas,estado,fecha) =>{
    console.log("adding encuesta..."+ nombre) 
    return  knex('encuesta').insert({nombre: nombre, descripcion: descripcion,preguntas:preguntas,estado:estado,fecha:fecha}).then((response)=>{
        let data = {id:response[0],nombre: nombre,  descripcion: descripcion,preguntas:preguntas,estado:estado,fecha:fecha}
        console.log("response add: ",data);
        return data;
    })

}
 
const deleteEncuesta = (id) =>{
    console.log("delete "+id.id)
    return knex('encuesta').where('id', id).del().then((response)=>{
        console.log(response)
    }).catch((err) => { console.log( err); throw err }) 
}

const updateEncuesta=(id,nombre,descripcion,preguntas,estado,fecha)=>{
  
    return knex('encuesta').where('id', id).update({nombre: nombre,  descripcion: descripcion,preguntas:preguntas,estado:estado,fecha:fecha}).then((response)=>{
        let data = {id:id,nombre: nombre, descripcion: descripcion,preguntas:preguntas,estado:estado,fecha:fecha}
        console.log("update node: ",data);
        return data;
    }).catch((err) => { console.log( err); throw err })
}

const getEncuestas = () => {
    return new Promise((resolve,reject)=>{
        knex.select().from('encuesta').then((response)=>{
            resolve(response)
        })
        .catch((err) => { 
            console.log( err); throw err 
        })
    })
}

const getEncuesta = (id) =>{
    return new Promise((resolve,reject)=>{
        knex.select(id).from('encuesta').then((response)=>{
            resolve(response)
        })
        .catch((err) => { 
            console.log( err); throw err 
        })
    })
}

module.exports = {
    getEncuestas: getEncuestas,
    addEncuesta: addEncuesta,
    deleteEncuesta: deleteEncuesta,
    updateEncuesta: updateEncuesta,
    getEncuesta : getEncuesta
}