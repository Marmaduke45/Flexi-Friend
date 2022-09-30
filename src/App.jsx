import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation} from 'react-router-dom'
import Routine from './Pages/Routine'
import Timer from './Pages/Timer'
import Navbar from './Components/Navbar'



function App() {
  const prepare = {
    name: "Prepare",
    duration: 3,
    units: "seconds",
    id: "one"
  }
  
  const location = useLocation()

  const [routineList, setRoutineList] = useState([]) //array of routines (so user can have multiple routines)
  const [routine, setRoutine] = useState(makeRoutineObj())
  

  function addRoutineToList() {
    setRoutineList(prevList => {
      return [...prevList, routine]
    })
  }



// Gets data from localStorage and adds the prepare item
  function makeRoutineObj() {
    const localStorageData = JSON.parse(localStorage.getItem('routine'))
    if(!localStorageData.some(e => e.name === "Prepare")){
      localStorageData.unshift(prepare)
      return localStorageData
    }else{
      return localStorageData
    }
  }
// Allows items to be added to routine state
  function addRoutineItem(obj) {
    if(obj.name === "" || obj.duration === 0){
      alert('You must fill out the form')
      return;
    }
    setRoutine(prevState => {
      return [...prevState, obj]
    })
  }
// removes items from routine state
  function removeRoutineItem(id){
    setRoutine(prevState => {
      return prevState.filter(item => item.id !== id)
    })
  }
// saves routine to localStorage
  function saveRoutine() {
    if(routine === null) return;
    localStorage.setItem('routine', JSON.stringify(routine))
  }

  // useEffect(() => {
  //   saveRoutine()
  // }, [routine])


  return (
    <div className="app">
      <Navbar selected={location} />

      <Routes>
          <Route exact path='/' element={<Routine routine={routine} removeRoutineItem={removeRoutineItem} addRoutineItem={addRoutineItem} />} />
          <Route exact path='/timer' element={<Timer routine={routine} />} />
      </Routes>
    </div>
  )
}

export default App
