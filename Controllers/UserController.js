const db = require('./../db/models');
const bcrypt= require("bcrypt")
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Register =async(req, res)=>{
const User=db.User;
  const {username, email, password, confirm_password} = req.body;
  console.log(req.body)
  if (password !== confirm_password) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);
   await User.create({
    username: username,
    email: email,
    password: encryptedPassword,
      });
   res.status(201).json({message: 'User created successfully.'})

    }

    const Login = async(req, res)=>{
      const User=db.User;

      const {username, password} = req.body;
      if (!(username && password)) {
        return res.status(400).json({'message': 'Email or password field is empty.'});
      }
      const user = await User.findOne({
        where: {
          username: username
        }
      });
      if (user && (await bcrypt.compare(password, user.password))) {
        user.token = getToken(user);
        await user.save();
        return res.status(200).json({user:(user), token: user.token});
      }
      return res.status(403).json({'msg': 'Credentials do not match our records.'});
    }
    
    const get_users = async (req, res) => {
      const User=db.User;
      try {
        const users = await User.findAll();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
    
    
    
    const current_user =   async (req, res) => {
        res.json(req.user);
      }

    // const change_password = async(req, res)=>{
    //   const User=db.User;
    //   const {password} = req.body;
    //   let user = req.user;
    //   user = await User.findOne(user);
    //   user = await (user).update({password: await bcrypt.hash(password, 10)})
    //   return res.status(200).json({user});
    // }
  
  const getToken = (user) => {
    const { id, username, email } = user;
    return jwt.sign(
      { user_id: id, username, email },
      process.env.TOKEN_KEY,
      { expiresIn: "10h" }
    )
  }
  
  module.exports= {Register, Login, get_users, current_user};

