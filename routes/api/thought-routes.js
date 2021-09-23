const router = require('express').Router();
const { 
    getAllThought, 
    getThoughtById,
    addThought,
    updateThought,
    removeThought, 
    addReaction,
    removeReaction 
} = require('../../thought-controller');


//  Set up GET and Post /api/thoughts
router
    .route('/')
    .get(getAllThought)
    .post(addThought)
    

//  Set up GET 1, PUT, DELETE /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought)
    .post(addReaction)
    
//  Set up DELETE /api/thoughts/:thoughtId/:reactionId
router
    .route('/:thoughtId/:reactionId')
    .delete(removeReaction);

module.exports = router;