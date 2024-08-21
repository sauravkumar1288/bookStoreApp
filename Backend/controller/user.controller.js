import User from "../model/user.model.js";
import bcrypt from "bcryptjs"; // Corrected import name

export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // Check for existing user
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate a strong salt and hash the password securely
    const saltRounds = 12; // Adjust based on server performance needs (higher = slower)
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create and save the new user with the hashed password
    const createdUser = new User({
      fullname,
      email,
      password: hashedPassword, // Use the hashed password here
    });
    await createdUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error:", error.message); // Use console.error for sensitive errors
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async(req,res) =>{
    try {
        const{email,password} = req.body;
        const user = await User.findOne ({email})
        const isMatch = await bcrypt.compare(password,user.password)
        if(!user || !isMatch){
            return res.status(400).json({ message: "Invalid username or password" })
        }else{
            res.status(200).json({ message: "Login successfully", user:{
                _id : user._id,
                fullname : user.fullname,
                emaul:user.email
            }})
        }
    } catch (error) {
        console.log("Error:", error.message); // Use console.error for sensitive errors
        res.status(500).json({ message: "Internal server error" });
    }
}