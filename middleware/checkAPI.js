const checkAPI = (req,res,next)=> {
try{

    const api_key = req.headers.api_key
    if(api_key==process.env.API_KEY){
        next()
    }

    else{
        throw(new Error("API KEY doesnt match"))
    }
}
catch(err){
    res.json({
        message: err.message
    })
}
    

}

module.exports = checkAPI