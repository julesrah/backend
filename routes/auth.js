const express = require('express');
const router = express.Router();
const { registerUser,
        loginUser,
        logout,
        forgotPassword,
        resetPassword,
        getUserProfile,
        updatePassword,
        updateProfile,
        allUsers,
        getUserDetails,
        updateUser,
        deleteUser} = require('../controllers/authController');
const {getProducts,
        newProduct} = require('../controllers/productController');

const {isAuthenticatedUser,
        authorizeRoles} = require('../middlewares/auth');


router.get('/products', isAuthenticatedUser, getProducts);
router.get('/me', isAuthenticatedUser, getUserProfile);

router.post('/products/new', newProduct);
router.post('/login', loginUser);

router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/logout').get(logout);
router.route('/register').post(registerUser);
router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), allUsers);

router.put('/password/update', isAuthenticatedUser, updatePassword);
router.put('/me/update', isAuthenticatedUser, updateProfile);

router.route('/admin/user/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser)

module.exports = router;

