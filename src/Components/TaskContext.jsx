import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
 
  const initialTasks = JSON.parse(localStorage.getItem("tasks")) || {
    todo: [
      { id: uuidv4(), title: "Interview with Design Team", due: "Today", category: "Work",status:"todo" },
      { id: uuidv4(), title: "Team Meeting", due: "30 Dec, 2024", category: "Personal" ,status:"todo"},
    ],
    inProgress: [
      { id: uuidv4(), title: "Morning Workout", due: "Today", category: "Personal" ,status:"inProgress"},
      { id: uuidv4(), title: "Code Review", due: "Today", category: "Work" ,status:"inProgress"},
    ],
    completed: [
      { id: uuidv4(), title: "Submit Project Proposal", due: "Today", category: "Work" ,status:"completed"},
      { id: uuidv4(), title: "Birthday Gift Shopping", due: "Today", category: "Personal",status:"completed" },
    ],
  };

  const [tasks, setTasks] = useState(initialTasks);

 
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};


export const useTasks = () => useContext(TaskContext);
