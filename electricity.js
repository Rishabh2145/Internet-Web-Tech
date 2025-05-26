const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./database')


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
})

app.get('/bill', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'bill.html'));
})

app.get('/application', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'application.html'));
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

app.post('/logCred', (req, res) => {
    const cred = req.body;
    console.log(cred);
    res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
})

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
    console.log(data);

    try {
        const [result] = await db.execute(
            `INSERT INTO register (ACCOUNT_ID, FIRST_NAME, MIDDLE_NAME, LAST_NAME, EMAIL_ID, MOBILE_NO, PHONE_NO, PASSWORD) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [acc_id, first_name, middle_name || null, last_name, email, phone1, phone2 || null, pass]
        );
        res.sendFile(path.join(__dirname, 'views', 'login.html'))
    } catch (err) {
        console.error(err);
        res.status(500).send("Database error! : " + err);
    }
})

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

app.listen(PORT, () => {
    console.log(`The website is running on http://localhost:${PORT}`);
})