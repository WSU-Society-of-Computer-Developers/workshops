
import React from "react";
import './App.css';
import Title from "./components/Title";

// bmi = (lbs/inches^2)*703
const calcBMI = (weight, height) => (703 * (weight / (height ** 2))).toFixed(1)

const BMICategory = (bmi) => {
  if (bmi < 18.5) {
    return "yellow"
  } else if (bmi >= 18.5 && bmi < 25) {
    return "green"
  } else if (bmi >= 25 && bmi < 30) {
    return "yellow"
  } else {
    return "red"
  }
}

// weight (lbs), height (inches)
function App() {
  const [header, setHeader] = React.useState("")
  const weightInput = React.useRef(null);
  const heightInFeet = React.useRef(null);
  const heightInInches = React.useRef(null);
  const handleClick = () => {
    let weight = weightInput.current?.value
    let heightFt = heightInFeet.current?.value
    let heightIn = heightInInches.current?.value
    if (weight && heightIn && heightFt) {
      let height = (parseFloat(heightFt)*12) + parseFloat(heightIn)
      let bmi = calcBMI(parseFloat(weight), height)
      setHeader(bmi)
    } else {
      alert("Please fill out all fields!!!")
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <Title/>
        {header && <h1 style={{color: BMICategory(header)}}>BMI: {header}</h1>}
        <input type="number" ref={weightInput} placeholder='weight (lbs)' /> {/* weight */}

        <div style={{ display: "inline-block" }}> {/* height */}
          <input type="number" ref={heightInFeet} placeholder='height (feet)' />
          <input type="number" ref={heightInInches} placeholder='height (inches)' />
        </div>
        <button onClick={handleClick}>Calculate</button>
      </header>
    </div>
  );
}

export default App;
