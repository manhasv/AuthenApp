import jwt from "jsonwebtoken";

// Generate JWT token and set cookie
export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("token", token, {
        httpOnly: true, // cookie cannot be accessed by client side scripts, prevent attacks like XSS
        secure: process.env.NODE_ENV === "production", // cookie will only be set on HTTPS
        sameSite: "strict", // prevent attack like CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    
    return token;
}