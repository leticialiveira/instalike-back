// AULA 3
import express from "express";
import multer from "multer";
import cors from "cors";
import { listPosts , createPosts, uploadImageController, putPosts} from "../controllers/postController.js";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200,
};

// aqui serve para o windows
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
// onde ele vai salvar as imagens no nosso servidor
const upload = multer({ dest: "./uploads" , storage})

 const routes = (app) => {
   app.use(express.json()); // servidor vai devolver json
  app.use(cors(corsOptions)); 
  // rota que ta trazendo os dados do banco
  app.get("/posts", listPosts);
  // aula 4
  // rota para criar um post
  app.post("/posts", createPosts);
  
  app.post("/upload", upload.single('image'), uploadImageController);

  app.put("/upload/:id", putPosts)

};

export default routes;