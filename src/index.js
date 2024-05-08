const express = require("express");
const nodemailer = require("nodemailer");

const cred = require("./credantial.js");
const path = require("path");
const hbs = require("hbs");
const app = express();
const order = require("./models/ordernow");

let nGlobalOTP;


require("./db/conn");
require("./models/ordernow");
require("../controllers/sendMail");


const port = process.env.PORT  || 3000;
static_path = path.join(__dirname , "../public");
templates_path = path.join(__dirname , "../templates/views");
partials_path = path.join(__dirname , "../templates/partials");

app.use(express.json());
app.use(express.static(static_path));
app.use(express.urlencoded({extended:false}))

app.set("view engine" , "hbs")
app.set("views", templates_path);
hbs.registerPartials(partials_path);
app.use("/images", express.static('images'));



app.listen(port , ()=>{
    console.log(`server is running on ${port}`);
});
app.get("/sendmail" ,(req,res)=>{
    res.render("form");
})
app.post("/sendmail", async(req,res)=>{
        const OTP = Math.floor(Math.random()*1000000);
        nGlobalOTP = OTP;
        const email = req.body.email;
        // const  message = req.body.message;
        console.log(email,OTP);

        // const VerifyMail = ()=>{
        //     const OTTPvalue = document.getElementById("otpValue").value;
        //     console.log(OTTPvalue);
        //     if(OTTPvalue === sendData)
        //     alert("Email Verified Successfully");
        //   }

        const mail = nodemailer.createTransport({
            host : 'smtp.gmail.com',
            port : 587,
            secure  : false,
            requireTLS:true,
            auth : {
                user : cred.user,
                pass : cred.pass,
            }
        })
        mail.sendMail({
            from : cred.user,
            to : email,
            subject: "Hello master",
            html : `message!!!<br> Your OTP is <h1>${OTP}</h1>`,
         
        },(err)=>{
            if(err){
                console.log(err);
            }
            res.render("formOtp");
    });
   
});


app.post("/", async(req,res)=>{
    try {
        const OTPvalue = req.body.input_value;
        // console.log(OTPvalue,nGlobalOTP);
        if(OTPvalue == nGlobalOTP)
         {
            res.render("index");
         }
        else{
            res.send("invalid OTP...");
        }
        
    } catch (error) {
        console.log(error);
    }    
});

app.get("/", (req,res)=>{
    res.render("index");
});

app.get("/breakfast", (req,res)=>{
    res.render("breakfast");
});


app.get("/dinner", (req,res)=>{
    res.render("dinner");
});

app.get("/evening", (req,res)=>{
    res.render("evening");
});


app.get("/lunch", (req,res)=>{
    res.render("lunch");
});


app.get("/all", (req,res)=>{
    res.render("index");
});


app.get("/order", (req,res)=>{
    res.render("orderform");
});

app.get("/readmore", (req,res)=>{
    res.render("readmore");
});

app.post("/order", async(req,res)=>{
    try {
        const OrderData = new order({
            fname:req.body.fname,
            address:req.body.address,
            amount:req.body.amount,
            footItemName:req.body.footItemName,
            zip:req.body.zip,
            email:req.body.email,
            state:req.body.state,
            city:req.body.city,
            lname:req.body.lname,
        });
        const OrderMaterial = await OrderData.save();
        res.status(201).render("orderSuccess")
    } 
        catch (error) {
        res.send(error);
        }  
})