const { User, Thought } = require('../models');

const userController = {
    // /api/users
    
    // get all users
    getAllUser(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.cog(err);
            res.status(400).json(err);
        });
    },

    // get 1 user by _id and populated thought and friend data
    getUserById ({ params }, res) {
        User.findOne({_id: params.id})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
            // if no user found, send 404
            if(!dbThoughtData) {
                res.status(404).json({message: "No user found with this id."})
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // post new user
                // {
                //     "username": "henry53",
                //     "email": "henry53@email.com"
                // }
    
    createUser({ params, body }, res) {
        console.log(body);
        User.create(body)
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'No user with that id.'})
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    // put update user by _id
    updateUser({ params }, res) {
        User.findOneAndUpdate({_id: params.id }, body, {new: true})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: "No user found with that id."})
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // delete user by _id
    removeUser({ params }, res) {
        User.findOneAndDelete({_id: params.id})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: "No user found with this id!"})
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // ++Remove a user's associated thoughts when deleted

    // /api/users/:userId/friends/:friendId

    // post to add new friend to a user's friend list
    createFriend ({params, body}, res) {
        User.findByIdAndUpdate(
            {_id: params.userId},
            {$push: { friends: body } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'No user found with that id.'})
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    // delete to remove a friend from a user's friend list
    removeFriend({params}, res) {
        User.findOneAndUpdate(
            {_id: params.userId },
            { $pull: { friends: {friendId: params.friendId}}},
            {new: true}
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }
}

// Make sure path:'thoughts'
module.exports = userController;