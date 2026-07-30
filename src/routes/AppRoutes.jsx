import { BrowserRouter, Routes, Route } from "react-router-dom";
 
import Home from "../pages/Home/Home";
import Direitos from "../pages/Direitos/Direitos";
import Cursos from "../pages/Cursos/Cursos";
import Recursos from "../pages/Recursos/Recursos";
import Sobre from "../pages/Sobre/Sobre";
import Login from "../pages/Login/Login";
import Cadastro from "../pages/Cadastro/Cadastro";
import Mulheres from "../pages/Direitos/Mulheres/Mulheres";
import Criancas from "../pages/Direitos/Criancas/Criancas";
import Idosos from "../pages/Direitos/Idosos/Idosos";
import PCD from "../pages/Direitos/PCD/PCD";
import Racismo from "../pages/Direitos/Racismo/Racismo";
import Bullying from "../pages/Direitos/Bullying/Bullying";
import Assedio from "../pages/Direitos/Assedio/Assedio";
import Diversidade from "../pages/Direitos/Diversidade/Diversidade";
import SaudeMental from "../pages/Direitos/SaudeMental/SaudeMental";
import Trabalhistas from "../pages/Direitos/Trabalhistas/Trabalhistas";
import Familia from "../pages/Direitos/Familia/Familia";
import Beneficios from "../pages/Direitos/Beneficios/Beneficios";
import CursoDetalhe from "../pages/Cursos/CursoDetalhe";
import Denuncias from "../pages/Denuncias/Denuncias";
import Protocolo from "../pages/Protocolo/Protoclo";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
    
        <Route path="/" element={<Home />} />
 
        <Route path="/direitos" element={<Direitos />} />
 
        <Route path="/cursos" element={<Cursos />} />
 
        <Route path="/recursos" element={<Recursos />} />
 
        <Route path="/sobre" element={<Sobre />} />
 
        <Route path="/login" element={<Login />} />
 
        <Route path="/cadastro" element={<Cadastro />} />
        
        <Route path="/direitos/mulheres" element={<Mulheres/>} />

        <Route path="/direitos/criancas" element={<Criancas/>} />

        <Route path="/direitos/idosos" element={<Idosos/>} />

        <Route path="/direitos/pcd" element={<PCD/>} />
        
        <Route path="/direitos/racismo" element={<Racismo/>} />

        <Route path="/direitos/bullying" element={<Bullying/>} />

        <Route path="/direitos/assedio" element={<Assedio/>} /> 
        
        <Route path="/direitos/diversidade" element={<Diversidade/>} />

        <Route path="/direitos/saude-mental" element={<SaudeMental/>} />

        <Route path="/direitos/trabalhistas" element={<Trabalhistas/>} />

        <Route path="/direitos/familia" element={<Familia/>} />

        <Route path="/direitos/beneficios" element={<Beneficios/>} />

        <Route path="/cursos" element={<Cursos />} />

        <Route path="curso/:id" element={<CursoDetalhe/>} />

        <Route path="/denuncias" element={<Denuncias/>} />

        <Route path="/protocolo" element={<Protocolo/>} />
        
      </Routes>
    </BrowserRouter>
  );
}
 
export default AppRoutes;