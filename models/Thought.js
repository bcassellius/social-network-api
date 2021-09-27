const { Schema, model, Types } = require('mongoose');
// const dateFormat = require('../../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // get: createdAtVal => dateFormat(createdAtVal)
        }  
    }
)

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: `Tell us what you're thinking!`,
            unique: true,
            trim: true,
            minLength:1,
            maxLength:280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        reactions: [ReactionSchema]
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
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.reduce((total, comment) => total + thought.reactions.length + 1, 0);;
});

// create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;