import React, { useState, useEffect } from "react";
import './App.css';

function App() {

  const [itemsInPersonCart, setItemsInPersonCart] = useState(0)
  const [lines, setLines] = useState([ [], [], [], [], []])
    
function addPersonToLine(e){
  e.preventDefault();
  let leastItemAmount = 1e9;
  let lineWithLeast = null;


  for(let line of lines){
    const totalItemAmount = line.reduce((sum, value) => sum + value, 0)
    if(totalItemAmount < leastItemAmount){
        leastItemAmount = totalItemAmount
        lineWithLeast = line
    }
  }
  
  setLines(prevLines => (
    prevLines.map((line, idx) => (
     line === lineWithLeast ? [...line, itemsInPersonCart] : line
    ))
  ))
}

 useEffect(() => {
    const interval = setInterval(() => {
      setLines(prevLines => (
        prevLines.map((line) => (
          [line[0] - 1, ...line.slice(1)].filter((value) => value > 0)
        ))
      ))

    }, 1000)

    return () => {
      clearInterval(interval)
    }
  })


return (
  <div className="App">
    <form onSubmit={addPersonToLine}className="">
      <input 
        type="number"
        required
        onChange={e => setItemsInPersonCart(e.currentTarget.valueAsNumber)}
        value= {itemsInPersonCart} />
        <button>Checkout</button>
    </form>


    <div className="lines">
        {lines.map((line, idx) => {
         return  <div key={idx} className="line">
            {line.map((numberOfItems, lineIdx) => {
              return <div key={lineIdx}>{numberOfItems}</div>
            })}
          </div>
        })}
    </div>
  </div>
  );
}

export default App;
