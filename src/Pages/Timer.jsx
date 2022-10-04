import React, { useState, useEffect } from 'react'

export default function Timer(props) {

    const [setIndex, setSetIndex] = useState(0) //index of current stretch in array
    const [currentSet, setCurrentSet] = useState() //current stretch object
    const [timeLeft, setTimeLeft] = useState() // current stretch time ( x > 0 => x--)
    const [isTimerActive, setIsTimerActive] = useState(false) // wether the timer is active
    const [isRunning, setIsRunning] = useState(true)


// Function that is run when initial button is pressed
    function startRoutine(){
        if(props.routine[setIndex] !== undefined){
            setIsRunning(false)
            setIsTimerActive(true)
            setCurrentSet(props.routine[setIndex])
            convertTime(props.routine[setIndex].duration, props.routine[setIndex].units)
        }else {
            if(setIndex === 0){
                alert('You must make a routine first')
            }
        }
    }
    
    function endRoutine() {
        // if(setIndex > 0 && isTimerActive === false){
            setIsRunning(true)
            setSetIndex(0)
            alert('Good Work!')
    }

// Manages the timer
    useEffect(() => {
        let timerId
        if(isTimerActive === true){
            timerId = setInterval(() => timer(), 1000)
            if(timeLeft <= -1){
                setIsTimerActive(false)
                setSetIndex(prevIndex => prevIndex + 1)
            }
        }
        return () => {
            clearInterval(timerId)
        }
    }, [isTimerActive, timeLeft])

// Stops the timer when index changes
    useEffect(() => {
        if(setIndex >= 2 && props.routine[setIndex]){
            setTimeout(() => startRoutine(), 4000) 
        }else if(setIndex === 1 && props.routine[setIndex]){
            startRoutine()
        }else if(setIndex !== 0 && !props.routine[setIndex]){
            endRoutine()
        }
    }, [setIndex])

// converts time then sets it to state
    function convertTime(time, currentSetUnits) {
        if(currentSetUnits  === 'seconds'){
            setTimeLeft(time)
        }else if(currentSetUnits === 'minutes'){
            setTimeLeft(time * 60)
        }
    }
    

    function timer(){
        if(timeLeft >= -1){
            setTimeLeft(prevTime => prevTime - 1)
        }
    }


    return (
        <div className='timer-page'>
            {isRunning && <button onClick={startRoutine} className='btn start-routine-btn'>Start Routine</button>}

           {timeLeft > -1 && !isRunning && isTimerActive && <h1 className='timer-text'>{currentSet.name}: <br className='hideOnBigScreen'></br> {timeLeft}</h1>}

           {!isRunning && !isTimerActive && <h1 className='timer-text'>4 Second Break</h1>}

           {!isRunning && props.routine[setIndex + 1] && isTimerActive && <h1 className='timer-next-text'>Up Next: {props.routine[setIndex + 1].name}</h1>}
           {!isRunning && props.routine[setIndex] && !isTimerActive && <h1 className='timer-next-text'>Up Next: {props.routine[setIndex].name}</h1>}

        </div>
    )
}