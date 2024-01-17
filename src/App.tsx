import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lesson from "./pages/Lesson";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Lesson />} />
          <Route path="/lesson/:lessonId" element={<Lesson />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
