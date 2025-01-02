// Utility to generate a random hex color

let c1 = 16, c2 = 0, c3 = 0;
function getRandomColor() {

    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 3; i++) {
        color += letters[Math.floor(Math.random() * 16)];
        color += letters[Math.floor(Math.random() * 16)];

    }



    return color;
}

// Utility to convert hex color to RGB
function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b };
}

// Convert RGB to Hex color code
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase();
}

// Convert RGB to HSV
function rgbToHsv(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const h = max === min ? 0 : max === r ? (g - b) / (max - min) : max === g ? (b - r) / (max - min) + 2 : (r - g) / (max - min) + 4;
    const s = max === 0 ? 0 : (max - min) / max;
    const v = max;
    return { h: h * 60, s, v };
}

// Convert HSV to RGB
function hsvToRgb(h, s, v) {
    h /= 360;
    let r, g, b;
    if (s === 0) { r = g = b = v; } else {
        const i = Math.floor(h * 6);
        const f = h * 6 - i;
        const p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0: r = v; g = t; b = p; break;
            case 1: r = q; g = v; b = p; break;
            case 2: r = p; g = v; b = t; break;
            case 3: r = p; g = q; b = v; break;
            case 4: r = t; g = p; b = v; break;
            case 5: r = v; g = p; b = q; break;
        }
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}


// Function to convert RGB to HSL
function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: Math.round(h * 360), s, l };
}

// Function to convert HSL to RGB
function hslToRgb(h, s, l) {
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h / 360 + 1 / 3);
        g = hue2rgb(p, q, h / 360);
        b = hue2rgb(p, q, h / 360 - 1 / 3);
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}


// Function to generate analogous colors
function generateAnalogousColors(hex) {
    const rgb = hexToRgb(hex);
    const shift = 50; // Degree shift for color adjustment

    // Convert RGB to HSL
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    // Generate four analogous colors
    const colors = [];
    for (let i = 0; i <= 3; i++) {
        const newH = (hsl.h + i * shift) % 360; // Wrap around
        const newRgb = hslToRgb(newH, hsl.s, hsl.l);
        colors.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    }

    return colors;
}


// Function to get complementary color
function getComplementaryColor(hex) {
    const { r, g, b } = hexToRgb(hex);
    return rgbToHex(255 - r, 255 - g, 255 - b);
}

function getColorAtAngle(baseColor, angle) {
    const rgb = hexToRgb(baseColor);
    const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
    hsv.h = (hsv.h + angle) % 360;  // Rotate the hue by the specified angle
    const rgbNew = hsvToRgb(hsv.h, hsv.s, hsv.v);
    return rgbToHex(rgbNew.r, rgbNew.g, rgbNew.b);
}




// Function to generate a color pallet
let cnt = 0;


function createColorPallet(n, indicattor) {

    const colorBox = document.createElement('div');
    const clrBox = document.createElement('div');
    clrBox.classList.add('clr3')
    colorBox.appendChild(clrBox);
    colorBox.classList.add('colorset');
    colorBox.classList.add(`set${cnt + 51}`);
    document.querySelector(`.ms-clr-set-d${n}${indicattor}`).appendChild(colorBox);


    const baseColor = getRandomColor();
    const colors = [baseColor];

    // Generate the complementary and triadic colors

    // if (cnt % 4 == 0 && n == 3) {
    //   let  colorses = generateAnalogousColors(baseColor)
    //     for (let i = 1; i < n; i++) {

    //         colors.push(getColorAtAngle(colorses[i], i * (360 / (n))));

    //     }
    // }
    // else {


    for (let i = 1; i < n; i++) {

        colors.push(getColorAtAngle(baseColor, i * (360 / (n))));

    }
    // }

    cnt++;
    let c = 1;


    colors.forEach(clr => {
        const colorPart = document.createElement('div');
        colorPart.classList.add('clr');
        colorPart.classList.add(`s${50 + cnt}c${c}`);
        colorPart.style.backgroundColor = clr;

        clrBox.appendChild(colorPart);


        c++;
        if (c === n) {
            c = 1;
        }

        hexcodevis(colorPart);

    });

    let newBox = document.createElement('div');
    colorBox.appendChild(newBox);
    newBox.classList.add('ms-discript');



    let number = Math.floor(Math.random() * 100);
    if (number < 1) {
        n = Math.floor(Math.random() * 16) + ' days ago';
    } else {
        n = Math.floor(number / 30) + 1 + ' months ago';

    }
    newBox.innerHTML = `<div class="ms-like">
                       <div class="ms-heart">♥</div>
                       <div class="ms-number">${Math.floor(Math.random() * 2500)}</div>
                       </div>
                     <div class="ms-date">${n}</div>`;

    setTimeout(() => {
        newBox.querySelector('.ms-like').addEventListener('click', () => {
            likeEventListner(newBox.querySelector('.ms-like'));

        })


    }, 100);


}


