// aula 1
import express from "express";
import routes from "./src/routes/postsRoutes.js";


const app = express(); //app representa o nosso servidor
// tudo que estiver aqui nessa pasta sera publico
app.use(express.static("uploads"))
routes(app)

// 3000 -> servidor local 
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");  
});

// app.get("/api", (req, res) => {
//     res.status(200).send("Olá, seja bem vindo a api!");
// });

// // atividade aula 1
// let obj = {
//     "titulo": "O senhor dos aneis",
//     "autor": "JRR Tolkien",
//     "ano": 1954,
//     "genero": "fantasia"
// }
// app.get("/livro", (req, res) => {
//     res.status(200).send(obj);
// })

