import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../routes/Home";
import Detail from "../routes/Detail";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/:id" component={Detail} />
      </Router>
    </div>
  );
};

export default App;
