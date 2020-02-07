// check if user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.json({
            status: 210,
            message: 'Not Logged In'
        })
    }
}

// module exports
module.exports = isLoggedIn;