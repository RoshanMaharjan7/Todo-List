import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

function Todo(props){
    return(
    <div key={props.index} className="flex items-center justify-between m-3 p-2 bg-[hsl(240,6%,20%)] rounded-lg border hover:scale-[1.03] hover:transition-all">
        <div className="flex grow items-center">
            <div className='flex flex-col bg-black justify-evenly items-center rounded-lg mr-2 hover:scale-110 transition-all'>
                <FontAwesomeIcon icon={faArrowUp} className='arrow-btns hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 hover:rounded-[10px_10px_0px_0px]' onClick={() => props.moveUp(props.index)}/>
                <FontAwesomeIcon icon={faArrowDown} className='arrow-btns hover:bg-gradient-to-r from-green-400 to-blue-500 hover:rounded-[0px_0px_10px_10px]' onClick={() => props.moveDown(props.index)}/>
            </div>
            <input type="checkbox" className="m-2 ml-0 accent-green-600" checked={props.todo.completed} onChange={() => props.handleCheck(props.index)}/>
            <form onSubmit={()=>props.handleEdit(props.index, props.todo.read)} className='w-[100%]'>
                <input type="text" ref={(e) => (props.inputRef.current[props.index] = e)} className='text-sm sm:text-base w-[100%] text-start bg-transparent focus:outline-none inline-block' value={props.todo.task} onChange={(e) => props.handleEditInput(e,props.index)} readOnly={props.todo.read}/>
            </form>
        </div>
        <div className='flex bg-black justify-evenly items-center rounded-lg ml-1 hover:scale-110 transition-all'>
            <FontAwesomeIcon icon={faTrash} className="icon-btns hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500" onClick={() => props.deleteFunction(props.index)}/>
            <FontAwesomeIcon icon={faPenToSquare} className='icon-btns hover:bg-gradient-to-r from-green-400 to-blue-500' onClick={() => props.handleEdit(props.index, props.todo.read)}/> 
        </div>
    </div>
    );
}

export default Todo;