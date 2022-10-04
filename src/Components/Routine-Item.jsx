import React from "react";

export default function RoutineItem(props) {

    const unit = chooseUnit()

    function chooseUnit() {
        if(props.duration === 1){
            if(props.units === "minutes"){
                return "minute"
            }else{
                return "second"
            }
        }else{
            if(props.units === "minutes"){
                return "minutes"
            }else{
                return "seconds"
            }
        }
    }

    return(
        <li className="routine-item">
            <p className="bold">{props.name}</p>
            <p>{props.duration} {unit}</p>
            <button onClick={() => props.removeRoutineItem(props.id)} className="btn btn-small remove-item">remove item</button>
        </li>
    )
}