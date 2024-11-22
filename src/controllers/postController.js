// aula 3
import fs from "fs";
import {
  getAllPosts,
  createModelPost,
  putModelPost,
} from "../models/postModels.js";
import gerarDescricaoComGemini from "../services/gemineService.js";

// Controlador responsável por listar todos os posts
export async function listPosts(req, res) {
  const allPosts = await getAllPosts();
  res.status(200).json(allPosts);
}

// Controlador responsável por criar um novo post
export async function createPosts(req, res) {
  // Extrai os dados do novo post do corpo da requisição
  const newPost = req.body;
  try {
    const postCreated = await createModelPost(newPost);
    res.status(201).json(postCreated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controlador responsável por criar um novo post e fazer o upload de uma imagem
export async function uploadImageController(req, res) {
  // Extrai os dados do novo post do corpo da requisição
  const newPost = req.body;
  try {
    const postCreated = await createModelPost(newPost); // Gera o caminho completo para a imagem, utilizando o ID do post
    const imageUploaded = `uploads/${postCreated.insertedId}.png`; // Renomeia o arquivo da imagem para o novo caminho
    fs.renameSync(req.file.path, imageUploaded);
    res.status(201).json(postCreated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function putPosts(req, res) {
  const id = req.params.id;
  const urlImage = `http://localhost:3000/${id}.png`;
  try {
      const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
      const descrition = await gerarDescricaoComGemini(imgBuffer);
      const post = {
        imgUrl: urlImage,
        descrition: descrition,
        alt: req.body.alt,
      };
    const postCreated = await putModelPost(id, post);
    res.status(201).json(postCreated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
