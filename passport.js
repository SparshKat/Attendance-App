// var passport = require('passport')
const localStrategy = require('passport-local').Strategy
var Students = require('./models/student');
let check = false;
let realUser = null;

module.exports = (passport) => {
    passport.serializeUser(function (user, done) {
        console.log("passport is working");
        // console.log("Serialize");
        console.log(user);
        return done(null, user.email);
    })

    passport.deserializeUser(function (user, done) {
        console.log("DeSerialize");
        // console.log(user);
        // return done(null, user)
        // console.log("DeSerialize");
        Students.findOne(
            {
                email: user
            }
        ).then((user) => {
            console.log(user);
            return done(null, user);
        })
            .catch(err => {
                console.log("error in finding in deserialize")
                return done(err, null)
            });
    })

    passport.use(new localStrategy(
        function (email, password, done) {
            console.log("yaha aayega : " + email + " " + password);
            // console.log(Students.findAll({ where : {email: email} }));
            Students.findAll({ where: { email: email } })
                .then(users => {
                    users.forEach(user => {
                        if (user.role === "operator") {
                            check = true;
                            realUser = user;
                        }
                    })
                    if (check === true) {
                        return done(null, {
                            email: realUser.email,
                            password: realUser.password,
                            role: realUser.role
                        });
                    } else return done(null, false);
                })
                .catch(err => done(err, null));
        }
    ));
}
