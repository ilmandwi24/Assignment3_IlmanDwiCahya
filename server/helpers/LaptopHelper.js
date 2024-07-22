const Boom = require('boom');

const CommonHelper = require('./CommonHelper');
const Database = require('../services/Database');
const Prisma = require('../services/Prisma');
const LaptopDb = require('../services/LaptopDb');

// const getAllList = async () => {
//   try {
//     const data = await Database.getListPhonebook();
//     if (data.length === 0) {
//       return Boom.notFound('Phonebook not found');
//     }
//     return {
//       count: data.length,
//       list: data
//     };
//   } catch (error) {
//     CommonHelper.log(['PhoneBook Helper', 'getAllList', 'ERROR'], { message: `${error}` });
//     throw CommonHelper.errorResponse(error);
//   }
// };


const addPhonebook = async (req) => {
  try {
    await Database.addPhonebook(req.body.name, req.body.number);
    return `Added '${req.body.number}' as '${req.body.name}' to phonebook`;
  } catch (error) {
    CommonHelper.log(['PhoneBook Helper', 'addPhonebook', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const getAllList = async () => {
  try {
    const data = await LaptopDb.getListLaptop();
    if (data.length === 0) {
      return Boom.notFound('Laptop not found');
    }
    return {
      count: data.length,
      list: data
    };
  } catch (error) {
    CommonHelper.log(['Laptop Helper', 'getAllList', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const addLaptop = async (req) => {
  try {
    await LaptopDb.addLaptop(req.body.nama, 
      req.body.brand, 
      req.body.processor,
      req.body.ram,
      req.body.vga,
      req.body.harga);
    return `Added '${req.body.nama}' to laptop`;
  } catch (error) {
    console.log(error);
    CommonHelper.log(['Laptop Helper', 'addLaptop', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const editLaptop = async (req) => {
  try {
    const editAction = await LaptopDb.editLaptop(req.params.id, req.body.nama, 
      req.body.brand, 
      req.body.processor,
      req.body.ram,
      req.body.vga,
      req.body.harga);
      
    if (!editAction) {
      return Boom.notFound(`Laptop with id ${req.params.id} not found `);
    }
    return `Edited '${req.body.nama}' to laptop`;
  } catch (error) {
    console.log(error)
    CommonHelper.log(['Laptop Helper', 'editLaptop', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const deleteLaptop = async (req) => {
  try {
    const deleteAction = await LaptopDb.deleteLaptop(req.params.id);
    if (!deleteAction) {
      return Boom.notFound(`Laptop with id ${req.params.id} not found `);
    }
    return `Delete id ${req.params.id} successfully`;
  } catch (error) {
    CommonHelper.log(['Laptop Helper', 'deleteLaptop', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};
// const deletePhonebook = async (req) => {
//   try {
//     const deleteAction = await Database.deletePhonebook(req.params.id);
//     if (!deleteAction) {
//       return Boom.notFound(`Phonebook with id ${req.params.id} not found `);
//     }
//     return `Delete id ${req.params.id} successfully`;
//   } catch (error) {
//     CommonHelper.log(['PhoneBook Helper', 'deletePhonebook', 'ERROR'], { message: `${error}` });
//     throw CommonHelper.errorResponse(error);
//   }
// };

const getAllListV2 = async () => {
  try {
    const data = await Prisma.getListPhonebook();
    if (data.length === 0) {
      return Boom.notFound('Phonebook not found');
    }
    return {
      count: data.length,
      list: data
    };
  } catch (error) {
    CommonHelper.log(['PhoneBook Helper', 'getAllList', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const addPhonebookV2 = async (req) => {
  try {
    await Prisma.addPhonebook(req.body.name, req.body.number);
    return `Added '${req.body.number}' as '${req.body.name}' to phonebook`;
  } catch (error) {
    CommonHelper.log(['PhoneBook Helper', 'addPhonebook', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const editPhonebookV2 = async (req) => {
  try {
    const editAction = await Prisma.editPhonebook(req.params.id, req.body.name, req.body.number);
    if (!editAction) {
      return Boom.notFound(`Phonebook with id ${req.params.id} not found `);
    }
    return `Edited '${req.body.number}' as '${req.body.name}' to phonebook`;
  } catch (error) {
    CommonHelper.log(['PhoneBook Helper', 'editPhonebook', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const deletePhonebookV2 = async (req) => {
  try {
    const deleteAction = await Prisma.deletePhonebook(req.params.id);
    if (!deleteAction) {
      return Boom.notFound(`Phonebook with id ${req.params.id} not found `);
    }
    return `Delete id ${req.params.id} successfully`;
  } catch (error) {
    CommonHelper.log(['PhoneBook Helper', 'deletePhonebook', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

module.exports = {
  getAllList,
  addPhonebook,
  editLaptop,
  // deletePhonebook,
  deleteLaptop,
  getAllListV2,
  addPhonebookV2,
  editPhonebookV2,
  deletePhonebookV2,
  addLaptop
};
