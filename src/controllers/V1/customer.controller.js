const { createUser, getAllUser, getUserbyId} = require('../../models/V1/customer.model')

const createUserController = async (req, res) => {
    try {
        const body = req.body;
        const result = await createUser(body);
        res.status(201).json({
            status: "Success",
            message: "Create Customer Succes! Data Added Successfully",
            result
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: "An error occurred while adding customer data",
            details: error.message
        });
    }
};

const getAllUsersController = async (req, res) => {
    try {
        const usersData = await getAllUser();
        res.status(200).json({
            status: "Success",
            message: "All Users found! Data displayed successfully",
            usersData
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: "An error occured while displayed customer data", 
            error: error.message 
        });
    }
};

const getUserbyIdController = async (req, res) => {
    try {
        const { userId } = req.params
        const user = await getUserbyId(userId)
        // console.log('isi dari variabel userId adalah', userId)
        
        
        if (user){
            res.status(200).json({
                status: "Success",
                message: "Detail User Found! Data displayed successfully",
                user
            })
        } else {
            res.status(404).json({
                status: "Fail",
                message: "User not found !"
            })
        }
    } catch(error) {
        res.status(500).json({
            status: "fail",
            error: "An error occurred while searching for user data",
            details: error.message
        })
    }
}


module.exports = { createUserController, getAllUsersController, getUserbyIdController };