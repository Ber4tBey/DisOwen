/* Copyright (C) 2022 Ber4tbey.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
DisOwen - Ber4tbey
*/




const db = require('quick.db');


async function addgmute(adres) {
    db.set(adres, adres)
    
}


async function rmgmute(adres) {
    db.delete(adres, adres)    
}
module.exports = { addgmute: addgmute , rmgmute: rmgmute};


  