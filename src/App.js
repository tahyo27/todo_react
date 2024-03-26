
import { useState, useEffect } from "react";
import setRandomBackground from './background';
import Clock from './clock';

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
        <Clock />
      </div>
    </div>
  );
}

export default App;
