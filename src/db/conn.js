const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/Restaurant",{
    useUnifiedTopology:true,
}).then(()=>{
    console.log("server connected successfully...");
}).catch((e)=>{
    console.log("server not connected ...");
});