const AsyncHandler=(fn)=>{
    return async(req,res,next)=>{
    try{
        await fn(req,res,next);
    }catch(error){
        console.error(error);
        res.status(500).json({message:error.message});
    }
}

}
export default AsyncHandler;