import {user} from "../models/user.models.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/async-handler.js";

const registerUser = asyncHandler(async (req, res) => {
    const { email, username, password, role} = req.body

   const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if(existedUser){
        throw new ApiError("User already exists", 400)
    
    }

    const user = await User.create({
        email,
        password,
        username,
        isEmailVerified: false,
    })

     const { unHashedToken, hashedToken, tokenExpiry } = user.generateTemporaryToken()
});
