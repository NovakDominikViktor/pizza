import { BrowserRouter as Router, NavLink, Routes, Route } from "react-router-dom";
import { PizzaListPage } from "./PizzaListPage";
import { PizzaSinglePage } from "./PizzaSinglePage";
import { PizzaCreatePage } from "./PizzaCreatePage";
import { PizzaModPage } from "./PizzaModPage";
import { PizzaDeletePage } from "./PizzaDeletePage";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={`/`} className="nav-link">
                <span className="nav-link">Pizzák</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/uj-pizza`} className="nav-link">
                <span className="nav-link">Új pizza</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<PizzaListPage />} />
        <Route path="/pizza/:pizzaId" element={<PizzaSinglePage />} />
        <Route path="/uj-pizza" element={<PizzaCreatePage />} />
        <Route path="/mod-pizza/:pizzaId" element={<PizzaModPage />} />
        <Route path="/del-pizza/:pizzaId" element={<PizzaDeletePage />} />
      </Routes>
    </Router>
  );
}

export default App;
