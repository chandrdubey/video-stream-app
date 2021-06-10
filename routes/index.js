const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    res.render("login");
});

router.post('/login', (req, res)=>{
    console.log(req.body);

});

router.post('/form', (req, res)=>{
    res.render("login");
})




module.exports = router ;