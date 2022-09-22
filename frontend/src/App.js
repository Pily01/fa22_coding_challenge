import { useState, useEffect } from 'react';

const API_PORT = "http://localhost:8080";

function App() {
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

  return (
    <div className="App">
      <h1> Welcome! </h1>
      <h4> These Are Your Tasks</h4>

      <div className='tasks'>
        {tasks.map (task => (
          <div className={"task " + (task.complete ? "complete" : "")} key={task._id} onClick={()=> completeTask(task._id)}>
            <div className="checkbox"></div>
            <div className="text">{ task.text }</div>
            <div className="delete-task">x</div>
          </div>
        ))}  
      </div>
    </div>
    
  );
}

export default App;
 