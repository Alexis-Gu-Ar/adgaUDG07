const { ipcRenderer } = require('electron');

const form = document.querySelector('form');
form.addEventListener('submit', e => {
    const nameProduct = document.querySelector('#name').value;
    const price = document.querySelector('#price').value;
    const descProduct = document.querySelector('#description').value;

    const newProduct = {
        name: nameProduct,
        price: price,
        description: descProduct
    };

    ipcRenderer.send('product:new', newProduct);


    e.preventDefault();
})
