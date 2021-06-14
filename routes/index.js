const express = require('express');
const router = express.Router();
var multer  = require('multer')
const fs = require('fs');
const User = require("../models/users");

var upload = multer({ dest: 'uploads/' })

const jwtToken = 'key';
router.get('/', (req, res) =>{
    res.render("login");
});
// SIGNUP FORM
router.post('/signup', (req, res)=>{ 
    console.log(req.body);
    const {username, fullname, password}   = req.body;
    console.log(username);
    if(!username){
        return res.send("data undefined");
    }
    User.findOne({ username: username }, async (err, user) => {
      try{ if (err) {
        console.log(`there is an error ${error}`);
      }
      if (user) {
        //checking if  email is unique or no
        return res.json({
          status: 404,
          message: "user already exist ",
        });
      } else {
        try {
          // creating hash of password
          const salt = await bcrypt.genSalt(10);
          hashPassword = await bcrypt.hash(password, salt)
          console.log(hashPassword);
          //saving user to the database
          const user = await User.create({
            name: fullname,
            username: username,
            password: hashPassword,
          });
          var token = jwt.sign(
            { id: user._id},
            jwtToken,{expiresIn:"7d"}
          );
        //   res.status(200).json({
        //     token
        //     }
        //   });
        req.user = user;
        console.log(req.user);
        res.redirect('/users/:id/details');
        } catch (err) {
          res.status(404).send(err);
        }
      }
    }catch (err) {
        res.status(404).send(err);
      }
     
    
   })
})
// LOGIN FORM
router.post('/login', async(req, res)=>{
    try{
   //checkking if email exist or not
   const user = await User.findOne({ username: req.body.username });
   //console.log(user);
   
   if (!user || user.userDelete) {
     return res.json({
       status: 404,
       message: "user does not exist",
     });
   }
  
   //checking password
   const validPassword = await bcrypt.compare(
     req.body.password,
     user.password
   );
   if (!validPassword) {
     console.log("Wrong password");
     return res.json({
       status: 400,
       message: "Wrong password",
     });
   }
   var token = jwt.sign(
     { id: user._id, },
     jwtToken, {expiresIn:"1h"}
   );
   // console.log( process.env.JWT_SECRET);
   // console.log("you are logged in !");
//    res.status(200).json({
//      token
//    });
     req.user = user;
    res.render('/users/:id/details', {user});
   }
   catch(err){
     console.log(`there is an error ${err}`);
   }
});

router.get('/form', (req, res)=>{
    const qustions = ["qustion1", "qustion2", "qustion3","qustion4"];
    res.render("form", {qustions});
})
//Login post Method
router.post('/form', (req, res)=>{
    const qustions = ["qustion1", "qustion2", "qustion3","qustion4"];
    const qustionAndAnswers = [];
    for(let i = 0;i<qustions.length; i++){
        qustionAndAnswers.push({qustion:qustions[i],
        answer:req.body.answers[i]});
    }
    console.log(qustionAndAnswers);
});


router.get('/users/:id/form', (req, res)=>{
    const qustionAndAnswers = [{qustion : '1',answer : 'asdasdasd'}, {qustion : '2', answer : "sdasdasd"}];
    
    res.render("showForm",  {qustionAndAnswers})
})

router.get('/users/:id/details', (req,res)=>{
    const user = {name: "chandra prakash",
    username : "chandra" 
    }
    //console.log(req.user);
    //console.log(req.file);
    const video = '/uploads/8bbd430ff2bcac29797c43a61c3f20a1.mp4';
    res.render("userDetails", {user, video});
})
router.post('/users/:id/video', upload.single('video'),(req,res)=>{
    res.send(req.file.path);
})

router.get('/users/:id/video', function(req, res) {
    
    const path = 'uploads/sample.mp4'
    const stat = fs.statSync(path)
    const fileSize = stat.size
    //console.log(fileSize)
   // const range = req.headers.range
    console.log(req.headers.range);
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const chunksize = 10 ** 7;

      const end = Math.min(start + chunksize, fileSize-1)
        // console.log( "parts:" + parts);
        // console.log("end:" +end)
        // console.log("start:" +start);
       
      if(start >= fileSize) {
        res.status(416).send('Requested range not satisfiable\n'+start+' >= '+fileSize);
        return
      }
      console.log("chunksize:" + chunksize);
      const file = fs.createReadStream(path, {start, end})
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      }
  
      res.writeHead(206, head)
      file.pipe(res)
    } 
  })


module.exports = router ;