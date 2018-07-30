window.onload = function(e) {
    var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    console.log('csrf', token);

    var form = document.getElementById('login-form');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

        axios({
            method: 'post',
            url: '/login',
            data: {
                email: email,
                password: password,
            },
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'CSRF-Token': token,
            }
        })
        .then(function(res) { console.log('axios res: ', res); window.location = '/app'})
        .catch(function(err) { console.log('err: ', err)});
    });
};
console.log('hello')