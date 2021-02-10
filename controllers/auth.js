const Employee = require("../models/employee")
const jwt = require("jsonwebtoken") // to generate signed token
const expressJwt = require("express-jwt") // for authorization check

const {getAllEmployee} = require("./user")


exports.signup = (req, res) => {
    const employee = new Employee(req.body);
    employee.save((err, employee) => {
        if (err) {
            return res.status(400).json({
                err
            })
        }
        employee.hassed_password = undefined;
        employee.salt = undefined;
        employee.roll = undefined;

        res.json({
            employee: employee
        })
    })
}

exports.signin = (req, res) => {

    //find the user bases on email
    const {
        email,
        password
    } = req.body;
    Employee.findOne({
        email
    }, (err, employee) => {
        if (err || !employee) {
            return res.status(400).json({
                error: "User with that email does not exist"
            })
        }
        //if user is found make sure the email and password match
        //create authenticate method in User model
        if (!employee.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password do not match"
            });
        };

        //generate a signed token with employee id 
        const token = jwt.sign({
            _id: employee._id
        }, process.env.JWT_SECRET)
        //persist the token as 't' in cookie with expiry date
        res.cookie('t', token, {
            expire: new Date() + 9999 
        })
        //return user and token to frontend client
        const {
            _id,
            name,
            email,
            role
        } = employee;
        return res.json({
            token,
            user: {
                _id,
                email,
                name,
                role
            }
        });

    })

}

exports.signout = (req, res) => {
    res.clearCookie('t');
    res.status(200).json({
        msg: "signout successful"
    });
}


exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth",
});


exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id
 
    if (!user) {
        return res.status(403).json({
            error: "Access denied"
        });
    }

    next();

};
