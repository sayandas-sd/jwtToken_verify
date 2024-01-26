const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(express.json());

//user database in memory
const All_users = [
    {
        username: "sayan@gmail.com",
        name:"sayan",
        password:"123"
    },
    {
        username: "raj@gmail.com",
        name:"raj",
        password:"224"
    },
    {
        username: "raman@gmail.com",
        name: "raman",
        password: "333"
    },
];

function userExits(username,password){
    //return true or false if the user is exits
    let userExits = false;
    for(let i=0; i<All_users.length; i++) {
        if(All_users[i].username === username && All_users[i].password ===password){
            userExits = true;
        }
    }
    return userExits;
    //other way is -->
    /*
    const foundUser = All_users.find(user => All_users===username );
    return Boolean(founduser)
    */
}
app.get("/users",function(req,res) {
    const token = req.headers.authorization; 
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
        //return the user name
        res.json({
            users: All_users.filter(function(value){
                if(!(value.username === username)) {
                    return false;
                } else { 
                    return true;
                }
            })
        })
});

app.post("/login",function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    if(!(userExits(username,password))){
        res.status(403).json({
            msg: "user doesnot exits in memory "
        })
    }else{ 
        var token = jwt.sign({username: username},jwtPassword);
        return res.json({
            token,
        });
    }
});

//when error occur in code 
app.use((err,req,res,next)=>{
    res.json({
        msg:"worng input"
    })
})
app.listen(3000);







