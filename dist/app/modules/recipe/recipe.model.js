"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipe = void 0;
const mongoose_1 = require("mongoose");
const recipeSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false
    },
    recipe: {
        type: String,
        required: true
    },
    totalComment: {
        type: Number,
        required: false
    },
    comments: {
        userId: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User"
        },
        comment: {
            type: String,
        }
    },
    likes: {
        type: [mongoose_1.Types.ObjectId],
        require: false,
        ref: "User"
    },
    category: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: false
    },
    isDeleted: {
        type: Boolean,
        required: false
    }
}, {
    timestamps: true
});
exports.Recipe = (0, mongoose_1.model)('Recipe', recipeSchema);
