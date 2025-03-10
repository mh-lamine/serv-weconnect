const { sendSMS } = require("../utils/businessLogic");

exports.contactMe = async (data) => {
  const { name, contact } = data;
  const message = `Un nouveau salon souhaite s'inscrire\n\nNom: ${name}\nContact: ${contact}`;
  try {
    await sendSMS("0768580893", message);
    await sendSMS("0786277929", message);
    await sendSMS("0629640428", message);
  } catch (error) {
    throw { statusCode: 500, message: error.message };
  }
};
