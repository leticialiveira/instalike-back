import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectionBank from "../config/dbConfig.js"
const conection = await conectionBank(process.env.STRING_CONECTION);


// Função assíncrona para buscar todos os posts do banco de dados
export  async function getAllPosts() {
    const db = conection.db("imersao-instabytes"); // está conectado no banco
    const colecao = db.collection("posts"); // seleciona a coleção
    return colecao.find().toArray(); // retorna um array com todos os dados da coleção posts
}

export  async function createModelPost(post) {
    const db = conection.db("imersao-instabytes");
    const colecao = db.collection("posts");
    return colecao.insertOne(post); //insere ai um novo post
}

export  async function putModelPost(id, post) {
    const db = conection.db("imersao-instabytes");
    const colecao = db.collection("posts");
    const objId = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id : new ObjectId(objId)}, {$set: post});
}