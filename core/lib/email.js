const nodemailer = require('nodemailer');
const email = require('./../configs/email');

function Email () {

  this.text;

  this.subject;

  this.transporter = nodemailer.createTransport(email.transporter);

  this.options = email.options;

  this.send = () => {

    let options = Object.assign({}, this.options);

    options.subject = this.subject || options.subject;
    options.text =  this.text || options.text;
    this.transporter.sendMail(options, this.cb);

  }

  this.cb = (error, info) => {

    if (error) {
      console.log(error);
      return;
    } 
    
  }
}

module.exports = Email;