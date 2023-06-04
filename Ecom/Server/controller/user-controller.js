import Users from "../model/user.js";
import jwt from "jsonwebtoken";
export const userSignUp = async (req, res) => {
  try {
    const exits = await Users.findOne({ userName: req.body.userName });
    if (exits) {
      return res.status(500).json({ message: "UserName already register" });
    }
    const user = req.body;
    const newUser = new Users(user);
    await newUser.save();
    res.status(200).json({ message: user });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const userLogin = async (req, res) => {
  try {
    const user = await Users.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    const token = await jwt.sign({ user: user }, "secretkey", {
      expiresIn: "10d",
    });
    console.log(token);
    if (user) {
      res.status(200).json({ token: token });
    } else {
      res.status(401).json({
        message: "Something went wrong please check username or password",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith("Bearer")) {
      token = authorization.split(" ")[1];
      const { user } = await jwt.verify(token, "secretkey");
      delete user.password;
      delete user.__v;
      if (user) {
        res.status(200).json({
          data: user,
        });
      } else {
        res
          .status(401)
          .json({ message: "Something went wrong not able to find any user" });
      }
    } else {
      res.status(401).json({ message: "Token is required" });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: err });
  }
};

export const updateUserDetails = async (req, res) => {
  try {
    let token;
    const { authorization } = req.headers;
    const payload = req.body;
    if (authorization && authorization.startsWith("Bearer")) {
      token = authorization.split(" ")[1];
      const { user } = await jwt.verify(token, "secretkey");
      const exits = await Users.findOne({ _id: user._id });
      if (!exits) res.status(401).json({ message: "User is not registered" });
      const updated = await Users.findOneAndUpdate(
        { userName: exits.userName },
        {
          $set: {
            ...payload,
          },
        },
        {
          new: true,
        }
      );
      res.status(200).json({ message: updated });
    } else {
      res.status(401).json({ message: "Token is required" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
