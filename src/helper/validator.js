const Validator = require('validatorjs')

const validation = {}
let errors
const validator = (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages)
    validation.passes(() => callback(null, true))
    validation.fails(() => callback(validation.errors, false))
}

validation.main = (data, validationRule) => {
    validator(data, validationRule, {}, (err, stat) => {
        errors = err
    });
}

validation.addNode = (data) => {
    const validationRule = {
        "nama": "required|string",
        "topic": "required|string",
    }
    validation.main(data, validationRule)

    return errors
}

validation.editNode = (data) => {
    const validationRule = {
        "id": "required|integer",
        "nama": "required|string",
        "topic": "required|string",
    }
    validation.main(data, validationRule)

    return errors

}

validation.deleteNode = (data) => {
    const validationRule = {
        "id": "required|integer",
    }
    validation.main(data, validationRule)

    return errors
}

validation.addHistory = (data) => {
    const validationRule = {
        "data": "required|string",
        "node_id": "required|integer",
    }
    validation.main(data, validationRule)

    return errors

}

validation.editHistory = (data) => {
    const validationRule = {
        "id": "required|integer",
        "data": "required|string",
        "node_id": "required|integer",
    }
    validation.main(data, validationRule)

    return errors
}

validation.deleteHistory = (data) => {
    const validationRule = {
        "id": "required|integer",
    }
    validation.main(data, validationRule)

    return errors
}

validation.Login = (data) => {
    const validationRule = {
        "username": "required|string",
        "password": "required|string",
    }
    validation.main(data, validationRule)

    return errors
}

validation.addUser = (data) => {
    const validationRule = {
        "name": "required|string",
        "username": "required|string",
        "password": "required|string",
        "role": "required|string",
    }
    validation.main(data, validationRule)

    return errors
}

validation.editUser = (data) => {
    const validationRule = {
        "id": "required|integer",
        "name": "required|string",
        "username": "required|string",
        "password": "required|string",
        "role": "required|string",
    }
    validation.main(data, validationRule)

    return errors
}

validation.deleteUser = (data) => {
    const validationRule = {
        "id": "required|integer",
    }
    validation.main(data, validationRule)

    return errors
}

module.exports = validation