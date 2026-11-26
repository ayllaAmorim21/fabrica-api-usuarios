const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());         // libera acesso de outros sites/front-ends
app.use(express.json()); // transforma o JSON recebido em req.body

let usuarios = [
  { id: 1, nome: 'Ana Silva', setor: 'TI', ativo: true },
  { id: 2, nome: 'Carlos Souza', setor: 'RH', ativo: true },
  { id: 3, nome: 'Mariana Costa', setor: 'TI', ativo: false },
];

// GET /usuarios: lista todos (ou filtra com ?setor=TI)
app.get('/usuarios', (req, res) => {
  const { setor } = req.query;

  if (setor) {
    const filtrados = usuarios.filter(
      (u) => u.setor.toLowerCase() === setor.toLowerCase()
    );
    return res.status(200).json(filtrados);
  }

  res.status(200).json(usuarios);
});

// GET /usuarios/:id: busca um usuário
app.get('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const usuario = usuarios.find((u) => u.id === Number(id));

  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }
  res.status(200).json(usuario);
});

// POST /usuarios: cadastra
app.post('/usuarios', (req, res) => {
  const { nome, setor } = req.body;

  if (!nome || !setor) {
    return res.status(400).json({ erro: 'Nome e setor são obrigatórios!' });
  }

  const novoUsuario = {
    id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
    nome,
    setor,
    ativo: true,
  };

  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});

app.listen(3000, () => {
  console.log('Fábrica operante na porta 3000');
});