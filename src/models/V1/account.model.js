const prisma = require('../../config/prisma')

const createAccount = async (body) => {
    const account = await prisma.account.create({
        data: {
            customer_id: body.customer_id,
            account_type: body.account_type,
            bank_name: body.bank_name,
            balance: body.balance
        }
    })

    return account
}

const getAllAccount = async () => {
    const accountsData =  await prisma.account.findMany()
    
    return accountsData
}

const getAccountId = async (accountId) => {
    const accountData = await prisma.account.findUnique({
        where: {
            id: accountId
        }
    })
    // console.log("Jumlah uang user yaitu: Rp.", accountData.balance, "-,")
    

    return accountData
}

// Account Type table
const createAccountType = async (body) => {
    const AccountType = await prisma.account_type.create({
        data: {
            name: body.name,
            description: body.description
        }
    })

    return AccountType
}

const getAccountType = async () => {
    const AccountType = await prisma.account_type.findMany()

    return AccountType
}

module.exports = {createAccount, getAllAccount, getAccountId, createAccountType, getAccountType}