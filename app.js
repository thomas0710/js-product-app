// Crear la clase del producto
class Product 
{
    constructor (name, price, year)
    {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

// Crea la clase de la interfaz
class UI 
{
    addProduct(product)// Agraga el producto creato a la interfaz
    {
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product Name:</strong>${product.name}
                    <strong>Product Price:</strong>${product.price}
                    <strong>Product Year:</strong>${product.year}
                    <a href="#" class="btn btn-danger btn-sm" name="delete">Delete</a>
                </div>
            </div>
        `;
        productList.appendChild(element);
        this.resetForm();
    }

    deleteProduct(element) // Elimina el producto 
    {
        if(element.name === 'delete')
        {
            element.parentElement.parentElement.parentElement.remove();
            // Mejorara esta parte que creo que se puede hacer mejor...
        }
    }

    showMessage(message, cssClass) // Muestr amensaje segun la accion realizada
    {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        // Mostrar mensaje en la interfaz
        const container = document.getElementById('container');
        const app = document.getElementById('app');
        container.insertBefore(div, app);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000)
    }

    resetForm() // Limpia el formulario despues de crear el producto
    {
        document.getElementById('form-product').reset();
    }
}

// Eventos del DOM
const form = document.getElementById('form-product');
form.addEventListener('submit', (e) => {
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;

    // Validación que los campos no esten vacios
    if(name === '' || price === '' || year === '')
    {
        const ui = new UI();
        return ui.showMessage('Complete fileds please', 'danger');
    }

    const product = new Product(name, price, year);

    const ui = new UI();
    ui.addProduct(product);
    ui.showMessage('Product added successfully', 'success');

    e.preventDefault();
})

// Captura la lista y elimina el contendio seleccionado
const productList = document.getElementById('product-list');
productList.addEventListener('click', (e) => {
    const ui = new UI();
    ui.deleteProduct(e.target);
    ui.showMessage('Product deleted successfully', 'warning');

});