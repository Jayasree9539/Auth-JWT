import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import createToken from "../utils/createToken.js";

const createUser = async(req, res) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password) {
        return res.status(400).send(`Please fill all fields`);
    }
    const userExist = await User.findOne({email})
    if(userExist){
        return res.status(400).send(`User already exist`)
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({username,email,password:hashedPassword})
    await newUser.save();

    createToken(res, newUser._id);
    return res.status(201).json({_id: newUser._id, username:newUser.username, email:newUser.email})
}

const loginUser = async(req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password, user.password))){
        createToken(res, user._id);
        return res.status(200).json({_id: user._id, username: user.username, email: user.email});
    }

    return res.status(400).send(`invalid credentials`);
}

const logoutUser = async(req, res) => {
    res.cookie('jwt','', {
        httpOnly:true,
        expires:new Date(0)
    })
    return res.status(200).json({message:'Logged out Successfully'})
}

const getCurrentUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      return res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
    } else {
      return res.status(404).send('User not Found');
    }
  } catch (error) {
    return res.status(500).send('Server Error');
  }
};


export {createUser, loginUser, logoutUser, getCurrentUserProfile }