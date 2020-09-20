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
    console.log(`DB ERROR: ${err}`);
  }
};

exports.findBirthdays = async (req, res) => {
  try {
    const products = await Client.find({}, "name birthday", (err) => {
      if (err) {
        console.log(`MONGO ERROR: ${err}`);
      }
    });

    const response = res.json(products);

    console.log(response);
  } catch (err) {
    console.log(`DB ERROR: ${err}`);
  }
};

exports.createOne = async (req, res) => {
  try {
    const client = req.body;

    const newClient = new Client({
      entity: client.entity,
      name: client.name,
      companyName: client.companyName,
      document: client.document,
      contact: {
        email: client.contact.email,
        cellphone: client.contact.cellphone,
        phone: client.contact.phone,
        whatsapp: client.contact.whatsapp,
      },
      adress: {
        street: client.adress.street,
        stNumber: client.adress.stNumber,
        complement: client.adress.complement,
        zipcode: client.adress.zipcode,
        neighborhood: client.adress.neighborhood,
        city: client.adress.city,
        state: client.adress.state,
      },
      birthday: client.birthday,
    });

    const saveClient = await newClient.save();

    console.log(saveClient);
  } catch (err) {
    console.log(`DB ERROR: ${err}`);
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const { id } = req.body;

    const client = await Client.findByIdAndDelete({ _id: id }, (err) => {
      if (err) {
        console.log(`MONGO ERROR: ${err}`);
      }
    });

    console.log(client);
  } catch (err) {
    console.log(`DB ERROR: ${err}`);
  }
};

exports.putOne = async (req, res) => {
  try {
    const client = req.body;

    const editClient = await Client.findOneAndUpdate(
      { _id: client.id },
      {
        entity: client.entity,
        name: client.name,
        companyName: client.companyName,
        document: client.document,
        contact: {
          email: client.contact.email,
          cellphone: client.contact.cellphone,
          phone: client.contact.phone,
          whatsapp: client.contact.whatsapp,
        },
        adress: {
          street: client.adress.street,
          stNumber: client.adress.stNumber,
          complement: client.adress.complement,
          zipcode: client.adress.zipcode,
          neighborhood: client.adress.neighborhood,
          city: client.adress.city,
          state: client.adress.state,
        },
        birthday: client.birthday,
      },
      (err) => {
        if (err) {
          console.log(`MONGO ERROR: ${err}`);
        }
      }
    );

    console.log(editClient);
  } catch {
    console.log(`DB ERROR: ${err}`);
  }
};
