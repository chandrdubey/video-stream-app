const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    res.render("login");
});

router.post('/login', (req, res)=>{
    console.log(req.body);

});

router.get('/form', (req, res)=>{
    const qustions = ["qustion1", "qustion2", "qustion3","qustion4"];
    res.render("form", {qustions});
})
router.post('/form', (req, res)=>{
    const qustions = ["qustion1", "qustion2", "qustion3","qustion4"];
    const qustionAndAnswers = [];
    for(let i = 0;i<qustions.length; i++){
        qustionAndAnswers.push({qustion:qustions[i],
        answer:req.body.answers[i]});
    }
    console.log(qustionAndAnswers);
});




module.exports = router ;