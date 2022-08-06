//HTML References
const  btnCreate = document.querySelector('button');
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');


const socket = io();

//connect socket
socket.on('connect', () => {
    // console.log('Conectado');
    btnCreate.disabled = false;

});

//disconnect socket
socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnCreate.disabled = true;
});

//show last ticket when someone connect
socket.on( 'last-ticket', (lastTicket) => {
    lblNuevoTicket.innerHTML = `Ticket: ${lastTicket}`;
});

//click on btnCreate
btnCreate.addEventListener( 'click', () => {
    
    socket.emit( 'next-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerHTML = ticket;
    });

});
