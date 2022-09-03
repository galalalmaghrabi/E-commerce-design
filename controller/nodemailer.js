const nodemailer = require("nodemailer");


exports.verify = (email,id) => {
    return new Promise((resolve,reject)=>{
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'galalashraf102@gmail.com',
            pass: 'ajgaswltcfrstzyw'
        },
    });
    // send mail with defined transport object
        let info = transporter.sendMail({
            from: `galalashraf102@gmail.com`, // sender address
            to: `${email}`, // list of receivers
            subject: "Verify Account", // Subject line
            text: ``,
            html: `<form action="http://localhost:3000/confirm/${email}/${id}" method="get"> <input type="submit" value="Click Here To Verify Your Account"> <input type="hidden" value=${email} /><input type="hidden" value=${id} /></form>`, // html body
        })
})}