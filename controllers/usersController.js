const User = require('../models/UserModel');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler') //MIDDLEWARE
const bcryptjs = require('bcryptjs');

//@desc     Get all users
//@route    GET /api/v1/user
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
//@route    GET /api/v1/user/:id
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
//@route    POST /api/v1/user
//@access   Public
exports.createUser = asyncHandler(
    async(req, res, next) => {


        const {username, password} = req.body;

        if(!username || !password) {
            return next(new ErrorResponse('Data was not provided.',400));
        }


        let hashedPassword;

        try{
            hashedPassword = await bcryptjs.hash(password, 12);
        }catch(error){
            return next( new ErrorResponse(`Error trying to hash password: ${error}`, 400));
        }

        //Create user with json data from request
        let newUser = {
            username: username,
            password: hashedPassword
        } 

        await User.create(newUser);


        //Correct response
        res.status(201).json({
            success: "True",
            msg: "New user created",
            data: newUser
        });
    }
);
//@desc     Update single user by id
//@route    PUT /api/v1/user/:id
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
//@route    DELETE /api/v1/user/:id
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

//@desc     Log In user 
//@route    POST /api/v1/user/login
//@access   Public
exports.loginUser = asyncHandler(
    async(req, res, next) => {

        const { username, password } = req.body;

        const userFound = await User.findOne({ username: username});

        if(!userFound){
            return next(new ErrorResponse('User not found.', 400));
        }

        let isValidPassword = false;

        try{
            isValidPassword = await bcryptjs.compare(password, userFound.password);
        } catch(error){
            return next(new ErrorResponse(`Server error :${error} `), 500);
        }

        if(!isValidPassword){
            return next(new ErrorResponse('Invalid password', 400));
        }

        res.status(200).json({
            message: "Logged succesfully",
            logged: true
        });

    }
);



