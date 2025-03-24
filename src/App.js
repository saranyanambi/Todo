import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import React,{useState} from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { TaskProvider } from "./Components/TaskContext.jsx";
function App() {
  const [filters, setFilters] = useState({ category: "All", dueDate: "" })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <TaskProvider>
      <Router>
      <Navbar onFilterChange={setFilters} />
      </Router>
      </TaskProvider>
    </div>
  );
}

export default App;
