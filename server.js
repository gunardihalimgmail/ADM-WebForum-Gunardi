const express = require('express');
const app = express();
const port = 3001

app.use(express.json());

app.use((req, res, next)=> {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.get('/api/data', (req,res)=>{
    res.status(200).send({message:'hello from server !'});
})

app.listen(process.env.PORT || port, () => {
    console.log('Cara PORT ',port)
})