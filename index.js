import express from "express";
import path from "path";

const __dirname = path.resolve(path.dirname(''));
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

const pokedex = [
    {
        id: 1,
        nome: 'bulbasaur',
        descricao: 'There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.',
        tipo: 'grass',
        imagem: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        altura: '0.7 m',
        peso: '6.9 kg',
        
    },
    {
        id: 2,
        nome: 'Charmander',
        descricao: 'There is It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail. a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.',
        tipo: 'fire',
        imagem: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png',
        altura: '0.6 m',
        peso: '8.5 kg',
    },
    {
        id: 3,
        nome: 'Squirtle',
        descricao: 'When it retracts its long neck into its shell, it squirts out water with vigorous force.',
        tipo: 'water',
        imagem: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png',
        altura: '0.5 m',
        peso: '9.0 kg',
    }
]

const port = 3001;
app.listen(port, () => console.log(`running in ${port}`));

app.get("/", (req, res) => {
    res.render("index", {pokedex});
});

app.get("/detalhes/:id", (req, res) => {
    let poke
    pokedex.filter((element) => {
        if(element.id == req.params.id){
            poke = element; 
        }
    });
    res.render("detalhes", {poke});
});

app.get("/cadastro", (req, res) => {
    res.render("cadastro");
});

app.post('/cadastro', (req, res) => {
    let id = pokedex[pokedex.length - 1].id + 1;
    const {nome, descricao, tipo, imagem, altura, peso} = req.body;
    pokedex.push({id: id, nome, descricao, tipo, imagem, altura, peso});
    res.redirect('/');
});