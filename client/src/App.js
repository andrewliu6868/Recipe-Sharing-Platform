import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {HomePage} from "./pages/Homepage.js";
import {Authentication} from "./pages/Authentication.js";
import {ViewRecipe} from "./pages/ViewRecipes.js";
import {CreateRecipe} from "./pages/CreateRecipes.js";

import {Navbar} from "./components/navbar.js";


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
          <Routes>
            <Route path ="/" element={<HomePage/>}/>
            <Route path ="/auth" element={<Authentication/>}/>
            <Route path ="/create" element={<CreateRecipe/>}/>
            <Route path ="/save" element={<ViewRecipe/>}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