function createInitialColorBoxes(count, n) {
    for (let i = 0; i < count; i++) {
        createColorPallet(n, 'c'); // Initial pallets
    }
}




// Create initial set of color boxes when page loads
createInitialColorBoxes(300, 2);
createInitialColorBoxes(300, 3);
createInitialColorBoxes(300, 4);


let n = 3;
let indicattor = '';

// document.querySelector('.ms-main-d-ch2').addEventListener('scroll', () => {

//     if (document.querySelector('.ms-main-d-ch2').scrollTop >= document.querySelector('.ms-clr-set-p').offsetHeight
//         - 600) {
//         let condition = document.querySelectorAll('.ms-clr-set-active .colorset').length < 800;
//         if (condition) {
//             for (let i = 0; i < 60; i++) {
//                 // createColorPallet(parseInt(active.attributes.value.nodeValue));
//                 n = parseInt(document.querySelector('.ms-clr-set-active').attributes.value.nodeValue);

//                 indicattor = document.querySelector('.ms-clr-set-active').attributes.value.nodeValue.replace(n, ''),

//                     createColorPallet(n, indicattor);
//             }
//         }


//         // for (let i = 0; i < 5; i++) {
//         //     generateAnalogousColors(getRandomColor());
//         // }
//     }
// });







function hexcodevis(clr) {
    let rgb = clr.style.backgroundColor.toUpperCase().match(/([0-9]+)/g);
    let span = document.createElement('span');
    let discrDiv = document.createElement('div');
    discrDiv.classList.add("ms-discript")
    // if ( !clr.parentElement.querySelector('.ms-discript')) {
    // clr.parentElement.appendChild(discrDiv);

    // }
    span.classList.add('hex-code')
    clr.appendChild(span)
    span.style.padding = '4px';
    span.style.color = 'transparent';
    span.style.background = 'transparent';
    span.textContent = rgbToHex(rgb[0], rgb[1], rgb[2]);

    clr.addEventListener('mouseover', () => {

        clr.children[0].style.color = '#fff';
        clr.children[0].style.background = '#333';
    });

    clr.addEventListener('mouseout', () => {
        clr.children[0].style.color = 'transparent';
        clr.children[0].style.background = 'transparent';
    });

    clr.addEventListener('click', async () => {
        const Content = clr.children[0].textContent;

        try {
            // Use Clipboard API to copy the content
            await navigator.clipboard.writeText(Content);
            clr.children[0].textContent = 'copied';
            setTimeout(() => {
                clr.children[0].textContent = Content;

            }, 1000)
            // alert('color HEXcode copied !');
        } catch (error) {
            console.error('Error copying HEXcode:', error);
            alert('Failed to copy HEXcode. Please try again...');
        }
    })
}


let allAs = document.querySelector(".ms-color-categories").children;
let allAsheader = document.querySelectorAll(".ms-header a");
let active = document.querySelector(`.ms-clr-set-d3`);
active.classList.add('ms-clr-set-active');

