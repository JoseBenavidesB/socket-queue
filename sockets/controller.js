const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {

    //event from client public.html
    socket.emit('current-state', ticketControl.last4 )
    
    //set remaining tickets
    socket.emit( 'tickets-remaining', ticketControl.tickets.length );

    // set las 4
    socket.emit('last-ticket', ticketControl.last );

    socket.on('next-ticket', ( payload, callback ) => {
        
        const next = ticketControl.next();
        callback( next );

        socket.broadcast.emit( 'tickets-remaining', ticketControl.tickets.length );

    });

    //listen client even attend-ticket
    socket.on( 'attend-ticket', ( payload, callback ) => {
        console.log(payload);
        const { desktop } = payload;

        //if there is not any desktop
        if( !desktop ){
            return callback({
                ok: false,
                msg: 'Desktop is neccessry'
            });
        };

        const ticket = ticketControl.attentionTicket( desktop );

        //event from client public.html
        socket.broadcast.emit('current-state', ticketControl.last4 );
        
        //set remaining tickets
        socket.emit( 'tickets-remaining', ticketControl.tickets.length );
        socket.broadcast.emit( 'tickets-remaining', ticketControl.tickets.length );

        if ( !ticket ) {
            callback({
                ok: false,
                msg: "There is not any pending tickets"
            })
        } else {
            callback({
                ok: true,
                ticket
            })
        }
    });
};

module.exports = {
    socketController
}

