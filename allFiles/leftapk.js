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


document.querySelector('.ms-up-ar').addEventListener('mouseover', () => {
    document.querySelector('.ms-up-ar1').style.borderBottom = `10px solid rgb(72, 255, 0)`;
    document.querySelector('.ms-up-ar2').style.border = `2px solid rgb(72, 255, 0)`;
})

document.querySelector('.ms-up-ar').addEventListener('mouseout', () => {
    document.querySelector('.ms-up-ar1').style.borderBottom = `10px solid rgb(79, 188, 34);`;
    document.querySelector('.ms-up-ar2').style.border = `2px solid rgb(79, 188, 34);`;

});

document.querySelector('.ms-up-ar').addEventListener('click', () => {
    document.querySelector('.ms-main-d-ch2').scrollTop = 0;
    const iframe = document.querySelector('.ms-clr-set-active > iframe')

    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.scrollingElement.scrollTop = 0;
    document.querySelector('.ms-main-d-ch2').style.transitionDuration = '1s';
});




// document.querySelector('.ms-main-d-ch2').addEventListener('scroll', () => {
//     const iframe = document.querySelector('.ms-clr-set-active > iframe')
//     const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

//     iframeDoc.scrollingElement.addEventListener('scroll', () => {
//         document.querySelector('.ms-main-d-ch2').scrollTop = '100';

//     });
// });
