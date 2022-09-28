import React, { useState, useEffect } from 'react'
import './App.css'
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

  
  const [routine, setRoutine] = useState(makeRoutineObj())
  

  function makeRoutineObj() {
    const localStorageData = JSON.parse(localStorage.getItem('routine'))
    console.log(localStorageData.some(e => e.name === "Prepare"))
    if(!localStorageData.some(e => e.name === "Prepare")){
      localStorageData.unshift(prepare)
      return localStorageData
    }else{
      return localStorageData
    }
  }

  function addRoutineItem(obj) {
    if(obj.name === "" || obj.duration === 0){
      alert('You must fill out the form')
      return;
    }
    setRoutine(prevState => {
      return [...prevState, obj]
    })
  }

  function removeRoutineItem(id){
    setRoutine(prevState => {
      return prevState.filter(item => item.id !== id)
    })
  }

  function saveRoutine() {
    if(routine === null) return;
    localStorage.setItem('routine', JSON.stringify(routine))
  }

  useEffect(() => {
    saveRoutine()
  }, [routine])

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
