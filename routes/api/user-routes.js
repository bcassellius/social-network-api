const router = require ('express').Router();
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    removeUser,
    createFriend,
    removeFriend
} = require('../../controllers/user-controller');

// Set up GET all and POST at /api/users
router
    .route('/api/users/')
    .get(getAllUser)
    .post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:userId
router
    .route('/api/users/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(removeUser);

// Set up Post and Delete at /api/users/:userId/friends/:friendId
router
    .route('/api/users/:userId/friends')
    .post(createFriend)

router
    .route('/api/users/:userId/friends/:friendId')
    .delete(removeFriend)

module.exports = router;