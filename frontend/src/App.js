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


  return (
    <div className="App">
      <h1> Welcome! </h1>
      <h4> These Are Your Tasks</h4>

      <div className="tasks">
          <div className="task">
            <div className="checkbox"></div>
            <div className="text">Get the Bread</div>
            <div className="delete-task">x</div>
          </div>

          <div className="task complete">
            <div className="checkbox"></div>
            <div className="text">Get the Bread</div>
            <div className="delete-task">x</div>
          </div>
      </div>

      



    </div>
    
  );
}

export default App;
 