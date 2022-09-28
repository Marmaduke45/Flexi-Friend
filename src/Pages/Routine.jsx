import React, { useState } from 'react'
import RoutineItem from '../Components/Routine-Item'
import { nanoid } from 'nanoid'

export default function Routine(props) {

    const [formData, setFormData] = useState({
        name: "",
        duration: 0,
        units: "seconds",
        id: ""
    })
    
// Handles form changes with 
    function handleChange(e) {
        const {name, value} = e.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    function preventRefresh(e){
        e.preventDefault()
    }

    function addItem(item) {
        const {name, duration, units} = item

        props.addRoutineItem({
            name: name,
            duration: Number(duration),
            units: units,
            id: nanoid()
        })

        setFormData({
            name: "",
            duration: 0,
            units: "seconds",
            id: ""
        })
    }


    const routineList = props.routine.map((item, index) => {
        if(index === 0) return
        return <RoutineItem key={index} id={item.id} name={item.name} duration={item.duration} units={item.units} removeRoutineItem={props.removeRoutineItem} />
    })

    
    return (
            <div className='routine-page'>
                <h1 className='page-title'>Create a Routine</h1>
                <ul>
                    {routineList}
                </ul>

                <div className='bottom-bar'>
                    <h1>Add New Items</h1>
                    <form className='form-container' onSubmit={preventRefresh}>
                        <input
                            placeholder='Enter stretch name'
                            className='input'
                            name="name"
                            value={formData.name}
                            type="text"
                            onChange={handleChange}
                        />
                        <div className='secondary-input-container'>
                            <input 
                                placeholder='Stretch duration'
                                className='input number-input'
                                name="duration"
                                value={formData.duration}
                                type="number"
                                onChange={handleChange}
                            />
                            <select 
                                className='input'
                                value={formData.units}
                                onChange={handleChange}
                                name="units"
                            >
                                <option value="seconds">Seconds</option>
                                <option value="minutes">Minutes</option>
                                {/* <option value="reps">Reps</option> */}
                            </select>
                        </div>
                        <button onClick={() => addItem(formData)} className='add-item btn-large btn'>Add Item</button>
                    </form>
                </div>
            </div>
    )
}