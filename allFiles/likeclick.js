
document.querySelectorAll('iframe').forEach(iframe => {
    setTimeout(() => {

        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document
        iframeDoc.querySelectorAll('.ms-like').forEach(el => {

            el.addEventListener('click', () => {
                likeEventListner(el);

            })


        })

    }, 10);

});


function likeEventListner(el) {
    let heart = el.querySelector('.ms-heart');
    let num = el.querySelector('.ms-number');
    if (!el.classList.contains('liked')) {
        el.classList.add('liked');
        num.innerHTML = parseInt(num.innerHTML) + 1;
        heart.style.color = 'red';
        let colorset = el.closest('.colorset').cloneNode(true);
        console.log(colorset);
        colorset.querySelector('.ms-like').addEventListener('click', () => {
            colorset.remove();

            if (document.querySelector('.ms-set-collection').children.length === 0) {
                document.querySelector('.ms-set-collection').innerHTML = `<div class="ms-no-collection-mgs">
            <div>Sorry you don't have any collection........!</div>
        </div>`;
            }
        });



        try {
            document.querySelector('.ms-set-collection').querySelector('.ms-no-collection-mgs').remove();
        } catch (error) {

        }
        document.querySelector('.ms-set-collection').appendChild(colorset);

    } else {
        el.classList.remove('liked');
        num.innerHTML = parseInt(num.innerHTML) - 1;
        heart.style.color = '#4b4747';

        let colorset = el.closest('.colorset').cloneNode(true);
        document.querySelector(`.ms-set-collection`).children.item(el).remove();
        if (document.querySelector('.ms-set-collection').children.length === 0) {
            document.querySelector('.ms-set-collection').innerHTML = `<div class="ms-no-collection-mgs">
                <div>Sorry you don't have any collection........!</div>
            </div>`;
        }
    




    }



}

// setInterval(() => {
//     document.querySelectorAll('.ms-set-collection .colorset').forEach(el => {
//         el.addEventListener('click', () => {
//             likeEventListner(el);

//         })
//     });
// }, 100);