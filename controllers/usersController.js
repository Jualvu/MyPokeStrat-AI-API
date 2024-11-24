const User = require('../models/UserModel');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler') //MIDDLEWARE

//@desc     Get all users
//@route    GET /api/v1/users
//@access   Public
exports.getUsers = asyncHandler(
    async(req, res, next) => {
        const usersList = await User.find();

        res.status(200).json({
            success: "True",
            msg: "Show all users",
            count: usersList.length,
            data: usersList
        });
    }
);
//@desc     Get single user
//@route    GET /api/v1/users/:id
//@access   Public
exports.getUser = asyncHandler (
    async(req, res, next) => {
        const user = await User.findById(req.params.id);
        //Error for user with proper id format not found
        if(!user){
            return next(new ErrorResponse(`User with id: ${req.params.id} not found`, 404));
        }
        //Correct response
        res.status(200).json({
            success: "True",
            msg: `Show user with id: ${req.params.id}`,
            data: user
        });
    }
);
//@desc     Create new user
//@route    POST /api/v1/users
//@access   Private
exports.createUser = asyncHandler(
    async(req, res, next) => {
        //Create user with json data from request
        const newUser = await User.create(req.body);
        //Correct response
        res.status(201).json({
            success: "True",
            msg: "Create new user",
            data: newUser
        });
    }
);
//@desc     Update single user by id
//@route    PUT /api/v1/users/:id
//@access   Private
exports.updateUser = asyncHandler(
    async(req, res, next) => {
        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        //Error for user with proper id format not found
        if(!user){
            return next(new ErrorResponse(`User with id: ${req.params.id} not found`, 404));
        }
        //Correct response
        res.status(200).json({
            success: "True",
            msg: `Update new user ${req.params.id}`,
            data: user
        });
    }
);
//@desc     Delete user by id
//@route    DELETE /api/v1/users/:id
//@access   Private
exports.deleteUser = asyncHandler(
    async(req, res, next) => {
        const user = await User.findByIdAndDelete(req.params.id);
        //Error for user with proper id format not found
        if(!user){
            return next(new ErrorResponse(`User with id: ${req.params.id} not found`, 404));
        }
        //Correct response
        res.status(200).json({
            success: "True",
            msg: `Delete user with id: ${req.params.id}`,
            data: user
        });
    }
);



