
import { useEffect } from "react";
import setRandomBackground from './background';
import Greetings from "./greetings";
import Quotes from './quotes';
import Todo from './todo';

function App() {

  useEffect(() => {
    setRandomBackground(); 
  }, []); 

  return (
    <div>
      <div>
        hello todo
      </div>
      <div>
        <h1>My Clock</h1>
        <Greetings />
      </div>
      <div>
        <Quotes />
      </div>
      <Todo />
    </div>
  );
}

export default App;
