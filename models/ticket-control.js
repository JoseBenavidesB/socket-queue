const path = require('path');
const fs = require('fs');

class Ticket {
    constructor() {
        this.number  = '';
        this.desktop = '';
    }
};

class TicketControl {

    constructor() {
        this.last    = 0;
        this.today   = new Date().getDate();
        this.tickets = [];
        this.last4   = [];

        this.init();

    };

    // record data into data.json
    get toJson() {
        return {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last4: this.last4
        }
    };

    //read the file
    init() {
        const { today, last, tickets, last4 } = require('../db/data.json');
        if ( today === this.today ) {
            this.tickets = tickets;
            this.last    = last;
            this.last4   = last4;
        } else {
            //is another day
            this.saveDB();
        }
    };

    //save in db
    saveDB(){
        
        const dbPath = path.join( __dirname, '../db/data.json');
        fs.writeFileSync( dbPath, JSON.stringify( this.toJson ) ); 
    };

};


module.exports = TicketControl;