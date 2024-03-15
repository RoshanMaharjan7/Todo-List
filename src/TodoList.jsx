import React, {useState, useEffect, useReducer, useRef} from "react";
import Todo from './components/Todo.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

function reducer(state, action){
    switch(action.type){
        case 'ADD':
            return [...state, {task: action.args.task, completed: false, read: true}]
        
        case 'DELETE':
            return state.filter((_, i) => i !== action.args.taskID);

        case 'ISCHECKED':
            const newState = [...state];
            newState[action.args.taskID] = {...newState[action.args.taskID], completed: !(newState[action.args.taskID].completed)}
            return newState

        case 'ISREAD':
            const editState = [...state];
            editState[action.args.taskID] = {...editState[action.args.taskID], read: !(editState[action.args.taskID].read)}
            return editState

        case 'EDIT':
            let arr = [...action.args.newEdited]
            return arr;

        case 'UP':
            const updatedUp = [...state];
            [updatedUp[action.args.taskID], updatedUp[action.args.taskID-1]] = [updatedUp[action.args.taskID-1],updatedUp[action.args.taskID]];
            return updatedUp;
        
        case 'DOWN':
            const updatedDown = [...state];
            [updatedDown[action.args.taskID], updatedDown[action.args.taskID+1]] = [updatedDown[action.args.taskID+1],updatedDown[action.args.taskID]];
            return updatedDown;
            
    }
}


function ToDoList(){

    const [todoList, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem('todo-items')) || []);
    const [newTodo, setNewTodo] = useState("");
    const [displayTask, setDisplayTask] = useState(todoList);
    const inputRef = useRef([]);

    function handleInput(e){
        setNewTodo(e.target.value);
        e.preventDefault();
        
    }

    function handleEditInput(e,index,){
        e.preventDefault();
        let editedTodo = [...todoList]
        editedTodo[index].task = e.target.value
        
        dispatch({type: 'EDIT', args: {newEdited: editedTodo}})
        e.preventDefault();
    }

    function addNewTodo(e){
        e.preventDefault();
        if (newTodo != ""){
            dispatch({type : 'ADD', args: {task: newTodo}})
            setNewTodo("");
        }
    }

    function deleteTodo(index){
        dispatch({type: 'DELETE', args: {taskID: index}})
    }

    function displayCompleted(){
        const completedTodo = todoList.filter((element) => element.completed == true)
        setDisplayTask(completedTodo);
    }

    function displayUncompleted(){
        const unCompletedTodo = todoList.filter((element) => element.completed == false)
        setDisplayTask(unCompletedTodo);
    }

    function displayAll(){
        setDisplayTask(todoList);
    }

    function handleChecked(index){
        dispatch({type: 'ISCHECKED', args: {taskID: index}})
    }
    
    function handleEdit(index,read){
        if (read == true){
            dispatch({type: 'ISREAD', args: {taskID: index}})
            inputRef.current[index].focus();
            inputRef.current[index].style.color = 'red';

        } else{
            dispatch({type: 'ISREAD', args: {taskID: index}})
            inputRef.current[index].style.color = 'white';
        }
    }

    function moveUp(index){
        if(index > 0){
            dispatch({type: 'UP', args: {taskID: index}})
        }
    }

    function moveDown(index){
        if(index < todoList.length-1){
            dispatch({type: 'DOWN', args: {taskID: index}})
        }
    }

    useEffect(() =>{
        localStorage.setItem('todo-items',JSON.stringify(todoList))
        setDisplayTask(todoList);

    },[todoList])

    return(
        <div className="flex min-h-screen min-w-screen justify-center items-center max bg-[#000000]">
            <div className="min-h-[600px] w-[550px] bg-[#18181b] text-white text-center shadow-[4.0px_8.0px_8.0px_rgba(120,120,120,0.38)] rounded-lg border">
        
                <header className="p-2.5 m-2">
                    <h1 className="text-2xl sm:text-4xl m-2 font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">TO-DO List</h1>
                    <h2 className="text-xl sm:text-2xl  font-bold">Hello, User</h2>
                </header>
                <form onSubmit={addNewTodo} className="flex justify-center items-center p-2.5 m-2 mx-3 pl-0">
                    <FontAwesomeIcon className='relative left-[35px]' icon={faCirclePlus} />
                    <input type="text" className="text-sm e p-2 pl-9 grow rounded-3xl mx-2 bg-transparent border focus:bg-[hsl(240,6%,22%)]" value={newTodo} onChange={handleInput} placeholder="Enter New Task . . ."/>
                </form>
                

                <div className="m-3 grid grid-cols-3 divide-x">
                    <button className="btn" onClick={displayAll}>All</button>
                    <button className="btn" onClick={displayCompleted}>Completed</button>
                    <button className="btn" onClick={displayUncompleted}>Uncompleted</button>
                </div>


                {displayTask.map((todo, index) =>
                    <Todo key={index} todo={todo} index={index} handleCheck={handleChecked} deleteFunction={deleteTodo} handleEditInput={handleEditInput} handleEdit={handleEdit} moveUp={moveUp} moveDown={moveDown} inputRef={inputRef}/>    
                )}
                
        
            </div>
        </div>
    );
}

export default ToDoList;