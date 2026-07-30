import { useState } from "react";
import { Link } from "react-router-dom";
 
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
 
 
import "./style.css";

const categorias = [
  {
    titulo: "Mulheres",
    descricao: "Direitos, proteção e combate à violência.",
    palavrasChave:[
      "mulher",
      "violência",
      "agressão",
      "maria da penhas",
      "feminicídio",
      "abuso",
      "companheiro",
      "esposa"

    ],
    icone: "👩",
    rota: "/direitos/mulheres",
  },
  {
    titulo: "Crianças e Adolescentes",
    descricao: "ECA, proteção e desenvolvimento.",
    palavrasChave: [
      "criança",
      "adolescente",
      "eca",
      "menor",
      "escola",
      "adoção",
      "conselho tutelar"
    ],
    icone: "👶",
    rota: "/direitos/criancas",
  },
  {
    titulo: "Idosos",
    descricao: "Direitos e proteção da pessoa idosa.",
    palavrasChave: [
      "idoso",
      "idosa",
      "terceira idade",
      "aposentadoria",
      "60 anos",
      "estatuto do idoso"
],
     icone: "👴",
    rota: "/direitos/idosos",
  },
  {
    titulo: "Pessoas com Deficiência",
    descricao: "Inclusão e acessibilidade.",
    palavrasChave: [
  "pcd",
  "deficiência",
  "acessibilidade",
  "autismo",
  "cadeirante",
  "inclusão"
],
    icone: "♿",
    rota: "/direitos/pcd",
  },
  {
    titulo: "Racismo",
    descricao: "Combate à discriminação racial.",
    palavrasChave: [
  "racismo",
  "preconceito racial",
  "discriminação racial",
  "injúria racial",
  "etnia",
  "igualdade racial",
  "diversidade",
  "inclusão racial",
  "xenofobia",
  "intolerância",
  "afrodescendente",
  "racismo estrutural"
],
    icone: "✊",
    rota: "/direitos/racismo",
  },
  {
    titulo: "Bullying",
    descricao: "Proteção escolar e digital.",
    palavrasChave: [
  "bullying",
  "intimidação",
  "assédio",
  "humilhação",
  "zombaria",
  "ofensa",
  "apelido pejorativo",
  "ameaça",
  "exclusão",
  "constrangimento",
  "agressão verbal",
  "agressão física",
  "cyberbullying",
  "perseguição",
  "hostilidade"
],
    icone: "🏫",
    rota: "/direitos/bullying",
  },
  {
    titulo: "Assédio",
    descricao: "Assédio moral e sexual.",
    palavrasChave: [
  "assédio",
  "assédio moral",
  "assédio sexual",
  "importunação",
  "intimidação",
  "coação",
  "constrangimento",
  "ameaça",
  "perseguição",
  "chantagem",
  "abuso",
  "abuso de poder",
  "violência psicológica",
  "comentários inadequados",
  "cantadas indesejadas"
],
    icone: "🚨",
    rota: "/direitos/assedio",
  },
  {
    titulo: "Diversidade",
    descricao: "Respeito e inclusão.",
    palavrasChave: [
  "diversidade",
  "inclusão",
  "equidade",
  "igualdade",
  "pluralidade",
  "representatividade",
  "respeito",
  "pertencimento",
  "diversidade cultural",
  "diversidade étnica",
  "diversidade de gênero",
  "diversidade religiosa",
  "diversidade geracional",
  "acessibilidade",
  "direitos humanos"
],
    icone: "🏳️‍🌈",
    rota: "/direitos/diversidade",
  },
  {
    titulo: "Saúde Mental",
    descricao: "Apoio e orientação.",
    palavrasChave: [
  "saúde mental",
  "bem-estar emocional",
  "saúde emocional",
  "ansiedade",
  "depressão",
  "estresse",
  "esgotamento",
  "burnout",
  "pânico",
  "angústia",
  "sofrimento psicológico",
  "apoio psicológico",
  "equilíbrio emocional",
  "qualidade de vida",
  "acolhimento"
],
    icone: "🧠",
    rota: "/direitos/saude-mental",
  },
  {
    titulo: "Trabalhistas",
    descricao: "Direitos do trabalhador.",
    palavrasChave: [
  "direitos trabalhistas",
  "relação de trabalho",
  "CLT",
  "jornada de trabalho",
  "horas extras",
  "salário",
  "benefícios",
  "férias",
  "13º salário",
  "FGTS",
  "INSS",
  "rescisão",
  "demissão",
  "segurança do trabalho",
  "condições de trabalho"
],
    icone: "⚖️",
    rota: "/direitos/trabalhistas",
  },
  {
    titulo: "Família",
    descricao: "Guarda, pensão e convivência.",
    palavrasChave: [
  "família",
  "relacionamento familiar",
  "pais",
  "mãe",
  "pai",
  "filhos",
  "irmãos",
  "parentes",
  "convivência familiar",
  "apoio familiar",
  "guarda",
  "pensão alimentícia",
  "adoção",
  "violência doméstica",
  "conflito familiar"
],
    icone: "👨‍👩‍👧",
    rota: "/direitos/familia",
  },
  {
    titulo: "Benefícios Sociais",
    descricao: "Auxílios e programas sociais.",
    palavrasChave: [
  "benefícios sociais",
  "assistência social",
  "programa social",
  "auxílio",
  "Bolsa Família",
  "Cadastro Único",
  "CadÚnico",
  "Benefício de Prestação Continuada",
  "BPC",
  "INSS",
  "aposentadoria",
  "seguro-desemprego",
  "auxílio-doença",
  "auxílio-gás",
  "proteção social"
],
    icone: "💰",
    rota: "/direitos/beneficios",
  },
];
 
function Direitos() {
  const [pesquisa, setPesquisa] = useState("");
const textoPesquisa = pesquisa.trim().toLowerCase();
 
const categoriasFiltradas = categorias.filter((categoria) => {
  return (
    categoria.titulo.toLowerCase().includes(textoPesquisa) ||
    categoria.descricao.toLowerCase().includes(textoPesquisa) ||
    categoria.palavrasChave.some((palavra) =>
      palavra.toLowerCase().includes(textoPesquisa)
    )
  );
});
 

  return (
    <>
      <Navbar />
 
      <section className="rights-page">
 
        <div className="rights-header">
 
          <span className="rights-badge">
            Central de Direitos
          </span>
 
          <h1>
            Conheça seus direitos e saiba onde buscar ajuda
          </h1>
 
          <p>
            Informações acessíveis para orientar,
            proteger e apoiar cidadãos.
          </p>
 
        </div>
 
        <div className="search-container">
 
          <input
  type="text"
  placeholder="Pesquisar assunto..."
  value={pesquisa}
  onChange={(e) => setPesquisa(e.target.value)}
/>
 
 
        </div>
 
        <div className="rights-grid">
 
          {categoriasFiltradas.length > 0 ? (
 
  categoriasFiltradas.map((categoria) => (
 
    <Link
      key={categoria.titulo}
      to={categoria.rota}
      className="rights-card"
    >
 
      <h3>
        {categoria.icone} {categoria.titulo}
      </h3>
 
      <p>{categoria.descricao}</p>
 
    </Link>
 
  ))
 
) : (
 
  <div className="no-results">
 
    <h3>Nenhum resultado encontrado.</h3>
 
    <p>
      Tente pesquisar outro assunto.
    </p>
 
  </div>
 
)}
 
        </div>
 
      </section>
 
      <Footer />
    </>
  );
}
 
export default Direitos;
 