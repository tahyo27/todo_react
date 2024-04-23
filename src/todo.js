import React, {useState, useEffect} from "react";
import styles from "./todo.module.css";

function Todo() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const storedUsername = localStorage.getItem("username");
    const [showModal, setShowModal] = useState(false);
    
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
            setTodos(prevTodos => [...prevTodos,
              {text: inputValue, completed:false}]);
            setInputValue(''); // 입력값 비우기
        }
        
    }
     useEffect(() => {
        if (storedUsername) {
            // todos 상태를 문자열로 변환하여 저장
            localStorage.setItem(`${storedUsername}_todos`, JSON.stringify(todos));
        }
    }, [todos, storedUsername]);

    const handleTodoClick = () => {
      setShowModal(true);
    };
  
    const closeModal = () => {
      setShowModal(false);
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        addTodo();
      }
    };

    const toggleTodo = (index) => {
      setTodos(prevTodos => {
        const newTodos = [...prevTodos];
        newTodos[index].completed = !newTodos[index].completed;
        return newTodos;
      });
    };

    const deleteTodo = (index) => {
      setTodos(prevTodos => prevTodos.filter((_, i) => i !== index));
    };

    return (
    <div className={styles.todo_input_box}>
      <div className={styles.todo_box} onClick={handleTodoClick}>ToDo</div>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modal_content}>
            <span className={styles.close} onClick={closeModal}>&times;</span>
            <div className={styles.today_box}>Today</div>
            <ul className={styles.ul_box}>
              {todos.map((todo, index) => (
                <li key={index}>
                  <div className={styles.checkbox_wrapper}>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(index)}
                    />
                    <span className={todo.completed ? `${styles.todo_text} ${styles.completed}` : styles.todo_text}>
                      {todo.text}
                    </span>
                  </div>
                  <button onClick={() => deleteTodo(index)} className={styles.delete_button}>
                    X
                  </button>
                </li>
              ))}
            </ul>
            <input 
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="New Todo"
            className={styles.todo_input}/>
            
          </div>
        </div>
      )}
    </div>
    );
}

export default Todo;