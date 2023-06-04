import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NoteDetailPage from "./pages/NotesDetailPage";
import NotesPage from "./pages/NotesPage";

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="login">Login</Link>
            </li>
            <li>
              <Link to="register">Register</Link>
            </li>
            <li>
              <Link to="notes">App</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          {/* Routes definition */}
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/notes" element={<NotesPage />}></Route>
          <Route path="/notes/:id" element={<NoteDetailPage />}></Route>
          <Route path="*" element={<Navigate to="/" replace />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
