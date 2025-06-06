import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";
import { Button, IconButton , Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import { useTasks } from "../TaskContext.jsx";


const Taskboard = ({filters}) => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const { tasks, setTasks } = useTasks();
  
  const [newTask, setNewTask] = useState("");
  const [date,setDate]=useState("");
  const [category,setCategory]=useState("")
  const [show,setShow]=useState(false)
  
  const [selectedStatus, setSelectedStatus] = useState("todo");

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const sourceColumn = [...tasks[source.droppableId]];
    const destColumn = [...tasks[destination.droppableId]];
    const [movedTask] = sourceColumn.splice(source.index, 1);
    destColumn.splice(destination.index, 0, movedTask);
    setTasks({ ...tasks, [source.droppableId]: sourceColumn, [destination.droppableId]: destColumn });
  };

  const addTask = () => {
    if (newTask.trim() === "") return;
    const task = { id: uuidv4(), title: newTask, due: date, category: category, status: selectedStatus };
    setTasks({ ...tasks, [selectedStatus]: [...tasks[selectedStatus], task] });
    setNewTask("");
  };

  const deleteTask = (status, taskId) => {
    setTasks({ ...tasks, [status]: tasks[status].filter((task) => task.id !== taskId) });
  };

  return (
    <div style={{ padding: "20px" }}>
        
      <DragDropContext onDragEnd={onDragEnd}>
        
        {Object.entries(tasks).map(([status, tasksList]) => (
          <Accordion key={status} defaultExpanded 
         >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}  sx={{
    backgroundColor: status === "todo" ? "##FAC3FF" : 
                     status === "inProgress" ? "#85D9F1" : 
                     status === "completed" ? "#CEFFCC" : "white"
  }}>
              <Box>{status.replace(/([A-Z])/g, " $1")} ({tasksList.length})</Box>
            </AccordionSummary>
            <AccordionDetails >
              <Droppable droppableId={status}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                     {status === "todo" && (
                <div style={{ marginTop: "10px", display: "flex", gap: "10px",flexDirection:"column", alignItems:"flex-start"}}>
                 <Box>
                  <Button onClick={()=>setShow(!show)} variant="contained" color="primary" startIcon={<AddIcon />}>Add</Button>
                  </Box>
                  {show &&(<Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" , flexDirection:"column"}}>
                    <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box>
                    <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add new task"
                    style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                  />
                    </Box>

                    <Box>
                    <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} name="Add Date"/>
                    </Box>

                    <Box >
                    <select onChange={(e)=>setSelectedStatus(e.target.value)}>
                    <option value="todo">todo
                    </option>
                    <option value="inProgress">
                    inprogress
                    </option>
                    <option value="completed">
                    complete
                    </option>
                    </select>
                    </Box>

                    <Box>
                    <select onChange={(e)=>setCategory(e.target.value)}>
                    <option value="work">
                    work
                    </option>
                    <option value="personal">
                          personal
                    </option>
                    </select>
                    </Box>

                  </Box>
                  <Box>
                    <button onClick={addTask}>Add</button>
                    <button>cancel</button>
                  </Box>
                </Box>)}
                </div>
              )}
              {tasksList.length==0?(<Box>No Tasks in {status}</Box>):(
                    <TableContainer component={Paper} style={{backgroundColor:"#0000001A"}}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Task Name</TableCell>
                          <TableCell>Due on</TableCell>
                          <TableCell>Task Status</TableCell>
                          <TableCell>Task Category</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody ref={provided.innerRef} {...provided.droppableProps}>
                        {tasksList.filter(task =>  (filters.category === "All" || task.category.toLowerCase() === filters.category.toLowerCase()) &&
                        (filters.dueDate === "" || task.due === filters.dueDate)).map((task, index) =>  (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => (
                              <TableRow ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                <TableCell>
                                  <Box sx={{display:"flex",alignItems:"center"}}>
                                     <Checkbox {...label} />
                                     <img src="/drag_icon.png" style={{height:"25px"}}/>
                                     {task.status === "completed" ? (
                                                    <img src="/greencheckmark.png" alt="Checkmark" style={{height:"25px"}}/>
                                                  ) : (
                                                    <img src="/checkmark.png" alt="Checkmark" style={{height:"25px"}}/>
                                                  )}
                                     
                                     <Box sx={{ textDecoration: task.status === "completed" ? "line-through" : "none" }}>{task.title}</Box>
                                     </Box></TableCell>
                                <TableCell>{task.due}</TableCell>
                                <TableCell><Box>{task.status}</Box></TableCell>
                                <TableCell>{task.category}</TableCell>
                                <TableCell>
                                  <IconButton onClick={() => deleteTask(status, task.id)} color="secondary">
                                    <DeleteIcon />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </TableBody>
                    </Table>
                  </TableContainer>
              )}
                  </div>
                )}
              </Droppable>
             
            </AccordionDetails>
          </Accordion>
        ))}
      </DragDropContext>
    </div>
  );
};

export default Taskboard;



