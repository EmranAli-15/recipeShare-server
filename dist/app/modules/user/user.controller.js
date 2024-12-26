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
exports.userControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const user_service_1 = require("./user.service");
const updateAUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { id } = req.params;
    const result = yield user_service_1.userServices.updateUserIntoDB({ body, id });
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'User data updated successfully',
        data: result
    });
}));
const updateFollowing = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: whom, isFollow } = req.body;
    const { userId: myId } = req.user;
    const result = yield user_service_1.userServices.updateFollowingIntoDB(myId, whom, isFollow);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Following status updated!',
        data: result
    });
}));
const myProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_service_1.userServices.myProfile(id);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "My profile data fetched successfully",
        data: result
    });
}));
const anyUserProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_service_1.userServices.anyUserProfileFromDB(id);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User profile data fetched successfully",
        data: result
    });
}));
exports.userControllers = {
    updateAUser,
    updateFollowing,
    myProfile,
    anyUserProfile
};
