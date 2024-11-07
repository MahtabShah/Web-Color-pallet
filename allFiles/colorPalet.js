// Utility to generate a random hex color
let c1 = 16, c2 = 0, c3 = 0;
function getRandomColor() {

    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 3; i++) {
    color += letters[ Math.floor(Math.random() * 16)];
    color += letters[ Math.floor(Math.random() * 16)];
    
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

function createColorPallet(n) {
    const colorBox = document.createElement('div');
    colorBox.classList.add('color-box');
    document.querySelector('.colorBox').appendChild(colorBox);


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


    colors.forEach(clr => {
        const colorPart = document.createElement('div');
        colorPart.classList.add('colorPart');
        colorPart.style.backgroundColor = clr;

        colorPart.addEventListener('mouseover', () => {
            colorPart.textContent = clr;
        })

        colorPart.addEventListener('mouseout', () => {
            colorPart.textContent = '';
        })

        colorBox.appendChild(colorPart);


    });

    let newBox = document.createElement('div');
    colorBox.appendChild(newBox);
    newBox.classList.add('newDiv');

    let is = document.createElement('i');
    is.classList.add('fa-heart');
    is.classList.add('fa-solid');
    newBox.appendChild(is);
    is.addEventListener('click', () => {
        is.style.color = 'red';
        let content = document.createElement('i');
        content.innerText = '+1';
        content.style.color = '#555';
        newBox.appendChild(content);

    })


}


function createInitialColorBoxes(count) {
    for (let i = 0; i < count; i++) {
        createColorPallet(1); // Initial pallets
    }
}




// Create initial set of color boxes when page loads
createInitialColorBoxes(50);

let allAs = document.querySelectorAll(".color-categories")[0].children;
let active = allAs[0];


for (let i = 0; i < 4; i++) {

    allAs[i].addEventListener('click', () => {


        document.querySelector('.colorBox').innerHTML = "";

        let n = parseInt(allAs[i].attributes.value.nodeValue);

        if (active) {
            active.classList.remove('active');
            active = allAs[i];
            active.classList.add('active');
        }


        for (let i = 0; i < 20; i++) {
            createColorPallet(n);
        }

    })
}


window.addEventListener('scroll', () => {

    const rightContainer = document.querySelector('.right');
    if ((window.innerHeight + window.scrollY) >= rightContainer.offsetHeight - 10) {

        for (let i = 0; i < 15; i++) {
            createColorPallet(parseInt(active.attributes.value.nodeValue));
        }

        for (let i = 0; i < 5; i++) {
            generateAnalogousColors(getRandomColor());
        }
    }
});