require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../models/users");
const auth = require("../middlewares/user-auth");
const registerUser = async (req, res) => {
    console.log("Inside user registration controller");
    const user = new User(req.body);
    try {
      await user.save();
      res.status(200).json({message:"User registered successflly!",user,status:true });
    } catch (error) {
      res.status(500).json({ message: "User creation failed", status: false, error:error.message});
  
    }
  };

  async function findAllUsers(req, res) {
    console.log("Inside user find All controller");
    try {
      const users = await User.find();
      if (!users) {
        res.status(404).json({status:false, message: "Users doesn't exists in the database" });
      } else {
        return res.status(200).json({status:true, users });
      }
    } catch (err) {
      return res.status(500).json({status:false, message: err.message });
    }
  };

  async function loginUser(req, res) {
    console.log("Inside login controller");
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        var user_logged_in = {
            "user_id":user._id,
            "name":user.name,
            "email":user.email,
            "phone_number":user.phone_number,
            "role":user.role
        }
        var isMatch = bcrypt.compareSync(password, user.password);
        if (isMatch) {
          var token = auth.createToken(user._id, user.email);
          return res.json({
            status: true,
            message: "Success",
            token, user_logged_in
          });
        }
        else {
          return res.status(403).json({ status: false, message: "Incorrect Password" });
        }
      } else {
        res.status(403).json({ status: false, message: "Incorrect Username or Email" });
      }
    } catch (err) {
      return res.status(500).json({status:false, message: "Error", err: err.message });
    }
  };

  async function removeUser(req, res) {
    console.log("Inside  remove user controller");
    const { id } = req.params;
    try {
      const remove_user = await User.findByIdAndDelete({ _id: id });
      if (!remove_user) {
        res.status(404).send({
          message: `User doesn't exists in the database.`,
          status: false
        });
      } else {
        return res.status(200).json({ message: `User deleted.`, status: true });
      }
    } catch (error) {
      res
        .status(500)
        .send({status:false, message: "User deletion failed", error: error.message });
    }
  };

  function updateUserDetails(req, res) {
    const keys = Object.keys(req.body);
    const allowedKeys = [
      "name",
      "email",
      "password",
      "phone_number",
      "current_password",
      "password",
    ];
    const isValidKeys = keys.every((key) => {
      return allowedKeys.includes(key);
    });
    if (!isValidKeys) {
      return res.status(400).send({
        status: false,
        message: "Invalid Keys are not allowed",
        allowed_keys: allowedKeys
      });
    }
    User.findOne({ _id: req.params.id }, (err, user) => {
      if (err)
        return res.status(500).json({ status: false, message: "Error occured to update user" });
      if (user) {
        user.name = (req.body.name) ? req.body.name : user.name;
        user.email = (req.body.email) ? req.body.email : user.email;
        user.phone_number = (req.body.phone_number) ? req.body.phone_number : user.phone_number;
        if (req.body.password) {
          var isMatch = bcrypt.compareSync(req.body.current_password, user.password); // check password match     
          if (isMatch) {
            user.password = req.body.password;
          } else {
            return res.status(400).json({ status: false, message: 'Wrong password. Try again!' });
          }
        }
        user.save((err, result) => { //Update Password
          if (!err) {
            return res.status(200).json({ status: true, message: 'User Updated Successfully' });
          }
          else {
            return res.status(500).json({ status: false, message: 'Failed', err });
          }
        })
      } else {
        return res.status(500).json({ status: false, message: 'Failed' });
      }
    })
  };

module.exports ={
    registerUser,
    findAllUsers,
    loginUser,
    removeUser,
    updateUserDetails
};