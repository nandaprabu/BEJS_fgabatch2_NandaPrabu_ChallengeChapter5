const {createTransaction,
    getAllTransactions, 
    getTransactionId } = require('../../models/V1/transaction.model')


const createTransactionControl = async (req, res) => {
    try {
        const body = req.body;
        const result = await createTransaction(body);
        res.status(200).json({
            status: "Success",
            message: "Create Transaction Succes! Data Added Successfully",
            result
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "An error occurred while adding transaction data",
            details: error.message
        })
    }
}

const getAllTransactionControl = async (req, res) => {
    try {
        const result = await getAllTransactions()

        if(result){
            res.status(200).json({
                status: "Success",
                message: "All Transaction found! Data displayed successfully",
                result
            })
        } else {
            res.status(404).json({
                status: "fail",
                message: "Data Transaction not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: "An error occured while displayed transaction data",
            details: error.message
        })
    }
}

const getTransactionIdControl = async (req, res) => {
    try {
        const { transactionId } = req.params
        const result = await getTransactionId(transactionId)

        if(result){
            res.status(200).json({
                status: "Success",
                message: "Detail Transaction Found! Data displayed successfully",
                result
            })
        } else {
            res.status(404).json({
                status: "fail",
                message: "Detail Transaction not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: "An error occurred while searching for transaciton data",
            details: error.message
        })
    }
}

module.exports = {createTransactionControl, getAllTransactionControl, getTransactionIdControl}