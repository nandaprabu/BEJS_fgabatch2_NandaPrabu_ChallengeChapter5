const prisma = require('../../config/prisma')
const bycrypt = require('bcrypt')

const createUser = async (body) => {

    const hashPassword = bycrypt.hashSync(body.password, 10)
    // console.log(hashPassword)

    const user = await prisma.customer.create({
        data: {
            name: body.name,
            phone: body.phone,
            email: body.email,
            password: hashPassword
        }
    })
    // console.log(user)

    const profiles = await prisma.profiles.create({
        data: {
            customer_id: user.id,
            identity_type: body.identity_type,
            identity_number: body.identity_number,
            address: body.address
        }
    })

    return {user, profiles}
}

const getAllUser = async () => {
    const usersData = await prisma.customer.findMany({
        include: {
            profiles: true
        }
    })

    return usersData
}

const getUserbyId = async (userId) => {
    const user = await prisma.customer.findUnique({
        where: {
            id: userId
        },
        include: {
            profiles: true
        }
    })
    // console.log('isi dari userId adalah', userId)
    return user
}

module.exports = { createUser, getAllUser, getUserbyId}