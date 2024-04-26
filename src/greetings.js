import React, {useState, useEffect} from "react";
import styles from "./greetings.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";


function Greetings() {
  //username로그인 확인
  const USERNAME_KEY = "username";
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [time, setTime] = useState(getCurrentTime);
  const [message, setMessage] = useState(""); 
  const [showOptions, setShowOptions] = useState(false);
  
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
      setIsFormVisible(false);
    }
  };

  function paintGreetings() {
      setIsFormVisible(false);
  };

  function getCurrentTime() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2,"0");
    const minutes = String(date.getMinutes()).padStart(2,"0");
    return `${hours}:${minutes}`;
  }

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleChange = () => {
    // 변경 옵션을 선택할 때 실행 함수
    localStorage.removeItem(USERNAME_KEY);
    setIsFormVisible(true);
    console.log('Change clicked');
    setShowOptions(false);
    
  };

  const handleDelete = () => {
    // 삭제 옵션을 선택할 때 실행 함수
    setIsFormVisible(true);
    localStorage.removeItem(USERNAME_KEY);
    const todo = localStorage.getItem(storedUsername + "_todos");
    if(todo !== null) {
      localStorage.removeItem(storedUsername + "_todos");
    }
    console.log('Delete clicked');
    setShowOptions(false);
  };

    return (
    <div className={styles.greetings_box}>
      <div id="clock" className={styles.clock_box}>{time}</div>
        {isFormVisible ? (
          <div className={styles.login_box}>
            <div>What is your Name?</div>
            <form id="login-form" onSubmit={onLoginSubmit}>
              <input name="username" required maxLength="10" type="text" className={styles.input_box} />
            </form>
          </div>
        ) : (
          <div className={styles.message_box}>
            <div className={styles.message}>{message} {storedUsername}님</div>
            <div  className={styles.icon_container} style={{marginTop: "1.5rem",marginLeft: "1rem",fontSize: "2rem"}}>
              <FontAwesomeIcon icon={faGear} onClick={toggleOptions}/>
              {showOptions && (
              <div className={styles.options_container}>
                <button onClick={handleDelete}>Delete</button> {/* Delete 버튼 */}
                <button onClick={handleChange}>Change</button> {/* Change 버튼 */}
              </div>
              )}
            </div>
          </div>
        ) 
        }
      
    </div>
    );

}

export default Greetings;