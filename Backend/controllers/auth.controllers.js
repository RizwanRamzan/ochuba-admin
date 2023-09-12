const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const ejs = require("ejs");

function randomPassword() {
  return (
    Math.random().toString(36).slice(2) +
    Math.random().toString(36).toUpperCase().slice(2)
  );
}

exports.userSignup = async (req, res, next) => {
  try {
    console.log(req.body);
    req.body.password = randomPassword();
    console.log(req.body.password);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    let user = new User({
      ...req.body,
      password: hash,
    });
    const token = jsonwebtoken.sign(
      {
        data: [user.email, user._id],
        role: user.role,
      },
      "" + process.env.JWT_SECRET
    );
    const result = await user.save();
    if (!result) {
      return next(new ErrorResponse("Signup failed", 400));
    }
    ejs.renderFile(
      __dirname + "/../views/email.ejs",
      {
        user: result,
        password: req.body.body,
        message: "User has been created successfully",
        link: "www.google.com"
      },
      function (err, data) {
        if (err) return err;
        else {
          const transporter = nodemailer.createTransport({
            host: "smtp.office365.com", // Office 365 server
            port: 587, // secure SMTP
            secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
            auth: {
              user: "support@vipinfluencers.com",
              pass: "Sm@rt77385",
            },
            tls: {
              ciphers: "SSLv3",
            },
          });

          // send mail with defined transport object
          const mailOptions = {
            from: '"Softcity" <support@vipinfluencers.com>', // sender address
            to: result.email, // list of receivers
            subject: `Your user has been registered`, // Subject line
            html: data,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log("........error");
              console.log(error);
            } else {
              console.log("Mail sent : %s", info.response);
            }
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    return next(new ErrorResponse(err, 400));
  }
};

exports.userLogin = async (req, res, next) => {
  try {
    const result = await User.findOne({ email: req.body.email });
    if (!result) {
      // this means result is null
      return next(new ErrorResponse("Incorrect email address", 200));
    } else {
      // email did exist
      // so lets match password
      if (bcrypt.compareSync(req.body.password, result.password)) {
        // great, allow this user access
        const token = jsonwebtoken.sign(
          {
            data: [result.email, result._id],
            role: "user",
          },
          "" + process.env.JWT_SECRET
        );
        console.log(token);
        return res.status(200).json({
          success: true,
          message: "Successfully Logged in",
          token: token,
        });
      } else {
        return next(new ErrorResponse("Incorrect password", 200));
      }
    }
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find({});

    if (allUsers) {
      return res.status(200).json({
        success: true,
        message: "Got All Users Successfully",
        data: allUsers,
      });
    }
    return res.status(200).json({
      success: false,
      message: "No User Found",
      data: [],
    });
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};
