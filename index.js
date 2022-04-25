import express from "express";
import path from "path";

const __dirname = path.resolve(path.dirname(""));
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

const pokedex = [
  {
    id: 1,
    nome: "Bulbasaur",
    descricao:
      "Há uma semente de planta nas costas desde o dia em que este Pokémon nasce. A semente cresce lentamente.",
    tipo: "Planta",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
    altura: "0.7",
    peso: "6.9",
    categoria: "Semente",
    habilidade: "Overgrow",
  },
  {
    id: 2,
    nome: "Charmander",
    descricao:
      "Tem preferência por coisas quentes. Quando chove, diz-se que o vapor jorra da ponta de sua cauda.",
    tipo: "Fogo",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
    altura: "0.6",
    peso: "8.5",
    categoria: "Lagarto",
    habilidade: "Blaze",
  },
  {
    id: 3,
    nome: "Squirtle",
    descricao:
      "Quando retrai seu longo pescoço em sua concha, esguicha água com uma vigorosa força.",
    tipo: "Água",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
    altura: "0.5",
    peso: "9.0",
    categoria: "Pequena tartaruga",
    habilidade: "Torrent",
  },
];

const port = 3001;
app.listen(port, () => console.log(`running in ${port}`));

app.get("/", (req, res) => {
  res.render("index", { pokedex });
});

app.get("/detalhes/:id", (req, res) => {
  let poke;
  pokedex.filter((element) => {
    if (element.id == req.params.id) {
      poke = element;
    }
  });
  res.render("detalhes", { poke });
});

app.get("/cadastro", (req, res) => {
  res.render("cadastro");
});

app.post("/cadastro", (req, res) => {
  let id = pokedex[pokedex.length - 1].id + 1;
  const { nome, descricao, tipo, imagem, altura, peso, habilidade, categoria } =
    req.body;
  pokedex.push({
    id: id,
    nome,
    descricao,
    tipo,
    imagem,
    altura,
    peso,
    habilidade,
    categoria,
  });
  res.redirect("/");
});
