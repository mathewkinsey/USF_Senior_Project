import React from 'react'

export default function Comparisons(props) {
    return (
        <div className="Comparison-Element">
            <div>{props.OID1}</div>
            <div>{props.OID2}</div>
            <div>{props.Result}</div>
            <div>{props.User}</div>
            <div>{props.time}</div>
            <div>
                <button className="Edit-btn" onClick={() => {
                    props.fetchPrev(props.OID1, props.OID2, props.previousFields)
                    props.modalShow(props.OID1, props.OID2, props.previousFields, props.User)
                }
                }>EDIT
                </button>
                <button className="Delete-btn" onClick={() => {
                    props.deleteEntry(props.deleteId, props.User);
                }}>
                    DELETE
                </button>
            </div>
        </div>
    )
}
