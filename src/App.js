
import { useState, useEffect } from "react";
import setRandomBackground from './background';

function App() {

  useEffect(() => {
    setRandomBackground(); 
  }, []); 

  return (
    <div>
      <div>
        hello todo
      </div>
    </div>
  );
}

export default App;
