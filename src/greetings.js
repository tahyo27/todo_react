import React, {useState, useEffect} from "react";

function Greetings() {
  const USERNAME_KEY = "username";

  const [isFormVisible, setisFormVisible] = useState(true);


  const storedUsername = localStorage.getItem(USERNAME_KEY);

  function onLoginSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target); // 폼 데이터 가져오기
    const username = formData.get("username"); 
    localStorage.setItem(USERNAME_KEY, username);
    console.log(username);
    paintGreetings(username);

  }

  function paintGreetings(username) {
    setisFormVisible(false);

  }
    

    return (
    <div>

      {isFormVisible ? (
        <div>
          <h1>What is your Name</h1>
          <form id="login-form" onSubmit={onLoginSubmit}>
            <input name="username" required maxLength="10" type="text" />
            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        <div>안녕하세요 {storedUsername}님</div>
      ) 
      }
    </div>
    );

}

export default Greetings;