const express=require("express")
const mongoose=require("mongoose")
const bodyParser = require('body-parser');
const nodemailer=require("nodemailer")

const app=express()
const cors=require("cors")

app.use(cors())

app.use(bodyParser.json()); 

mongoose.connect("mongodb://127.0.0.1:27017/booking").then(()=>{
    console.log("connected to database")
})
.catch(()=>{
    console.log("not connected to database")
})

const User=mongoose.model("User",{
    userId:String,
    userName:String,
    emailId:String,
    password:String,
    confirmPassword:String,
    phoneNumber:String,
    
},"details")

const Order=mongoose.model("Order",{
  userId:String,
  desc:String,
  price:String,
  userName:String,
  emailId:String,
  password:String,
  vehicleModel:String,
  address:String
},"order")

// app.post("/login",function(req,res){
//     Details.find().then(function(retdata){
//         console.log(retdata)
//         res.send(retdata)
//     })
// })


app.post("/User/login", function (req, res) {
    const { emailId, password, userId } = req.body;
   
    

    User.findOne({ password:password,
      userId:userId,
      emailId:emailId,})
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: 'User not found or incorrect password' });
        }
        console.log(user);
        res.status(200).json({ message: 'Login successful', user });
      })
      .catch((err) => {
        console.error("Error during login:", err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });
  

app.get("/User/signUp",function(req,res){

  User.find().then((retdata)=>{
    console.log(retdata)
    res.send(retdata)
})

})

// app.get("/User/order/all/:userId", function(req, res) {
//   User.find().then((retdata) => {
//     console.log(retdata);
//     res.send(retdata);
//   }).catch((error) => {
//     console.error("Error fetching data:", error);
//     res.status(500).send("Internal server error");
//   });
// });


app.get("/User/GetOrders/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    
    const orders = await Order.find({ userId }).select('desc price');
    
    if (orders.length > 0) {
      res.status(200).json(orders);
      console.log(orders);
    } else {
      res.status(404).json({ message: "No orders found for this user." });
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});



app.delete("/User/DeleteOrder/:userId", async (req, res) => {
  const { userId } = req.params;
  // const { emailId } = req.query; 

  try {
    const result = await Order.deleteOne({ userId });
    if (result.deletedCount > 0) {
      console.log("Order Deleted");
      res.status(200).json({ message: "Order successfully deleted." });
    } else {
      res.status(404).json({ message: "Order not found." });
    }
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});


app.get("/User/booking/allUser", async function(req, res) {
  try {
    const retdata = await Order.find({});
    res.status(200).send(retdata);
  } catch (err) {
    res.status(500).send({ message: "Error retrieving orders" });
  }
});



app.post("/User/booking",function(req,res){
  const {desc,price,password,userId,emailId,address,userName,vehicleModel}=req.body

  const newOrder=new Order({
    desc:desc,
    price:price,
    password:password,
    userId:userId,
    emailId:emailId,
    address:address,
    userName:userName,
    vehicleModel:vehicleModel
  })

  newOrder.save()
  .then(()=>{
    console.log("User created order successfully");
        res.status(201).json( 'User created order successfully');
  })
  .catch((err) => {
    console.error("Error ordering:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  });
})

app.post("/User/signUp", function(req, res) {
    const { userName, emailId, password, confirmPassword, phoneNumber } = req.body;
  
     const newUser = new User({
      userName: userName,
      emailId: emailId,
      password: password,
      confirmPassword: confirmPassword,
      phoneNumber: phoneNumber
    });
  
    newUser.save()
      .then(() => {
        console.log("User created successfully");
        res.status(201).json( 'User created successfully');
      })
      .catch((err) => {
        console.error("Error saving user:", err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });

  //Mail Functionality

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "daveram2273@gmail.com",
      pass: "khqp zarc tcrs xokj",
    },
  });
  
  
  // async function sendPendingMessage(email) {
  //   const info = await transporter.sendMail({
  //     from: {
  //       name: 'daveram',
  //       address: "daveram2273@gmail.com",
  //     },
  //     to: {email},
  //     subject: "Status",
  //     text: "Pending ....",
  //     html: "<b>Pending</b>",
  //   });
  
  //   console.log("Message sent: %s", info.messageId);
  // }


  
  
  async function sendCompletedMessage(email) {
    const info = await transporter.sendMail({
      from: {
        name: 'daveram',
        address: "daveram2273@gmail.com",
      },
      to :{email},
      subject: "Status",
      text: "Ready to Delevery ....",
      html: "<b>Ready to Delevery</b>",
    });
  
    console.log("Message sent: %s", info.messageId);
  }
  
  app.post('/pending', (req, res) => {
    const { email } = req.body;
    sendPendingMessage(email);
    res.send('Pending message sent');
  });
  
  app.post('/completed', async (req, res) => {
    const { email, message } = req.body;
  
    console.log('Received email:', email); 
    console.log('Received message:', message); 
  
    if (!email || !message) {
      return res.status(400).send('Email and message are required'); 
    }
  
    try {

    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    }
  });
  
  

app.listen(3001,function(){
    console.log("server is running on port 3001")
})