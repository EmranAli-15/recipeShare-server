"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        required: true
    },
    address: {
        type: String,
        required: false
    },
    photo: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false
    },
    experience: {
        type: Number,
        required: false
    },
    following: {
        type: [mongoose_1.Types.ObjectId],
        require: false,
        ref: "User"
    },
    followers: {
        type: [mongoose_1.Types.ObjectId],
        require: false
    },
    totalRecipes: {
        type: Number,
        required: false
    },
    isDeleted: {
        type: Boolean,
        required: false
    },
    OTP: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.saltRounds));
        next();
    });
});
userSchema.post('save', function (next) {
    const user = this;
    user.password = "";
});
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password; // Remove the password field
    return user;
};
exports.User = (0, mongoose_1.model)('User', userSchema);
