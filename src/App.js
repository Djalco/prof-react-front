import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Form from "./Form";

function App() {
  const time = new Date().toLocaleString();

  return (
    <div className="container">
      <h1>Les Profs de l'école</h1>
      <p>{time}</p>
      <Router>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prof/:id" element={ <Form  edit={true}/>} />
          <Route path="/prof-create" element={<Form edit={false} />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
