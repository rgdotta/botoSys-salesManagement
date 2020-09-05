const Client = require("../models/clientSchema");

exports.findAll = async (req, res) => {
  try {
    const client = await Client.find({}, (err) => {
      if (err) {
        console.log(`MONGO ERROR: ${err}`);
      }
    });

    const response = res.json(client);

    console.log(response);
  } catch (err) {
    console.log(`SERVER ERROR: ${err}`);
  }
};

exports.createOne = async (req, res) => {
  try {
    const {
      entity,
      name,
      companyName,
      document,
      contact,
      adress,
      birthday,
    } = req.body;

    const client = new Client({
      entity: entity,
      name: name,
      companyName: companyName,
      document: document,
      contact: {
        email: contact.email,
        cellphone: contact.cellphone,
        phone: contact.phone,
        whatsapp: contact.whatsapp,
      },
      adress: {
        street: adress.street,
        stNumber: adress.stNumber,
        complement: adress.complement,
        neighborhood: adress.neighborhood,
        city: adress.city,
        state: adress.state,
      },
      birthday: birthday,
    });

    const saveClient = await client.save();

    console.log(saveClient);
  } catch (err) {
    console.log(`SERVER ERROR: ${err}`);
  }
};
