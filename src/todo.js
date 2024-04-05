import React, {useState, useEffect} from "react";

function Todo() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const storedUsername = localStorage.getItem("username"); 

    if(storedUsername == null) {
        console.log("값 널임 테스트");
    } else {
        console.log("로컬 저장 테스트")
    }
    //const todoList 

    //하고싶은것 이름과 todoList 연동해서 저장

    const addTodo = () => {
        if(inputValue.trim() !== "") {
            setTodos(prevTodos => [...prevTodos, inputValue]);
        }
    }
    return (
    <div>
        <input 
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
    );
}

export default Todo;