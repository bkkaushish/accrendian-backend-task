const express =require("express");
const {PrismaClient}= require("@prisma/client");
const bodyParser = require("body-parser");
const nodemailer=require("nodemailer");
const {google}=require("googleapis");

const app = express();
const PORT= process.env.PORT|| 1818;
const prisma= new PrismaClient();

app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());


//auth for mail service
//use after
const OAuthClient= new google.auth.OAuth2(
    'YOUR_CLIENT_ID',
  'YOUR_CLIENT_SECRET',
  'https://developers.google.com/oauthplayground'
);

OAuthClient.setCredentials({
    refresh_token: 'YOUR_REFRESH_TOKEN',
  });
////

//post request
app.post("/api",async(req,res)=>{
const {email,name,number}=req.body;

try{
   const formData= await prisma.formData.create({
    data:{
        email,
        name,
        number,
    },
   });

   res.json({formData});

   //MAIL the refer
  {  /*  const accessToken = await OAuthClient.getAccessToken();
const transferMail= nodemailer.createTransport({
    service:'gmail.com',
    auth:{
        type: 'OAuth2',
        user: 'your-email@gmail.com',
        clientId: 'YOUR_CLIENT_ID',
        clientSecret: 'YOUR_CLIENT_SECRET',
        refreshToken: 'YOUR_REFRESH_TOKEN',
        accessToken: accessToken.token,
    },
});
const mail={
    from:'sharmagauravmahesh@gmail.com',
    to:email,
    subject: 'YourLogo Referral',
    text:`Hi,\n\nYou have been referred to the YourLogo. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum omnis voluptatem accusantium nemo perspiciatis delectus atque autem! Voluptatum tenetur beatae unde. Please check it out!\n\nBest regards`,
}

transferMail.sendMail(mail,(error,info)=>{
    if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Failed to send email' });
      }
      
      res.status(200).json(formData);
    });
  
   console.log({formData});
    res.json({formData});  */  }
}
catch(error){
    console.error(error);
    res.status(500).json({ error: 'Error saving form data' });
}
});



app.listen(PORT,()=> console.log("server started at port: " + PORT));