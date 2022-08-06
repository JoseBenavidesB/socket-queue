//HTML References
const lblDesktop    = document.querySelector('h1');
const btnAttend     = document.querySelector('button');
const lblTicket     = document.querySelector('small');
const alertDiv      = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes')


const searchParams = new URLSearchParams( window.location.search );

//desktop exist?
if ( !searchParams.has( 'desktop' ) ) {
    window.location = 'index.html'
    throw new Error(' Desktop is neccessary');
};

//Add number of desktop
const desktop = searchParams.get('desktop');
lblDesktop.innerText = desktop

// Hide alert
alertDiv.style.display = 'none';

//create socket
const socket = io();

//connect socket
socket.on('connect', () => {
    // console.log('Conectado');
    btnAttend.disabled = false;

});

//disconnect socket
socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnAttend.disabled = true;
});

//show last ticket when someone connect
socket.on( 'last-ticket', (lastTicket) => {
    //lblNuevoTicket.innerHTML = `Ticket: ${lastTicket}`;
});

//click on btnCreate
btnAttend.addEventListener( 'click', () => {
    
    socket.emit( 'attend-ticket', { desktop }, ( payload) => {
        const { ok, ticket, msg } = payload;

        if (!ok) { 
            lblTicket.innerText = 'No one'
            alertDiv.style.display = ''
            alertDiv.innerText = msg;
            return;
        };

        lblTicket.innerText = `Ticket ${ticket.number}`
    });

});

socket.on( 'tickets-remaining', ( payload ) => {
    if ( payload === 0) { 
        return lblPendientes.style.display = 'none' 
    } else {
        lblPendientes.style.display = '' 
        lblPendientes.innerText = payload
    }
});