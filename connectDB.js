import mongoose from "mongoose";
export default (async()=>{
    try {
       const data= await mongoose.connect('mongodb://127.0.0.1:27017/test1');
       console.log(`mongo db conned successfully`.bgYellow)
    } catch (error) {
        console.log(`not connected with db ${error.message}`.bgRed)
        process.exit(1)
    }
})
