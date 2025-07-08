import express from 'express';
import cors from 'cors';

const app =  express ();
const PORT  = 3000;

app.use  (express.json())

app.get ("/api/v1/health"  ,(req, res) => {
    res.json ({
        message: 'test17758632'
    });
})

app.listen(PORT, ()=> {
    console.log("app is running")
})