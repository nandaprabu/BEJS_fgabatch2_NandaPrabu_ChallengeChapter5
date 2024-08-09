const { createAccount, 
    getAllAccount, 
    getAccountId, 
    createAccountType,
    getAccountType } = require('../../models/V1/account.model')


const createAccountController = async (req, res) => {
    try {
        const body = req.body
        const account = await createAccount(body);
        res.status(200).json({
            status: "Success",
            message: "Create Account Succes! Data Added Successfully",
            account
        })

    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: "An error occurred while adding data account",
            details: error.message
        })
    }
}

const getAllAccountController = async (req, res) => {
    try {
        const accountsData = await getAllAccount();
        res.status(200).json({
            status: "succes",
            message: "All Account found! Data displayed successfully",
            accountsData
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: "An error occured while displayed account data",
            details: error.message
        })
    }
}

const getAccountIdController = async (req, res) => {
    try {
        const { accountId } = req.params
        const dataAccount = await getAccountId(accountId);
        // console.log('isi dari variabel AccountId adalah', accountId)

        if(dataAccount){
            res.status(200).json({
                status: "success",
                message: "Detail Account Found! Data displayed successfully",
                dataAccount
            })
        } else {
            res.status(404).json({
                status: "Fail",
                message: "Account Data not found",
                detail: error.message
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: "An error occurred while searching for Account data",
            detail: error.message
        })
    }
}

// Account Type Part
const createTypeAccount = async (req, res) => {
    try {
        const body = req.body
        const result = await createAccountType(body)
        res.status(200).json({
            status: "succcess",
            message: "Create Account Type Succes! Data Added Successfully",
            result
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: "Something Error when Add Account Type",
            details: error.message
        })
    }
}

const getTypeAccountControl = async (req, res) => {
    try {
        const typeAccounts = await getAccountType();
        res.status(200).json({
            status: "success",
            message: "All Account Type found! Data displayed successfully",
            typeAccounts
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: "An error occured while displayed account type",
            details: error.message
        })
    }
}

module.exports = {createAccountController,
    getAllAccountController,
    getAccountIdController,
    createTypeAccount,
    getTypeAccountControl
}