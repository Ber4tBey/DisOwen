
//THX YUSUFUSTA
/* Copyright (C) 2022 Ber4tbey.
Licensed under the  MIT License;
you may not use this file except in compliance with the License.
DisOwen - Ber4tbey
*/
const config = require('../../../config');
const { DataTypes } = require('sequelize');

const GreetingsDB = config.DATABASE.define('Greeting', {
    chat: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});


module.exports = {
    GreetingsDB: GreetingsDB  
};