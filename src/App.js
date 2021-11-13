import "./styles/style.css";
import Nav from "./components/Nav";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Footer from "./components/Footer";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route path="/" exact>
          <Homepage />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
