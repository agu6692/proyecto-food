import './App.css';
import { Routes, Route } from "react-router-dom"
import { Entrada } from './components/Entrada';
import { Inicio } from './components/Inicio';
import { CrearReceta } from './components/CrearReceta';
import { RecetaDetallada } from './components/RecetaDetallada';
import { NoEncontrado } from './components/NoEncontrado';




function App() {
    
  return (
       
     
       <Routes>
           <Route path='/' element={<Entrada></Entrada>}></Route>
           <Route path='/inicio' element={<Inicio ></Inicio>}></Route>
           <Route path="/crearReceta" element={<CrearReceta></CrearReceta>}> </Route>
           <Route path='/recetaDetalle' element={<RecetaDetallada></RecetaDetallada>}></Route>
           <Route path='/*' element={<NoEncontrado></NoEncontrado>}></Route>
           
       </Routes>
     
    
    
  );
}

export default App;
