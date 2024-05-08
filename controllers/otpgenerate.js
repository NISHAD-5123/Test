const otpGenerator = require("otp-generator");
const otpGenerate = ()=>{
    const Otp = otpGenerator.generate(6, {
        upperCaseAlphabets : false,
        specialChars : false
    });
    return Otp;
}
module.exports = otpGenerate();