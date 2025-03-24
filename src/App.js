import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import React,{useState} from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { TaskProvider } from "./Components/TaskContext.jsx";
import Taskboard from './Components/List/List.jsx';
import Board from './Components/Board/Board.jsx';
function App() {
  const [filters, setFilters] = useState({ category: "All", dueDate: "" })
  return (
    <div className="App">
      
      <TaskProvider>
      <Router>
      <Navbar onFilterChange={setFilters} />
      <Routes>
          <Route path="/list" element={<Taskboard filters={filters}/>} />
          <Route path="/board" element={<Board filters={filters}/>} />
          <Route path="*" element={<Navigate to="/list" />} />
        </Routes>
      </Router>
      </TaskProvider>
    </div>
  );
}

export default App;
