import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    fullName: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true,minlength:8 },
    profileImageUrl: { type: String, default: null },
  },
  { timestamps: true }
);


// --------- Hash password before saving

userSchema.pre('save',async function(next){
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

// --------- Compare password
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}



const User = mongoose.model("User", userSchema);

export default User; //export the model
