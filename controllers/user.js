const Employee = require("../models/employee")

exports.userById = (req, res, next, id) => {

    Employee.findById(id).exec((err, employee) => {
        if (err || !employee) {
            return res.status(400).json({
                error: "User not found"
            })
        }
        req.profile = employee;
        next();
    });


}

exports.getAllEmployee = (req, res, next, ) => {

    Employee.find()
        .then(
            (employees) => {
                req.profile = employees
                next()
            }
        )
        .catch(
            err => console.log(err)
        )

}