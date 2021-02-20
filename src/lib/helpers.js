const bcrypt = require('bcryptjs');
const helpers = {};
helpers.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10); //10 es la cantidad de veces que se ejecuta el metodo de encriptar, entre mas veces mas seguro pero mas lento
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

helpers.matchPassword = async(password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch (error) {
        console.log(e);
    }
}

module.exports = helpers;