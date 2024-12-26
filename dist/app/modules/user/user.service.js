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
exports.userServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("./user.model");
const updateUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate(payload.id, { $set: payload.body }, { new: true, runValidators: true });
    return result;
});
const updateFollowingIntoDB = (myId, anotherPersonId, isFollow) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        if (isFollow) {
            yield user_model_1.User.findByIdAndUpdate(anotherPersonId, { $pull: { followers: myId } }, { session });
            yield user_model_1.User.findByIdAndUpdate(myId, { $pull: { following: anotherPersonId } }, { session });
        }
        else {
            yield user_model_1.User.findByIdAndUpdate(anotherPersonId, { $addToSet: { followers: myId } }, { session });
            yield user_model_1.User.findByIdAndUpdate(myId, { $addToSet: { following: anotherPersonId } }, { session });
        }
        yield session.commitTransaction();
    }
    catch (error) {
        yield session.abortTransaction();
    }
    finally {
        session.endSession();
    }
});
const myProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id).populate("following", "name photo followers");
    return result;
});
const anyUserProfileFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id);
    return result;
});
exports.userServices = {
    updateUserIntoDB,
    updateFollowingIntoDB,
    myProfile,
    anyUserProfileFromDB
};
