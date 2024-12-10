const emailValidatorRegex = /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/
const passwordValidatorRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const emailValidator = (email) => {
    return emailValidatorRegex.test(email)
}

const passwordValidator = (password) => {
    return passwordValidatorRegex.test(password);
};

export { emailValidator, passwordValidator }