const router = require('express').Router();
const { 
    getAllThought, 
    getThoughtById,
    addThought,
    updateThoughtById,
    deleteThoughtById, 
    addReaction,
    removeReaction 
} = require('../../controllers/thought-controller');


//  Set up GET and Post /api/thoughts
router
    .route('/api/thoughts/')
    .get(getAllThought)
    .post(addThought)
    

//  Set up GET 1, PUT, DELETE /api/thoughts/:thoughtId
router
    .route('/api/thoughts/:thoughtId')
    .get(getThoughtById)
    .put(updateThoughtById)
    .delete(deleteThoughtById)
    .post(addReaction)
    
//  Set up DELETE /api/thoughts/:thoughtId/:reactionId
router
    .route('api/thoughts/:thoughtId/:reactionId')
    .delete(removeReaction);

module.exports = router;