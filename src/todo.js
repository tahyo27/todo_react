import React, {useState, useEffect} from "react";

function Todo() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const storedUsername = localStorage.getItem("username"); 
    
    useEffect(() => {
      if(storedUsername != null) {
          console.log("로컬 저장 테스트"); 
          const storedTodosKey = `${storedUsername}_todos`;
          const storedTodos = JSON.parse(localStorage.getItem(storedTodosKey));
          //console.log("length" + storedTodos.length);
          if(storedTodos !== null) {
            setTodos(storedTodos);
          }
          console.log("storedTodos 체크 값 없으면 안보임" + storedTodos);
          // 저장된 todo가 있으면 JSON.parse를 사용해 배열로 변환
      } else {
          console.log("값 널임 테스트");
      }
  }, [storedUsername]); // storedUsername이 변경될 때만 이 코드를 실행

    //const todoList 

    //하고싶은것 이름과 todoList 연동해서 저장

    const addTodo = () => {
        if(inputValue.trim() !== "") {
            setTodos(prevTodos => [...prevTodos, inputValue]);
            setInputValue(''); // 입력값 비우기
        }
        
    }
     useEffect(() => {
        if (storedUsername) {
            // todos 상태를 문자열로 변환하여 저장
            localStorage.setItem(`${storedUsername}_todos`, JSON.stringify(todos));
        }
    }, [todos, storedUsername]);

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