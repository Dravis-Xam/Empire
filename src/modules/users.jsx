import newUser from "./addUsers"

const users = [
    {
        name: "Guest",
        type: "guest",
        privileges: null,
        password: null,
    }
]

users.push(newUser);

export default users