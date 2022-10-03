const express = require('express');
const fileUpload = require('express-fileupload');

const cors = require('cors');
const crypto = require('crypto');
const app = express();
const fs = require('fs');
const mysql = require('mysql')
const connection = mysql.createConnection({
    'host':'127.0.0.1',
    'port':'3307',
    'user':'root',
    'password':'123456',
    'database':'cloud_databse'
})
connection.connect()

const bodyParser = require('body-parser');

// deploy แล้ว comment ตัวนี้ทิ้ง
app.use(cors());
app.use(bodyParser.urlencoded({'extended':false}))
app.use(bodyParser.json());
app.use(fileUpload());


const port =  8080 ;


app.use(express.static('public'))

app.post('/login', (req,res)=>{
    const pwd = sha1(req.body.password);
    const strSQL = `SELECT * FROM users WHERE name ='${req.body.username}' AND password='${pwd}'`;
    console.log(strSQL);
    connection.query(strSQL, function(err, rows){
        if (err) throw err;
        if (rows.length !==0){
            console.log('success')
            res.json({
                'status':'success',
                'message': 'login successfully!',
                'userdata': rows[0],
            })
        }else{
            console.log('error')
            res.json({
                'status':'error',
                'message': 'Incorrect username or password!',
            })
        }
    })
    // res.json({'status':'error'})
})

app.post('/register', (req,res)=>{
    const pwd = sha1(req.body.password);
    const strSQL = `INSERT INTO users (username, password, name) VALUES ('${req.body.username}', '${pwd}', '${req.body.name}')`;
    console.log(strSQL);
    connection.query(strSQL, (err) => {
        if (err) throw err;
        console.log('New user registered');
        res.json({
            'status':'success',
            'message': 'chai yo!',
        });
    })
})

app.post('/upload', (req,res)=>{
    const strSQL = `INSERT INTO images (imagePath, username) VALUES ('${req.body.imagepath}','123')`;
    // console.log(req.body)
    const target = 'upload_img/'+String(req.body.imagepath);
    fs.writeFile(target,req.body.imagefile.replace('data:image/jpeg;base64,',''),'base64',(error)=>{
        console.log(error);
    })

    connection.query(strSQL, (err) => {
        if (err) throw err;
        console.log('File uploaded');
        res.json({
            'status':'success',
            'message': 'chai yo!',
            'filePath': `'${req.body.imagepath}'`
            // 'error':err
        });
    })
})

app.get('*', (req,res)=>{
    res.sendStatus('404')
})

function sha1(data) {
    return crypto.createHash("sha1").update(data, "binary").digest("hex");
}

app.listen(port, ()=>{
    console.log('Started server at port ', port)
})
// connection.end()