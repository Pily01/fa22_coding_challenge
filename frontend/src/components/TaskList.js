import { useState, useEffect } from 'react';
import "../styles/TaskList.css"

const API_PORT = "http://localhost:8080";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTask, setNewTask] = useState("");

  const GetTasks = () => {
    fetch(API_PORT)
    .then(res => res.json())
    .then(data => setTasks(data))
    .catch(err => console.error("ERROR: ", err))
  }

  useEffect(() => {
    GetTasks();

    console.log(tasks);
  }, []);

  const completeTask = async (id) => {
    const data = await fetch(API_PORT + "/complete/" + id, {method: "PUT"})
    .then(res => res.json())
    .catch(err => console.error("ERROR: ", err));

    setTasks(tasks => tasks.map( task => {
      if(task._id === data._id) {
        task.complete = data.complete;
      }
      return task;
    }))
  }

  const deleteTask = async (id) => {
    const data = await fetch(API_PORT + "/delete/" + id, {method: "DELETE"})
    .then(res => res.json())
    .catch(err => console.error("ERROR: ", err));

    setTasks(tasks => (
      tasks.filter(task => task._id !== data._id)
    ))
  }

  const addTask = async () => {
    const data = await fetch(API_PORT + "/create", 
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: newTask
      })
    })
    .then(res => res.json)
    .catch(err => console.error("ERROR: ", err))

    setTasks([...tasks, data]);
    setPopupActive(false);
  }

  return (
    <div className="App">
      <h1> Welcome! </h1>
      <h4> These Are Your Tasks</h4>

      <div className='tasks'>
        {tasks.map (task => (
          <div className={"task " + (task.complete ? "complete" : "")}
          onClick={()=> completeTask(task._id)}
          key={task._id}>
            <div className="checkbox"></div>
            <div className="text">{ task.text }</div>
            <div className="delete-task" 
                 onClick={() => deleteTask(task._id)}>x</div>
          </div>
        ))}  
      </div>

      <div className='addPopup' onClick={()=> setPopupActive(true)}>
        +
      </div>
      
      {popupActive ? (
        <div className='popup'>
          <div className='closePopup' onClick={()=> setPopupActive(false)}>
            X
          </div>
          <div className='newTaskContent'>
            <h3>New Task</h3>
            <input type="text" className='add-Task-input'
            onChange = {ev => setNewTask(ev.target.value)}
            value={newTask}/>
          </div>
          <div className='button' onClick={addTask}>Add Task</div>
        </div>

      ) :""}
    </div>
    
  );
}

export default TaskList;
 