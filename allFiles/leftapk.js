let msleftsidebar = document.querySelector('.ms-main-d-ch1');
let ms3bar = document.querySelector('.ms-3-line-p');

ms3bar.addEventListener('click', () => {
    if (window.getComputedStyle(msleftsidebar).display === 'none') {
        msleftsidebar.style.display = 'initial';
    } else {
        msleftsidebar.style.display = 'none';

    }
});


setInterval(() => {
    if (window.getComputedStyle(ms3bar).display === 'none') {
        msleftsidebar.style.display = 'initial';
    }

    if (window.getComputedStyle(ms3bar).display === 'none' && parseInt(window.getComputedStyle(document.querySelector('body')).width) < 400) {
        ms3bar.style.display = 'flex';
        msleftsidebar.style.display = 'none';
    } else if (parseInt(window.getComputedStyle(document.querySelector('body')).width) > 400) {
        ms3bar.style.display = 'none';

    }
}, 0);