let As_activeBtn = allAsheader[2];
As_activeBtn.classList.add('As_activeBtn');

for (let i = 0; i < allAs.length; i++) {

    allAs[i].addEventListener('click', () => {

        if (window.getComputedStyle(document.querySelector('.ms-3-line-p')).display !== 'none') {
            document.querySelector('.ms-main-d-ch1').style.display = 'none';

        }

        // document.querySelector('.colorBox').innerHTML = "";

        n = allAs[i].attributes.value.nodeValue;

        if (active) {
            active.classList.remove('ms-clr-set-active');
            active = document.querySelector(`.ms-clr-set-d${n}`);
            active.classList.add('ms-clr-set-active');
            // for (let j = 0; j < allAs.length; j++) {
            //     allAs[j].style.color = 'initial';
            // }

            if (As_activeBtn) {
                As_activeBtn.classList.remove('As_activeBtn');
                As_activeBtn= allAs[i];
                As_activeBtn.classList.add('As_activeBtn');
            }

        }
        cnt = -50;

        if (i > 3) {


            for (let i = 0; i < 40; i++) {
                createColorPallet(parseInt(n), 'c');


            }
        }




    })
}



for (let i = 0; i < allAsheader.length; i++) {

    allAsheader[i].addEventListener('click', () => {


        n = allAsheader[i].attributes.value.nodeValue;

        if (active) {
            active.classList.remove('ms-clr-set-active');
            active = document.querySelector(`.ms-clr-set-d${n}`);
            active.classList.add('ms-clr-set-active');
            
            if (As_activeBtn) {
                As_activeBtn.classList.remove('As_activeBtn');
                As_activeBtn = allAsheader[i];
                As_activeBtn.classList.add('As_activeBtn');
            }

        }
        // cnt = -50;

        // if (i > 3) {


        //     for (let i = 0; i < 40; i++) {
        //         createColorPallet(parseInt(n), 'c');


        //     }
        // }




    })
}


// for pre written clr3 50 pakcket

document.querySelectorAll('iframe').forEach(iframe => {
    setTimeout(() => {

        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document

        // console.log(ifr)
        let clr100 = iframeDoc.querySelectorAll('.clr');

        console.log(iframeDoc)

        for (let i = 0; i < clr100.length; i++) {
            copyFun(clr100[i]);
            // hexcodevis(clr100[i]);

        };
    }, 10);

});

// let clr100 = document.querySelectorAll('.clr');

// for (let i = 0; i < clr100.length - 2700; i++) {
// hexcodevis(clr100[i]);
// };





function copyFun(clr) {
    let rgb = clr.style.backgroundColor.toUpperCase().match(/([0-9]+)/g);
    let span = clr.querySelector('span');
    span.style.padding = '4px';
    span.style.color = 'transparent';
    span.style.borderRadius = '4px';
    span.style.padding = '5px 7px';
    span.style.background = 'transparent';
    span.textContent = rgbToHex(rgb[0], rgb[1], rgb[2]);

    clr.addEventListener('mouseover', () => {

        clr.children[0].style.color = '#fff';
        clr.children[0].style.background = '#333';
    });

    clr.addEventListener('mouseout', () => {
        clr.children[0].style.color = 'transparent';
        clr.children[0].style.background = 'transparent';
    });

    clr.addEventListener('click', async () => {
        const Content = clr.children[0].textContent;

        try {
            // Use Clipboard API to copy the content
            await navigator.clipboard.writeText(Content);
            clr.children[0].textContent = 'copied';
            setTimeout(() => {
                clr.children[0].textContent = Content;

            }, 1000)
            // alert('color HEXcode copied !');
        } catch (error) {
            console.error('Error copying HEXcode:', error);
            alert('Failed to copy HEXcode. Please try again...');
        }
    })
}

