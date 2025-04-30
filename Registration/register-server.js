// const mysql = require('mysql2');
// const { JSDOM } = require('jsdom');
// const dom = new JSDOM(`<!DOCTYPE html><button id="submit"></button>`);
// const document = dom.window.document;

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '170898',
//   database: 'lab',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// document.getElementById('submit').onclick = () => {
//   const values = {
//     userID: document.getElementById('acc_id').values,
//     fname: document.getElementById('first_name').values,
//     mname: document.getElementById('middle_name').values || null,
//     lname: document.getElementById('last_name').values,
//     email: document.getElementById('email').values,
//     mobile: document.getElementById('phone1').values,
//     phone: document.getElementById('phone2').values || null,
//     passcode: document.getElementById('password').values
//   }
//   pool.query(`INSERT INTO REGISTER VALUES (${userID} , ${fname} , ${mname} , ${lname} ,${email} , ${mobile} , ${phone} , ${passcode})`, (result, err) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       return;
//     }
//     console.log('Query results:', result);
//   });
// }


// document.getElementById('submit').click();