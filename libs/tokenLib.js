const jwt = require('jsonwebtoken');


function generateToken(data){
    const token = jwt.sign({userId : data.userId,name : data.name,email : data.email},"MyKey");
    return token;
}

function comapreToken(token){
    try{
        const decodedToken = jwt.verify(token,"MyKey"); 
        return decodedToken;
    }catch(err){
        return err;
    }
}

module.exports.generateToken =generateToken;
module.exports.comapreToken =comapreToken;