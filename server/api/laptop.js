const router = require('express').Router();
const CommonHelper = require('../helpers/CommonHelper');
// const PhoneBookHelper = require('../helpers/PhoneBookHelper');
const ValidationHelper = require('../helpers/ValidationHelper');
const LaptopHelper = require('../helpers/LaptopHelper');

// const getListPhonebook = async (req, res) => {
//   try {
//     // get data from json
//     const data = await PhoneBookHelper.getAllList();
//     // return response success
//     return res.send(data);
//   } catch (error) {
//     // return response error
//     CommonHelper.log(['PhoneBook', 'Get List Phonebook', 'ERROR'], {
//       message: `${error}`,
//       transaction_id: req.headers.transaction_id
//     });
//     return res.send(CommonHelper.errorResponse(error));
//   }
// };
const getListLaptop = async (req, res) => {
  try {
    // get data from json
    const data = await LaptopHelper.getAllList();
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['PhoneBook', 'Get List Phonebook', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};


// const addPhonebook = async (req, res) => {
//   try {
//     // check validation input
//     ValidationHelper.phoneBookValidation(req.body);
//     // get data from json
//     const data = await PhoneBookHelper.addPhonebook(req);
//     // return response success
//     return res.send(data);
//   } catch (error) {
//     // return response error
//     CommonHelper.log(['PhoneBook', 'Add Phonebook', 'ERROR'], {
//       message: `${error}`,
//       transaction_id: req.headers.transaction_id
//     });
//     return res.send(CommonHelper.errorResponse(error));
//   }
// };
const addLaptop = async (req, res) => {
  try {
    // check validation input
    ValidationHelper.laptopValidation(req.body);
    // get data from json
    const data = await LaptopHelper.addLaptop(req);
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['PhoneBook', 'Add Phonebook', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};
const editLaptop = async (req, res) => {
  try {
    // check validation input
    ValidationHelper.laptopValidation(req.body);
    // get data from json
    const data = await LaptopHelper.editLaptop(req);
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['Laptop', 'Edit Laptop', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};
// const editPhonebook = async (req, res) => {
//   try {
//     // check validation input
//     ValidationHelper.phoneBookValidation(req.body);
//     // get data from json
//     const data = await PhoneBookHelper.editPhonebook(req);
//     // return response success
//     return res.send(data);
//   } catch (error) {
//     // return response error
//     CommonHelper.log(['PhoneBook', 'Edit Phonebook', 'ERROR'], {
//       message: `${error}`,
//       transaction_id: req.headers.transaction_id
//     });
//     return res.send(CommonHelper.errorResponse(error));
//   }
// };

const deleteLaptop = async (req, res) => {
  try {
    // get data from json
    const data = await LaptopHelper.deleteLaptop(req);
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['Laptop', 'Delete Laptop', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};
// const deletePhonebook = async (req, res) => {
//   try {
//     // get data from json
//     const data = await PhoneBookHelper.deletePhonebook(req);
//     // return response success
//     return res.send(data);
//   } catch (error) {
//     // return response error
//     CommonHelper.log(['PhoneBook', 'Delete Phonebook', 'ERROR'], {
//       message: `${error}`,
//       transaction_id: req.headers.transaction_id
//     });
//     return res.send(CommonHelper.errorResponse(error));
//   }
// };

const getListLaptopV2 = async (req, res) => {
  try {
    // get data from json
    const data = await LaptopHelper.getAllListV2();
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['PhoneBook', 'Get List Phonebook', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const addLaptopV2 = async (req, res) => {
  try {
    // check validation input
    ValidationHelper.laptopValidation(req.body);
    // get data from json
    const data = await LaptopHelper.addLaptopV2(req);
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['Laptop', 'Add Phonebook', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transactionid
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const editLaptopV2 = async (req, res) => {
  try {
    // check validation input
    ValidationHelper.laptopValidation(req.body);
    // get data from json
    const data = await LaptopHelper.editLaptopV2(req);
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['Laptop', 'Edit Laptop', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transactionid
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const deleteLaptopV2 = async (req, res) => {
  try {
    // get data from json
    const data = await LaptopHelper.deleteLaptopV2(req);
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['Laptop', 'Delete Laptop', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transactionid
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};
// router.get('/', CommonHelper.preHandler, getListPhonebook);
// router.post('/', CommonHelper.preHandler, addPhonebook);
router.get('/v1/laptop', CommonHelper.preHandler, getListLaptop);
router.post('/v1/laptop', CommonHelper.preHandler, addLaptop);
router.put('/v1/laptop/:id', CommonHelper.preHandler, editLaptop);
// router.put('/:id', CommonHelper.preHandler, editPhonebook);
router.delete('/v1/laptop/:id', CommonHelper.preHandler, deleteLaptop);

// ROUTE PRISMA ORM 
router.post('/v2/laptop', CommonHelper.preHandler, addLaptopV2);
router.get('/v2/laptop', CommonHelper.preHandler, getListLaptopV2);
router.put('/v2/laptop/:id', CommonHelper.preHandler, editLaptopV2);
router.delete('/v2/laptop/:id', CommonHelper.preHandler, deleteLaptopV2);
module.exports = router;
