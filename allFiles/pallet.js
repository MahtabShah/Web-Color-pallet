





window.onload = function () {
    const canvas = document.getElementById('colorPalette');
    const ctx = canvas.getContext('2d');
    const selectedColor = document.getElementById('selectedColor');

    function drawPalette() {
        const width = canvas.width;
        const height = canvas.height;

        // Create a horizontal gradient (left to right)
        const gradientH = ctx.createLinearGradient(0, 0, width, 0);
        gradientH.addColorStop(0, 'red');
        gradientH.addColorStop(0.16, 'yellow');
        gradientH.addColorStop(0.33, 'green');
        gradientH.addColorStop(0.5, 'cyan');
        gradientH.addColorStop(0.66, 'blue');
        gradientH.addColorStop(0.83, 'magenta');
        gradientH.addColorStop(1, 'red');

        ctx.fillStyle = gradientH;
        ctx.fillRect(0, 0, width, height);

        // Create a vertical gradient (top to bottom)
        const gradientV = ctx.createLinearGradient(0, 0, 0, height);
        gradientV.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradientV.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
        gradientV.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
        gradientV.addColorStop(1, 'rgba(0, 0, 0, 1)');

        ctx.fillStyle = gradientV;
        ctx.fillRect(0, 0, width, height);
    }

    function pickColor(event) {
        const x = event.offsetX + 40;
        const y = event.offsetY;
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        const rgbColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
        const hexColor = rgbToHex(pixel[0], pixel[1], pixel[2]);

        selectedColor.textContent = hexColor;
        document.querySelector('.ms-header').style.backgroundColor = rgbColor;
        selectedColor.style.color = hexColor;
        generateTriadicColors(hexColor);
    }

    // Convert RGB to HEX
    function rgbToHex(r, g, b) {
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
    }

    function generateTriadicColors(hex) {
        const colorResult = document.getElementById('colorResult');
        colorResult.innerHTML = ''; // Clear previous colors

        const colors = getTriadicColors(hex);

        colors.forEach(color => {
            const colorDiv = document.createElement('div');
            colorDiv.style.backgroundColor = color;
            colorDiv.innerHTML = color;
            colorResult.appendChild(colorDiv);
        });
    }

    function getTriadicColors(hex) {
        const baseColor = parseInt(hex.slice(1), 16);
        const shift1 = (baseColor + 0x550000) % 0xFFFFFF;
        const shift2 = (baseColor + 0x005500) % 0xFFFFFF;

        return [
            hex,
            `#${shift1.toString(16).padStart(6, '0')}`,
            `#${shift2.toString(16).padStart(6, '0')}`
        ];
    }





    drawPalette();


    canvas.addEventListener('mousemove', pickColor);
    let m = 2;

    canvas.addEventListener('click', (e) => {
        if (m % 2 === 0) {
            canvas.removeEventListener('mousemove', pickColor);

        } else {
            canvas.addEventListener('mousemove', pickColor);

        }

        pickColor(e);

        m++;

    })



};




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
cnt = 0;

function createColorPallet(n) {
    const colorBox = document.createElement('div');
    const clrBox = document.createElement('div');
    clrBox.classList.add(`clr${n}`)
    colorBox.appendChild(clrBox);
    colorBox.classList.add('colorset');
    colorBox.classList.add(`set${cnt + 51}`);
    document.querySelector(`.ms-clr-set-d${n}`).appendChild(colorBox);


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


        if (c === n + 1) {
            c = 1;
        }

        hexcodevis(colorPart);

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
