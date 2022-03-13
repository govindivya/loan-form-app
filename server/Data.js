const mongoose =require("mongoose");

const Details = new mongoose.Schema({
  personalDetails: {
    name: {
      type: String,
      required: [true, "Name is required field"],
    },
    father: {
      type: String,
      required: [true, "Father is required field"],
    },
    mother: {
      type: String,
      required: [true, "Mother is required field"],
    },
    email: {
      type: String,
      required: [true, "Email is required field"],
    },
    mobile: {
      type: String,
      required: [true, "Mobile is required field"],
    },
    countryName: {
      type: String,
      required: [true, "countryName is required field"],
    },
    stateName: {
      type: String,
      required: [true, "statName is required field"],
    },
    city: {
      type: String,
      required: [true, "City is required field"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required field"],
    },
    pincode: {
      type: String,
      required: [true, "Pincode is required field"],
    },
  },
  bussinessDetails: {
    bussinessName: {
      type: String,
      required: [true, "Bussiness details is required field"],
    },
    bussinessId: {
      type: String,
      required: [true, "Bussiness id is required field"],
    },

    bussinessType: {
      type: String,
      required: [true, "bussinessType is required field"],
    },
    bussinessLocation: {
      type: String,
      required: [true, "bussinessLocation is required field"],
    },
    bussinessRevenue: {
      type:String,
      required: [true, "bussinessRevenue is required field"],
    },
    gst: {
      type: String,
      required: [true, "gst is required field"],
    },
  },
  loanDetails: {
    loanAmount: {
      type: String,
      required: [true, "loandAmount is required field"],
    },
    loanReason: {
      type: String,
      required: [true, "loanReason is required field"],
    },
    loanPeriod: {
      type: String,
      required: [true, "loanPeriod is required field"],
    },
    loanSecurityType: {
      type: String,
      required: [true, "loanSecurityType is required field"],
    },
    gauranter: {
      type: String,
      required: [true, "gauranter is required field"],
    },
  },
});

const Loan = mongoose.model("Loan",Details);
module.exports=Loan;
