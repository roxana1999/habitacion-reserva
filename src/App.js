import './Tailwind.css';
import PersonasTable from "./components/PersonasTable";
import HabitacionesTable from './components/HabitacionesTable';
import ReservasTable from './components/ReservasTable';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

//const Habitaciones = () => <h1>Hello from Habitaciones</h1>;
//const Reservas = () => <h1>Hello from Reservas</h1>;

function App() {
  return (
    <Router>
      {/* Navbar */}
      <nav className="bg-blue-500 p-4">
        <ul className="flex space-x-6">
          <li><Link to="/personas" className="text-white">Personas</Link></li>
          <li><Link to="/habitaciones" className="text-white">Habitaciones</Link></li>
          <li><Link to="/reservas" className="text-white">Reservas</Link></li>
        </ul>
      </nav>

      {/* Routes */}
      <div className="p-4">
        <Routes>
          <Route path="/personas" element={<PersonasTable />} />
          <Route path="/habitaciones" element={<HabitacionesTable />} />
          <Route path="/reservas" element={<ReservasTable />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
