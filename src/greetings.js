import React, {useState, useEffect} from "react";


function Greetings() {
  const USERNAME_KEY = "username";
  const [isFormVisible, setisFormVisible] = useState(true);
  const [time, setTime] = useState(getCurrentTime);
  const [message, setMessage] = useState(""); 

  const hours = time.split(":");

  useEffect(() => {
    const intervalId = setInterval(() => {
        setTime(getCurrentTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if(parseInt(hours) < 12) {
      setMessage("Good morning, ");
    } else if(parseInt(hours) < 18){
      setMessage("Good afternoon, ");
    } else {
      setMessage("Good evening, ");
    }

  }, [hours]);


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

  function getCurrentTime() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2,"0");
    const minutes = String(date.getMinutes()).padStart(2,"0");
    return `${hours}:${minutes}`;
  }

    return (
    <div>
      {isFormVisible ? (
        <div>
          <h1 id="clock">{time}</h1>
          <h1>What is your Name</h1>
          <form id="login-form" onSubmit={onLoginSubmit}>
            <input name="username" required maxLength="10" type="text" />
            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        <div>
          <h1 id="clock">{time}</h1>
          <h2>{message} {storedUsername}님</h2>
        </div>
      ) 
      }


    </div>
    );

}

export default Greetings;