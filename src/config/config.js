if (process.env.NODE_ENV) {
    process.env.URL = 'https://blogserver-jordan.herokuapp.com/';
} else {
    process.env.URL = 'http://localhost:3000/';
}
