const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const validator = require("validator");
const userSchema = new Schema(
    {
      name: { type: String, trim: true, default: null },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error("email is not valid");
          }
        },
      },
      password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
      },
      phone_number:{ 
        type: Number,
        required: true,
        unique: true,
        min: 1000000000,
        max: 9999999999
      },
      role:{ 
        type: Number,
        required: true,
        default: 0
      },
      created_at: { type: Date, default: Date.now },
      updated_at: { type: Date, default: Date.now }
  
    },
  
  );

  userSchema.pre("save", async function (next) {
    const user = this;
    console.log(user);
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
    }
    next();
  });

  const User = mongoose.model("User", userSchema);

module.exports = User;