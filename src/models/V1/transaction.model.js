const prisma = require('../../config/prisma')

const createTransaction = async (body) => {
    const transaction = await prisma.transaction.create({
        data: {
            account_id: body.account_id,
            account_destination: body.account_destination,
            transaction_type: body.transaction_type,
            amount: body.amount,
            transaction_status: body.transaction_status
        }
    })
    
    const dataTransaction = await prisma.account.findUnique({
        where: {
            id: body.account_id
        }
    })

    if(body.transaction_type === "Transfer"){
        if(dataTransaction.balance > body.amount){
            await prisma.account.update({
                where: {
                    id: body.account_id
                },
                data: {
                    balance: {
                        decrement: Number(body.amount)
                    }
                }
            })
    
            await prisma.account.update({
                where: {
                    id: body.account_destination
                },
                data: {
                    balance: {
                        increment: Number(body.amount)
                    }
                }            
            })
        } else {
            throw new Error("Your Balance is not enough !")
        }

    } else if(body.transaction_type === "Withdraw"){
        if(dataTransaction.balance > body.amount){
            await prisma.account.update({
                where: {
                    id: body.account_id
                },
                data: {
                    balance: {
                        decrement: Number(body.amount)
                    }
                }
            })
        } else {
            throw new Error("")
        }
    } else {
        await prisma.account.update({
            where: {
                id: body.account_id
            },
            data: {
                balance: {
                    increment: Number(body.amount)
                }
            }
        })
    }

    return transaction
}

const getAllTransactions = async () => {
    const getTransactions = await prisma.transaction.findMany()

    return getTransactions
}

const getTransactionId = async (transactionId) => {
    const getTransaction = await prisma.transaction.findUnique({
        where: {
            id : transactionId
        }
    })

    return getTransaction
}

module.exports = {createTransaction, getAllTransactions, getTransactionId}