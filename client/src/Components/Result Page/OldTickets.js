import React from 'react'
import TicketField from '../Ticket Page/TicketField'

export default function OldTickets(props) {

    const ticketData = Object.values(props.theTicket);
    const ticketFields = Object.keys(props.theTicket);
    //ticketFields.shift();
    //ticketData.shift();
    const completeTicket = ticketFields.map((item, i) => (
		
        <TicketField key={i} title={item} datas={ticketData[i]} show={true} />
    ))
    return (
        <div className="Ticket">
            {completeTicket}
        </div>
    );
}
