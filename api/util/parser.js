module.exports.toJson = arg => JSON.stringify(arg);

module.exports.toObject = arg => {
    try{
        return JSON.parse(arg)
    }catch(err){
        return arg;
    }
}