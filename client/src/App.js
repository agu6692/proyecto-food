import './App.css';
import { Routes, Route, NavLink, Navigate } from "react-router-dom"
import { Entrada } from './components/Entrada';
import { Inicio } from './components/Inicio';
import { CrearReceta } from './components/CrearReceta';



function App() {
  return (
    
     
       <Routes>
           <Route path='/' element={<Entrada></Entrada>}></Route>
           <Route path='/inicio' element={<Inicio></Inicio>}></Route>
           <Route path="/crearReceta" element={<CrearReceta></CrearReceta>}> </Route>  
           
       </Routes>
     
    
    
  );
}

export default App;
