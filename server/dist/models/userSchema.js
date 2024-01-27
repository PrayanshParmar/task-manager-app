"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUserById = exports.getUserByEmail = exports.getUsers = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// User Config
const UserSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
    },
});
exports.UserModel = mongoose_1.default.model('User', UserSchema);
// User Actions
const getUsers = () => exports.UserModel.find();
exports.getUsers = getUsers;
const getUserByEmail = (email) => exports.UserModel.findOne({ email });
exports.getUserByEmail = getUserByEmail;
const getUserById = (id) => exports.UserModel.findById(id);
exports.getUserById = getUserById;
const createUser = (values) => new exports.UserModel(values).save().then((user) => user.toObject());
exports.createUser = createUser;
