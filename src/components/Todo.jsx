import React, { useState, useCallback, useEffect } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2
import classes from './Todo.module.css';

const Todo = (props) => {
  const [input, setInput] = useState("");
  const [toDoList, setToDoList] = useState([]);
  const [filter, setFilter] = useState('all');
  const [draggedItem, setDraggedItem] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [incompleteCount, setIncompleteCount] = useState(0);

  useEffect(() => {
    setIncompleteCount(toDoList.filter(item => !item.complete).length);
  }, [toDoList]);

  const handleDragOver = useCallback((e, index) => {
    e.preventDefault();
    if(toDoList[index] !== draggedItem) {
      setToDoList(prevList => {
        const newList = [...prevList];
        newList.splice(newList.indexOf(draggedItem), 1); 
        newList.splice(index, 0, draggedItem);
        return newList;
      })
    }
  }, [draggedItem, toDoList]);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.target.classList.add(classes.dragOver);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.target.classList.remove(classes.dragOver);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.target.classList.remove(classes.dragOver);
  }, []);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleEnter = (e) => {
    if(e.key === "Enter") {
      addItem();
    }
  };

  const addItem = () => {
    if(!input) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Enter a task!',
      });
      return;
    }

    const item = {
      id: Math.random().toString(),
      input: input,
      complete: false
    };

    setToDoList(prevList => [...prevList, item]);
    setInput("");
  };

  const handleCompletion = (id) => {
    setToDoList(prevList =>
      prevList.map(task =>
        task.id === id ? { ...task, complete: !task.complete } : task
      )
    );
  };

  const handleClearCompleted = () => {
    setToDoList(prevList =>
      prevList.filter(task => !task.complete)
    );
  };

  const filterHandler = (type) => {
    setSelectedFilter(type);
    setFilter(type);
  };

  return (
    <>
      <div>
        <label htmlFor="to-do-input">
          <span className={classes.circle} onClick={addItem}></span>
          <input
            className={`${classes.input} ${classes.containerDark}`}
            type="text"
            id="to-do-input"
            name="text"
            autoComplete="off"
            placeholder="Create a new to do..."
            value={input}
            onChange={handleInput}
            onKeyDown={handleEnter}
          />
        </label>
      </div>
      <div className={classes.listHolder}>
        <div className={classes.tasksContainer}>
          <ul>
            {toDoList.filter((entry) => {
              if(filter === "completed") {
                return entry.complete;
              } else if(filter === "active") {
                return !entry.complete;
              } else {
                return true;
              }
            }).map((entry, index) => (
              <div 
                key={index} 
                className={`${classes.toDoItem} ${classes.containerDark}`}
                draggable={true}
                onDragStart={() => setDraggedItem(entry)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnter={(e) => handleDragEnter(e)}
                onDragLeave={(e) => handleDragLeave(e)}
                onDrop={(e) => handleDrop(e)}
              >
                <button className={`${classes.TodoItemButton} ${entry.complete ? classes.completeBackground : ""}`} onClick={() => handleCompletion(entry.id)} />
                <li className={entry.complete ? classes.completedTask : ""}>{entry.input}</li>
              </div>
            ))}
          </ul>
        </div>
        <div className={`${classes.filterContainer} ${classes.containerDark}`}>
          <div className={classes.listLength}>{incompleteCount} items left</div>
          <div>
            <button className={`${classes.filterButton} ${selectedFilter === "all" ? classes.selected : ""}`} onClick={() => filterHandler("all")}>All</button>
            <button className={`${classes.filterButton} ${selectedFilter === "active" ? classes.selected : ""}`}  onClick={() => filterHandler("active")}>Active</button>
            <button className={`${classes.filterButton} ${selectedFilter === "completed" ? classes.selected : ""}`}  onClick={() => filterHandler("completed")}>Completed</button>
          </div>
          <div>
            <button className={classes.clearButton} onClick={handleClearCompleted}>Clear Completed</button>
          </div>
        </div>
      </div>
      <p className={classes.dragNDrop}>Drag and drop to re-order the list</p>
    </>
  );
};

export default Todo;
