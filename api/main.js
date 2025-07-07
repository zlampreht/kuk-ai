const express = require ('express');
const app =  express ();
const PORT  = 3000;

app.use  (express.json())

app.get ("/api/v1/health"  ,(req, res) => {
    res.json ( {
        message :  'ok'
    });
})

app.listen(PORT, ()=> {
    console.log("app is running")
})