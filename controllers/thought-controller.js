const { Thought } = require('../models');

const thoughtController = {
    // /api/thoughts
    
    // get all thoughts
    // get 1 thought by _id 
    // post new thought (push created thought's _id to the associated user's `thoughts` array field)
                // {
                //     "thoughtText": "Here's an interesting idea...",
                //     "username": "henry53",
                //     "userId": "5edff358a0fcb779aa7b118b"
                // }
    // put update thought by _id
    // delete thought by _id

    // /api/thoughts/:thoughtId/reactions

    // post to create a reaction stored in a single thought's `reactions` array
    // delete to pull and remove a reaction by the reaction's `reactionId` value
}


module.exports = thoughtController;