const User = require('../model/userModel');
var CryptoJS = require("crypto-js");


//Add User
exports.addUser = async function (req, res) {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email_address,
            mobile: req.body.mobile,
            password: await CryptoJS.AES.encrypt(req.body.password, 'secret key 123').toString(),
            status: req.body.status
        });

        const userData = await User.findOne({email: req.body.email_address});
        if (userData) {
            res.status(200).send({success:false,msg:"This email is already exists"});

        } else {
            const user_data = await user.save();
            res.status(200).send({success:true,msg:"User added successfully!",data:user_data});
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}

//Get User
exports.getUser = async function (req, res) {
    try {
        let userData = await User.find({ email: req.body.email_address });
        // let userData = await User.find({ });  // all data find
        res.status(200).send({success:true,data:userData});

    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}

// Edit User
exports.editUser = async function (req, res) {
    try {

        let userId = req.params.id;
        let body = req.body;

        console.log(body.full_name);

        let editUser = await User.updateOne({ _id: userId }, {
            $set: {
                name: req.body.name,
                email: req.body.email_address,
                mobile: req.body.mobile,
                password: await CryptoJS.AES.encrypt(req.body.password, 'secret key 123').toString(),
                status: req.body.status
            }
        })

        if (editUser) {
            res.status(200).send({success:true,msg:"User updated successfully!"});
        } else {
            res.json({ error: 'Something wrong, user not updated!' })
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}

// Delete User
exports.deleteUser = async function (req, res) {
    try {
        let userId = req.params.id;

        let deleteUser = await User.deleteOne({ _id: userId })

        if (deleteUser) {
            res.status(200).send({success:true,msg:"User Deleted successfully!"});
        } else {
            res.json({ error: 'Something wrong, user not Deleted!' })
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}