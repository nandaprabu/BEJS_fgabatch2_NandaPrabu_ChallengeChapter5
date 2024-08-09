const prisma = require('../../config/prisma')
const bycrypt = require('bcrypt')

const createAdmin = async (body) => {

    const hashPassword = bycrypt.hashSync(body.password, 10)

    const user = await prisma.admin.create({
        data: {
            nama: body.name,
            email: body.email,
            password: hashPassword
        }
    })

    return user
}

const authAdmin = async (email) => {

    const user = await prisma.admin.findUnique({
        where: {
            email: email
        }
    })
    console.log(user)

    return user
}

module.exports = { createAdmin, authAdmin }