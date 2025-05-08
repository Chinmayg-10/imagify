import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userModal from "../Modals/userModal.js"

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) { 
            return res.json({
                success: false,
                message: "Some data is missing"
            });
        }

        const hashedPwd = await bcrypt.hash(password, 12);
        const userData = {
            name: name,
            email: email,
            password: hashedPwd
        };

        const newUser = new userModal(userData);
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({
            success: true,
            token,
            user, // ✅ Add this
            message: "User signup done"
        });
          
          
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message
        });
    }
};

const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModal.findOne({ email: email });

        if (!user) {
            return res.json({
                success: false,
                message: "User not found in Database"
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            return res.json({
                success: true,
                token: token,
                name: user.name,
                user: {
                    name: user.name,
                    email: user.email,
                    _id: user._id
                }
            });
        } else {
            return res.json({
                success: false,
                message: "Incorrect credentials"
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message
        });
    }
};

const userCredits = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await userModal.findById(userId);
        return res.json({
            success: true,
            credits: user.creditBalance,
            user: {
                name: user.name,
                email: user.email,
                _id: user._id
            }
        });
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message
        });
    }
};

export default {
    registerUser,
    LoginUser,
    userCredits
};
