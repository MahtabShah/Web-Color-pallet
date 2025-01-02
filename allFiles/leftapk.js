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


// let initialScroll = 0;
// let Scrollpermissions = false;

// document.querySelector('.ms-main-d-ch2').addEventListener('scroll', () => {


//     initialScroll = document.querySelector('.ms-main-d-ch2').scrollTop;
//     Scrollpermissions = true;


// });

//// Select parent and child
// const parent = document.querySelector('.ms-main-d-ch2');
// const iframe = document.querySelector('.ms-clr-set-active > iframe');

// // Get the iframe's document when it loads
// iframe.onload = () => {
//   const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

//   // Disable iframe scrolling initially
//   iframeDoc.body.style.overflow = 'hidden';

//   // Monitor parent scroll
//   parent.addEventListener('scroll', () => {
//     const parentMaxScroll = parent.scrollHeight - parent.clientHeight;

//     // If parent is fully scrolled
//     if (parent.scrollTop + 100 >= parentMaxScroll) {
//       // Enable iframe scrolling
//       iframeDoc.body.style.overflow = 'auto';
//     } else {
//       // Disable iframe scrolling
//       const style = document.createElement('style');
//       style.textContent = `
//         /* Transparent scrollbar */
//         ::-webkit-scrollbar {
//           width: 1px; /* Adjust width as needed */
//         }
//         ::-webkit-scrollbar-thumb {
//           background-color: rgb(15, 14, 14); /* Fully transparent */
//         }
//         ::-webkit-scrollbar-track {
//           background-color: rgba(222, 162, 241, 0.82); /* Fully transparent */
//         }
//       `;
//       iframeDoc.head.appendChild(style);
    
//       iframeDoc.body.style.overflow = 'hidden';
//     }
//   });
// };
