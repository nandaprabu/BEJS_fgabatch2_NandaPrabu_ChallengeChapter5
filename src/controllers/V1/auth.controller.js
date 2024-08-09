const { createAdmin, authAdmin } = require('../../models/V1/auth.model')
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const HandlingcreateAdmin = async (req, res) => {
    try {
        const body = req.body;
        const result = await createAdmin(body);
        res.status(201).json({
            status: "Success",
            message: "Create Admin Succes! Data Added Successfully",
            result
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: "An error occurred while adding admin data",
            details: error.message
        })   
    }
}

const HandlingAuthAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authAdmin(email)

        if(!user){
            res.status(404).json({
                status: "fail",
                message: "Admin not found"
            })
        }

        const openPassword = bycrypt.compareSync(password, user.password)

        if(!openPassword){
            res.status(404).json({
                message: "email / password salah"
            })
        }

        const payload_token = {
            id: user.id,
            email: user.email,
            nama: user.nama
        }
    
        const token = jwt.sign(payload_token, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })

        res.status(201).json({
            token: token
        })
        
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: "An error occurred while login for admin data",
            details : error.message
        })
    }
}

const authenticate = (req, res) => {
    res.json({ message: 'Authenticated successfully, you have acces to transaction data!', user: req.user });
}

module.exports = { HandlingcreateAdmin, HandlingAuthAdmin, authenticate}