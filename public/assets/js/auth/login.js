window.onload = function(e) {
    var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    console.log('csrf', token);

    axios({
        method: 'post',
        url: '/login',
        data: {
            email: 'jrohlandt@gmail.com',
            password: 'paaasssswwword',
        },
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'CSRF-Token': token,
        }
    })
    .then(function(res) { console.log('axios res: ', res); window.location = '/app'})
    .catch(function(err) { console.log('err: ', err)});
};
console.log('hello')