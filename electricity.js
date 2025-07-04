const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./database')
const session = require('express-session');
const fs = require('fs');

const saltRound = 10;
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
    const now = new Date();
    fs.appendFile('logs.txt', `\n${now.toUTCString()} : \t${req.ip} :\t${req.method} : \t${req.path} `, (err, data) => {
        next();
    });
})



app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'Rishabh064',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true
    }
}))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
})

app.get('/bill', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'bill.html'));
})

app.get('/application', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'application.html'));
})

app.post('/applicationSubmit', (req, res) => {
    const data = req.body;
    res.render('applicationSubmit', { data });
});


app.get('/Status', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'status.html'));
})

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
})

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
})

app.post('/logCred', async (req, res) => {
    // const cred = req.body;
    // cred.password = await bcrypt.hash(cred.password , saltRound);
    // console.log(cred);
    // res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
    const { username, password } = req.body;
    try {
        const [rows] = await db.execute(`SELECT ACCOUNT_ID, PASSWORD FROM REGISTER WHERE ACCOUNT_ID = (?)`, [username]);

        if (rows.length == 0) {
            res.send('<h1> Account ID is not Registered! </h1><a href="/register">Register</a>');
        }
        const user = rows[0];
        const match = await bcrypt.compare(password, user.PASSWORD);
        if (match) {
            req.session.loggedIn = true;
            req.session.username = username;
            res.redirect('/');
            console.log("LoggedIN");
        }
        else {
            res.send('<h3>Incorrect password</h3><a href="/login">Try Again</a>');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error: ' + err.message);
    }
})

app.get('/api/user', async (req, res) => {
    if (!req.session.loggedIn) {
        return res.status(401).json({ message: 'Not logged in' });
    }

    try {
        const [rows] = await db.execute(
            'SELECT FIRST_NAME, ACCOUNT_ID FROM REGISTER WHERE ACCOUNT_ID = ?',
            [req.session.username]
        );

        const name = rows.length > 0 ? rows[0].FIRST_NAME : req.session.username;
        const acc_id = rows.length > 0 ? rows[0].ACCOUNT_ID : req.session.username;
        res.json({ username: name, account_ID: acc_id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


app.get('/privacy_policy', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'privacy_policy.html'));
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
})

app.post('/login', async (req, res) => {
    const data = {
        acc_id,
        first_name,
        middle_name,
        last_name,
        email,
        phone1,
        phone2,
        pass
    } = req.body;
    const hashedpass = await bcrypt.hash(data.pass, saltRound);
    console.log(data);
    try {
        const [result] = await db.execute(
            `INSERT INTO register (ACCOUNT_ID, FIRST_NAME, MIDDLE_NAME, LAST_NAME, EMAIL_ID, MOBILE_NO, PHONE_NO, PASSWORD) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [acc_id, first_name, middle_name || null, last_name, email, phone1, phone2 || null, hashedpass]
        );
        res.sendFile(path.join(__dirname, 'views', 'login.html'))
    } catch (err) {
        console.error(err);
        res.status(500).send("Database error! : " + err);
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send("Logout error");
        }
        res.redirect('/login');
    });
});


app.get('/terms', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'terms.html'));
})

app.get('/complaint', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'complaint.html'));
})

app.post('/api/complaints', async (req, res) => {
    const complaintData = {
        UserID: req.body.user_id,
        ComplaintType: req.body.complaint_type,
        Description: req.body.complaint,
        Status: "Pending",
        Date: new Date().toString(),
        Remark: null
    };

    console.log(complaintData);
    try {
        const [result] = await db.execute(
            `INSERT INTO complaints (UserID, COMPLAINTTYPE, DESCRIPTION, STATUS, REMARK) VALUES (?, ?, ?, ?, ?)`,
            [complaintData.UserID, complaintData.ComplaintType, complaintData.Description, complaintData.Status, complaintData.Remark]
        );
        console.log("Data inserted successfully");
        await res.status(200).json({ success: true, message: 'Complaint Registered!', recieved: complaintData });
        res.sendFile(path.join(__dirname, 'views', 'dashboard.html'))
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: 'Error in complaint registration : ' + err, recieved: "Error" })
    }

});

// app.get('/404', async (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', '404.html'));
// });
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => {
    console.log(`The website is running on http://localhost:${PORT}`);
})