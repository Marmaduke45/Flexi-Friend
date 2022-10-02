import React, { useState } from 'react'
import RoutineItem from '../Components/Routine-Item'
import { nanoid } from 'nanoid'
import upArrowIcon from "../assets/upArrow.png"
import downArrowIcon from "../assets/downArrow.png"

export default function Routine(props) {
    
    const [formData, setFormData] = useState({
        name: "",
        duration: 0,
        units: "seconds",
        isMirrored: false,
        id: ""
    })
    const [isHidden, setIsHidden] = useState(false)
    
// Handles form changes with 
    function handleChange(e) {
        const {name, value, type, checked} = e.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    function preventRefresh(e){
        e.preventDefault()
    }

    function addItem(item) {
        const {name, duration, isMirrored, units} = item

        props.addRoutineItem({
            name: name,
            duration: Number(duration),
            units: units,
            isMirrored: isMirrored,
            id: nanoid()
        })

        setFormData({
            name: "",
            duration: 0,
            units: "seconds",
            isMirrored: isMirrored,
            id: ""
        })
    }


    function toggleBottomBar() {
        setIsHidden(prevState => !prevState)
    }

    const routineList = props.routine ? props.routine.map((item, index) => {
        if(index === 0) return
        return <RoutineItem key={index} id={item.id} name={item.name} duration={item.duration} units={item.units} removeRoutineItem={props.removeRoutineItem} />
    }) : ''

    const bottomBarClass = isHidden ? "bottom-bar hidden" : "bottom-bar"

    return (
            <div className='routine-page'>
                <h1 className='page-title'>Create a Routine</h1>
                <ul>
                    {routineList}
                </ul>

                <div className={bottomBarClass}>
                    <h1>Add New Items</h1>
                    <button onClick={toggleBottomBar} className='toggle-bottom-bar'><img src={isHidden ? upArrowIcon : downArrowIcon} className="arrow-icon" /></button>
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
                            <label className='check-label'>
                                <input
                                    className='checkbox'
                                    type="checkbox"
                                    name="isMirrored"
                                    id="isMirrored"
                                    checked={formData.isMirrored}
                                    onChange={handleChange}
                                />
                                Mirror left and right
                            </label>
                        </div>
                        <button onClick={() => addItem(formData)} className='add-item btn-large btn'>Add Item</button>
                    </form>
                </div>
            </div>
    )
}