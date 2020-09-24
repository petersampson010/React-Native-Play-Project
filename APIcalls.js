export const fetchAllUsers = () => {
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(users => {
        console.log(users);
        return users;
    })
    .catch(e => {console.warn(e);})
    .done();
}