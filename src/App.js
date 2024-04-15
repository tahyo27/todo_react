
import { useEffect } from "react";
import setRandomBackground from './background';
import Greetings from "./greetings";
import Quotes from './quotes';
import Todo from './todo';
import Weather from './weather';

function App() {

  useEffect(() => {
    setRandomBackground(); 
  }, []); 

  return (
    <div>
      <div>
        <Greetings />
      </div>
      <div>
        <Quotes />
      </div>
      <Todo />
      <Weather />
    </div>
  );
}

export default App;
