let msleftsidebar = document.querySelector('.ms-main-d-ch1');
let ms3bar = document.querySelector('.ms-3-line-p');

ms3bar.addEventListener('click', () => {
    if (window.getComputedStyle(msleftsidebar).display === 'none') {
        msleftsidebar.style.display = 'initial';
        msleftsidebar.style.transform = 'translateX(0%)';
        msleftsidebar.style.transitionDuration = '0.3s';


    } else {
        document.querySelector('.ms-main-d-ch1').style.display = 'none';

    }
});


// msleftsidebar.addEventListener('click', () => {
//     if (window.getComputedStyle(msleftsidebar).display === 'fixed') {
//         msleftsidebar.style.display = 'none';
//         msleftsidebar.style.transform = 'translateX(0%)';
//         msleftsidebar.style.transitionDuration = '0.3s';


//     }
// });

setInterval(() => {
    if (window.getComputedStyle(ms3bar).display === 'none') {
        msleftsidebar.style.display = 'initial';
    }

    if (window.getComputedStyle(ms3bar).display === 'none' && parseInt(window.getComputedStyle(document.querySelector('body')).width) <= 400) {
        ms3bar.style.display = 'flex';
        msleftsidebar.style.display = 'none';
    } else if (parseInt(window.getComputedStyle(document.querySelector('body')).width) > 400) {
        ms3bar.style.display = 'none';

    }

}, 0);

{
const upArrow = document.querySelector('.ms-up-ar');
const upArrow1 = document.querySelector('.ms-up-ar1');
const upArrow2 = document.querySelector('.ms-up-ar2');
const mainDiv = document.querySelector('.ms-main-d-ch2');

upArrow.addEventListener('mouseover', () => {
    upArrow1.style.borderBottom = `10px solid rgb(72, 255, 0)`;
    upArrow2.style.border = `2px solid rgb(72, 255, 0)`;
});

upArrow.addEventListener('mouseout', () => {
    upArrow1.style.borderBottom = `10px solid rgb(79, 188, 34)`;
    upArrow2.style.border = `2px solid rgb(79, 188, 34)`;
});

upArrow.addEventListener('click', () => {
    mainDiv.scrollTop = 0;
    mainDiv.style.transitionDuration = '1s';

    const iframe = document.querySelector('.ms-clr-set-active > iframe');
    (iframe.contentDocument || iframe.contentWindow.document).scrollingElement.scrollTop = 0;
});
}
