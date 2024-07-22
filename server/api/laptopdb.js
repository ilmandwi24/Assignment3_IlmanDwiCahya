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

// router.get('/', CommonHelper.preHandler, getListPhonebook);
// router.post('/', CommonHelper.preHandler, addPhonebook);
router.get('/', CommonHelper.preHandler, getListLaptop);
router.post('/', CommonHelper.preHandler, addLaptop);
router.put('/:id', CommonHelper.preHandler, editLaptop);
// router.put('/:id', CommonHelper.preHandler, editPhonebook);
router.delete('/:id', CommonHelper.preHandler, deleteLaptop);

module.exports = router;
