const { Thought, User } = require('../models');

// /api/thoughts
const thoughtController = {
    // get all thoughts
    getAllThought(req, res) {
        Thought.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select(-'__v')
        .sort({_id: -1})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // get 1 thought by _id 
    getThoughtById({ params }, res) {
        Thought.findOne({_id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
            // if no thoughts found, send 404
            if (!dbThoughtData) {
                res.status(404).json({message: "No thought found with that id."})
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    
    // createThought({ body}, res) {
    //     Thought.create(body)
    //     .then(dbThoughtData => res.json(dbThoughtData))
    //     .catch(err => res.status(400).json(err));
    // },

    // post new thought (push created thought's _id to the associated user's `thoughts` array field)
                // {
                //     "thoughtText": "Here's an interesting idea...",
                //     "username": "henry53",
                //     "userId": "5edff358a0fcb779aa7b118b"
                // }
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: params.userId },
                {$push: { thoughts: _id } },
                {new: true, runValidators: true}
            );
        })
        .then(dbThoughtData => {
            if (!dbThougthData) {
                res.status(404).json({message: 'No thought found with that ID.'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    // put update thought by _id
    updateThoughtById({ params }, res) {
        Thought.findOneAndUpdate({_id: params.id }, body, {new: true})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: "No thought found with that id."})
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    
    // delete thought by _id
    deleteThoughtById({ params }, res) {
        Thought.findOneAndDelete({_id: params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: "No thought found with that id."})
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // add reaction to thought
    // post to create a reaction stored in a single thought's `reactions` array
    addReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            {$push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thought found with that id.'})
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    
    // remove reaction to thought
    // delete to pull and remove a reaction by the reaction's `reactionId` value
    removeReaction({params}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: {reactionId: params.reactionId}}},
            {new: true}
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }
}


module.exports = thoughtController;