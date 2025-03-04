const jwt = require('jsonwebtoken')
const JWT_SECRET = 'helloW@r|d'
const fetchuser = (req,res, next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "please autheniticate a valid token"})
    }
    try{
        const data = jwt.verify(token, JWT_SECRET)
        
// After decoding the token, jwt.verify returns the payload.
// In this case, the payload likely has a user object (e.g., { user: { id: "12345" } }).
// data.user extracts the user object from the decoded token.
// When you call jwt.verify(token, JWT_SECRET), the payload of the token is returned if the token is valid. This payload contains the data that was embedded in the token when it was created 
        req.user =  data.user
        next()
    }catch(error){
        res.send(401)
    }
}
module.exports = fetchuser;