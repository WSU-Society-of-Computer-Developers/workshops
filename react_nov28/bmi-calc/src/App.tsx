import React, { useState, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
const calcBMI = (weight: number, height: number): string => (703 * (weight / (height ** 2))).toFixed(1);
// the constant "703" is to convert lbs/inches^2 to kg/m^2

const BMICategory = (bmi: number): string => {
  /* 
  According to https://www.nhlbi.nih.gov/health/educational/lose_wt/BMI/bmicalc.htm
  BMI Categories:
  Underweight = <18.5
  Normal weight = 18.5–24.9
  Overweight = 25–29.9
  Obesity = BMI of 30 or greater
 */
  if (bmi < 18.5) {
    return "yellow" // underweight
  } else if (bmi >= 18.5 && bmi < 25) {
    return "green" // normal weight
  } else if (bmi >= 25 && bmi < 30) {
    return "yellow" // overweight
  } else {
    return "red" // obese
  }
}

function App() {
  const [header, setHeader] = useState<null | string>(null)
  const weightInput = useRef<HTMLInputElement>(null)
  const heightInFeet = useRef<HTMLInputElement>(null)
  const heightInInches = useRef<HTMLInputElement>(null)
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    let weight = weightInput.current?.value // get the current input value from the input field
    let heightFt = heightInFeet.current?.value
    let heightIn = heightInInches.current?.value
    if (weight && heightFt && heightIn) {
      const bmiResult = calcBMI(
        parseFloat(weight),
        (parseFloat(heightFt) * 12) + parseFloat(heightIn)
      )
      setHeader(bmiResult)
    } else {
      alert("Please fill out all fields!!!")
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>BMI Calculator in React</h3>
        {header && <h1 style={{color: BMICategory(parseFloat(header))}}>BMI: {header}</h1>}
        <input type="number" ref={weightInput} placeholder='Enter weight here (lbs)' />
        <div style={{ display: "inline-block" }}>
          <input type="number" defaultValue={5} ref={heightInFeet} placeholder="height (feet)" />
          <input type="number" defaultValue={11} ref={heightInInches} placeholder='height (inches)' />
        </div>
        <br />
        <button className="calculateButton" onClick={handleClick}>Calculate</button>
      </header>
    </div>
  );
}

export default App;
