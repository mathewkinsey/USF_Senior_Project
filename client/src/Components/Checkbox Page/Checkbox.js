import React from 'react'

export default function Checkbox(props) {
    return (
        <div>
            <input className="Blue-Check" type="checkbox" id={props.name} name={props.name} onChange={props.Change} />
            <label htmlFor={props.name}>{props.name}</label>
        </div>
    )
}
