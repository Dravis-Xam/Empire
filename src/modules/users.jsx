import newUser from "./addUsers"

const details = {};

const users = [
    {
        name: "Guest",
        type: "guest",
        privileges: null,
        password: null,
    }
]

users.push(newUser(details));

export default users