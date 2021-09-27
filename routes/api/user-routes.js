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
    .route('/')
    .get(getAllUser)
    .post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:userId
router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(removeUser);

// Set up Post and Delete at /api/users/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .post(createFriend)
    .delete(removeFriend)

module.exports = router;