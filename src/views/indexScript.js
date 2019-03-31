const {ipcRenderer} = require('electron');
const products = document.querySelector('#products');

ipcRenderer.on('product:new', (event, newProduct) => {
    const newProductTemplate =
        `
    <div class="col-xs-4 p-2">
        <div class="card text-center">
            <div class="card-header">
                <h5>${newProduct.name}</h5>
            </div>
            
            <div class="card-body">
                <p>${newProduct.description}</p>
                <hr/>
                ${newProduct.price}
            </div>
            
            <div class="card-footer">
                <button class="btn btn-danger btn-sm">
                    DELETE
                </button>
            </div>
        </div>
    </div>
    `;
    products.innerHTML += newProductTemplate;
    const btns = document.querySelectorAll('.btn.btn-danger');
    btns.forEach( btn => {
        btn.addEventListener('click', event => {
            // witch button did you clicked
            event.target.parentElement.parentElement.parentElement.remove();
        });
    });
});

ipcRenderer.on('product:deleteAll', event => {
    products.innerHTML = '';
});
