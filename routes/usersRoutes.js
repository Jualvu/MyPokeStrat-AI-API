const express = require('express');
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser
} = require('../controllers/usersController');

const router = express.Router();


router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

router.route('/login')
    .post(loginUser);

module.exports = router;








