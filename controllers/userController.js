const bcrypt = require("../libs/passwordLib"); 
const sql = require("../libs/dbConnect");
const shortId = require("shortid");
const generateResponse = require("../libs/responseLib");
const token = require("../libs/tokenLib");

function createUser(req,res){
    const hashedPass = bcrypt.hashPassword(req.body.password);
    let user = {
        userId : shortId.generate(),
        name : req.body.name,
        email : req.body.email,
        password : hashedPass
    }
    sql.query(`insert into users set ?`,user,(err,result)=>{
        if(err){
            return res.send(generateResponse(true,404,"Database Failure"+err,null));
        }else{
            return res.send(generateResponse(false,200,"created Successfully",null));
        }
    });
}

function login(req,res){
    console.log(req.body);
    sql.query(`select * from users where email = ?`,req.body.email,(err,result)=>{
        if(err){
            res.send(generateResponse(true,404,"invalid email or password"+err,null));
        }else{
            const valid = bcrypt.comparePassword(req.body.password,result[0].password);
            if(valid){
                const authToken = token.generateToken({userId : result[0].userId,name: result[0].name,email : result[0].email});
                res.send(generateResponse(false,200,"Login Success",authToken));
            }else{
                res.send(generateResponse(true,404,"failed",null));
            }
        }
    });
}

function getOthers(req,res){
    sql.query(`select userId, name from users where userId <> ?`,req.query.otherThan,(err,result)=>{
        if(err){
            res.send(generateResponse(true,404,"daabse err",null));
        }
        else{
            res.send(generateResponse(false,200,"found",result));
        }
    });
}

function getAll(req,res){
    sql.query('select userId,name from users',(err,result)=>{
        if(err){
            res.send(generateResponse(true,404,"No users found db err",null));
        }else{
            res.send(generateResponse(false,200,"Found users",result));
        }
    })
}

function createGroup(req,res){
    console.log(req.body);
    let name = req.body.groupName;
    let users = req.body.users;
    for(let user of users){
        sql.query('insert into mygroup set ?',{name : name,userId : user.userId});
    }
    res.send(generateResponse(false,200,"Created Group",{groupName : name}));
}

function getmyGroup(req,res){
    let userId = req.query.userId;
    sql.query('select name from mygroup where userId = ?',userId,(err,result)=>{
        if(err){
            res.send(generateResponse(true,404,"No Groups Found",null));
        }else{
            res.send(generateResponse(false,200,"Found",result));
        }
    });
}

module.exports.createUser = createUser
module.exports.login = login;
module.exports.getOthers = getOthers;
module.exports.getAll = getAll;
module.exports.createGroup = createGroup;
module.exports.getmyGroup = getmyGroup;
