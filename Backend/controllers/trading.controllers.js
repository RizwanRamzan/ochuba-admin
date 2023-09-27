const Trading = require("../models/Trading");
const Flutterwave = require("flutterwave-node-v3");
const flw = new Flutterwave(process.env.PUBLIC_KEY, process.env.SECRET_KEY);

exports.createTrading = async (req, res, next) => {
  try {
    let trading = new Trading({
      ...req.body,
      image: req.file.filename,
      type: req.params.type,
    });

    const result = await trading.save();

    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Failed to Create the Post",
        data: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: `Successfully Created the ${req.params.type} Trading Post`,
      user: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: err.message,
      data: [],
    });
  }
};

exports.findTradings = async (req, res, next) => {
  try {
    const tradings = await Trading.find({ type: req.params.type });

    if (tradings) {
      return res.status(200).json({
        success: true,
        message: "Got Data Successfully",
        data: tradings,
      });
    }
    return res.status(200).json({
      success: false,
      message: "No Data Found",
      data: [],
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: err.message,
      data: [],
    });
  }
};

exports.findTradingById = async (req, res, next) => {
  try {
    const trading = await Trading.findById(req.params.id);

    if (trading) {
      return res.status(200).json({
        success: true,
        message: "Got Data Successfully",
        data: trading,
      });
    }
    return res.status(200).json({
      success: false,
      message: "No Data Found",
      data: [],
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: err.message,
      data: [],
    });
  }
};

exports.findAllTradings = async (req, res, next) => {
  try {
    const tradings = await Trading.find({
      result: { $eq: "" },
    });

    if (tradings) {
      return res.status(200).json({
        success: true,
        message: "Got Data Successfully",
        data: tradings.reverse(),
      });
    }
    return res.status(200).json({
      success: false,
      message: "No Data Found",
      data: [],
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: err.message,
      data: [],
    });
  }
};

exports.findByIdAndDelete = async (req, res, next) => {
  try {
    const deletedtrading = await Trading.findByIdAndDelete(req.params.id);

    if (deletedtrading) {
      return res.status(200).json({
        success: true,
        message: "Successfully delete the Trading Post",
        data: [],
      });
    }
    return res.status(200).json({
      success: false,
      message: "Unable to delete the Trading Post",
      data: [],
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: err.message,
      data: [],
    });
  }
};

exports.calculateResult = async (req, res, next) => {
  try {
    const updatedTrading = await Trading.findByIdAndUpdate(req.params.id, {
      result: req.body.result,
    });

    if (updatedTrading) {
      return res.status(200).json({
        success: true,
        message: "Successfully calculated the result of Trading Post",
        data: [],
      });
    }
    return res.status(200).json({
      success: false,
      message: "Unable to delete the Trading Post",
      data: [],
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: err.message,
      data: [],
    });
  }
};

exports.Bid = async (req, res) => {
  try {
    const { bid, amount } = req.body;

    // Find the Trading document by its ID
    const trading = await Trading.findById(req.params.id);

    if (!trading) {
      return res.status(404).json({ error: "Trading not found" });
    }

    // Add the charge to the trading's bidding array
    trading.bids.push({
      bid: bid,
      amount: amount,
      userId: req.user.id,
    });

    // Save the updated trading document
    await trading.save();

    // Find the Trading document by its ID
    const user = await Trading.findById(req.user.id);

    // Add the charge to the trading's bidding array
    user.amount -= amount;

    // Save the updated trading document
    await user.save();

    res.status(200).json({ message: "Bid Placed successfully", charge });
  } catch (error) {
    console.error("Payment failed:", error);
    res.status(500).json({ error: "Payment failed" });
  }
};

exports.Payment = async (req, res) => {
  try {
    const { card_number, cvv, expiry_month, expiry_year, amount } = req.body;

    // Create a customer in Stripe
    const payload = {
      card_number: card_number,
      cvv: cvv,
      expiry_month: expiry_month,
      expiry_year: expiry_year,
      currency: "NGN",
      amount: amount,
      email: req.user.email,
      fullname: req.user.fullName,
      tx_ref: "YOUR_PAYMENT_REFERENCE",
      enckey: process.env.ENCRYPTION_KEY,
    };
    flw.Charge.card(payload).then(async (response) => {
      console.log(response);

      // Find the Trading document by its ID
      const user = await Trading.findById(req.user.id);

      // Add the charge to the trading's bidding array
      user.amount += amount;

      // Save the updated trading document
      await user.save();

      res.status(200).json({ message: "Payment successful", charge });
    });
  } catch (error) {
    console.error("Payment failed:", error);
    res.status(500).json({ error: "Payment failed" });
  }
};
