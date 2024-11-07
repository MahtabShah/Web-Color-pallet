
window.onload = function () {
    const canvas = document.getElementById('colorPalette');
    const ctx = canvas.getContext('2d');
    const selectedColor = document.getElementById('selectedColor');

    // Draw the color palette
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

    // Get the color at the mouse position
    function pickColor(event) {
        const x = event.offsetX;
        const y = event.offsetY;
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        const rgbColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
        const hexColor = rgbToHex(pixel[0], pixel[1], pixel[2]);

        selectedColor.textContent = hexColor;
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
    // Event listener for mouse movement over the canvas
    canvas.addEventListener('mousemove', pickColor);

    drawPalette();

    
};
