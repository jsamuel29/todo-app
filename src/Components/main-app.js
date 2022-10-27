import React, {useState,useEffect} from 'react';
import {AiFillDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { Outlet, Link } from "react-router-dom";





function MainApp() {
    const [isCompleted, setIsCompleted] = useState(false);
    const [allTodos,setTodos] = useState([]);
    const [newTitle,setNewTitle] = useState("");
    const [newDescription,setNewDescription] = useState("");
    const [completedTask, setCompletedTask] = useState([]);
    const [user, setUser] = useState("");
    const navigate = useNavigate()

    const handleAddToDo = () => {
        let newTodoItem = {
            title: newTitle,
            description: newDescription
        };

        let updatedTodoArr = [...allTodos];
        updatedTodoArr.push(newTodoItem);
        setTodos(updatedTodoArr);
        localStorage.setItem('todolist',JSON.stringify(updatedTodoArr))
    };

    const handleDeleteTodo = (index) => {
        let reducedTodo = [...allTodos];
        reducedTodo.splice(index);
        
        localStorage.setItem('todolist', JSON.stringify(reducedTodo));
        setTodos(reducedTodo)
    }

    const handleComplete = (index) => {
        let now = new Date();
        let dd = now.getDate();
        let mm = now.getMonth() + 1;
        let yyyy = now.getFullYear();
        let h = now.getHours();
        let m = now.getMinutes();
        let s = now.getSeconds();
        let completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':'+m+':' + s;

        let filteredItem = {
            ...allTodos[index],
            completedOn:completedOn
        }

        let updatedCompletedArr = [...completedTask];
        updatedCompletedArr.push(filteredItem);
        setCompletedTask(updatedCompletedArr);
        handleDeleteTodo(index);
        localStorage.setItem('completedTask', JSON.stringify(updatedCompletedArr));
    }

    const logoutUser = () => {
        setUser(null)
        navigate('/')
    }

    const handleDeleteCompletedTodo = (index) => {
        let reducedTodo = [...completedTask];
        reducedTodo.splice(index);
        
        localStorage.setItem('completedTask', JSON.stringify(reducedTodo));
        setCompletedTask(reducedTodo)
    };

    useEffect(() => {
        let savedTodo = JSON.parse(localStorage.getItem('todolist'));
        let savedCompletedTask = JSON.parse(localStorage.getItem('completedTask'));
        if (savedTodo) {
            setTodos(savedTodo);
        }

        if (savedCompletedTask) {
            setCompletedTask(savedCompletedTask);
        }
    },[])

    return (
        <div className="Application">
            <h1>Personal Todos</h1>

            <div className="todo-wrapper">
                <div className="todo-input">
                    <div className="todo-item-selection">
                        <label>Title</label>
                        <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="select your task" />
                    </div>
                    <div className="todo-item-selection">
                        <label>Description</label>
                        <input type="text" value={newDescription} onChange={(e) => setNewDescription (e.target.value)} placeholder="select your Description" />
                    </div>
                    <div className="todo-item-selection">
                        <button type="button" onClick={handleAddToDo} className="PrimaryBtn">Add</button>
                    </div>
                </div>

                <div className="btn-area">
                    <button className={`todo-btn ${isCompleted === false && 'active'}`} onClick={() => setIsCompleted(false)}>Todo</button>
                    <button className={`todo-btn ${isCompleted === true && 'active'}`} onClick={() => setIsCompleted(true)}>Completed</button>
                </div>
                <div className="todo-list">
                    
                    {isCompleted === false && allTodos.map((item,index)=> {
                        return(
                            <div className="item-selection" key={index}>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                                <div>
                                    <AiFillDelete className="icon" onClick={() => handleDeleteTodo(index)} />
                                    <BsCheckLg className="Check-icon" onClick={() => handleComplete(index)} />
                                </div>
                            </div>
                        )
                    })}

                    {isCompleted === true && completedTask.map((item,index)=> {
                        return(
                            <div className="item-selection" key={index}>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <p><small>Task Completed on: {item.completedOn}</small></p>
                                </div>
                                <div>
                                    <AiFillDelete className="icon" onClick={() => handleDeleteCompletedTodo(index)} />
                                </div>
                            </div>
                        )
                    })}

                    

                </div>
            </div>

            <button className="btn-2" onClick={() => logoutUser()}  type="submit">
                Logout
            </button>
        </div>
    )
}

export default MainApp;