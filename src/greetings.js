import React, {useState, useEffect} from "react";


function Greetings() {
  //username로그인 확인
  const USERNAME_KEY = "username";
  const [isFormVisible, setisFormVisible] = useState(true);
  const [time, setTime] = useState(getCurrentTime);
  const [message, setMessage] = useState(""); 
  
  const storedUsername = localStorage.getItem(USERNAME_KEY);
  const hours = time.split(":");

  useEffect(() => {
    storedCheck();
  }, );

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


  
  function onLoginSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target); // 폼 데이터 가져오기
    const username = formData.get("username"); 
    localStorage.setItem(USERNAME_KEY, username);
    //console.log(username);
    paintGreetings();
  };
  
  function storedCheck() {
    if(storedUsername !== null) {
      setisFormVisible(false);
    }
  };

  function paintGreetings() {
      setisFormVisible(false);
  };

  function getCurrentTime() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2,"0");
    const minutes = String(date.getMinutes()).padStart(2,"0");
    return `${hours}:${minutes}`;
  }

    return (
    <div>
      <h1 id="clock">{time}</h1>
      {isFormVisible ? (
        <div>
          <h1>What is your Name</h1>
          <form id="login-form" onSubmit={onLoginSubmit}>
            <input name="username" required maxLength="10" type="text" />
            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>{message} {storedUsername}님</h2>
        </div>
      ) 
      }

    </div>
    );

}

export default Greetings;