const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: 'You must enter your username!',
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: 'You must enter an email address.',
            trim: true,
            unique: true,
            match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please fill a valid email address']
        },
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// get total count of friends 
UserSchema.virtual('friendCount').get(function() {
    return this.replies.length;
});

// create the User model using the UserSchema
const User = model('User', UserSchema);

module.exports = User;
