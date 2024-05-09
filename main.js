document.addEventListener("DOMContentLoaded", function() {
    const productos = document.querySelectorAll('.producto');
    const carrito = document.getElementById('lista-carrito');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    let total = 0;

    // Agregar evento click a cada botón de agregar al carrito
    productos.forEach(producto => {
        producto.querySelector('.agregar-carrito').addEventListener('click', agregarProducto);
    });

    // Agregar producto al carrito
    function agregarProducto(evento) {
        const producto = evento.target.parentElement;
        const nombre = producto.querySelector('h2').textContent;
        const precio = parseFloat(producto.querySelector('.precio').textContent.slice(1));
        
        const nuevoProducto = document.createElement('li');
        nuevoProducto.innerHTML = `${nombre} - $${precio} <button class="eliminar-producto">Eliminar</button>`;
        carrito.appendChild(nuevoProducto);

        total += precio;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`; // Aquí se agrega el símbolo de dólar ($)

        // Agregar evento click al botón de eliminar producto
        nuevoProducto.querySelector('.eliminar-producto').addEventListener('click', eliminarProducto);

        // Mostrar SweetAlert
        Swal.fire({
            title: "¡Bien hecho!",
            text: "Has agregado el producto al carrito",
            icon: "success"
        });

        // Desaparecer SweetAlert después de un tiempo
        setTimeout(() => {
            swal.close();
        }, 2000);
    }

    // Eliminar producto del carrito
    function eliminarProducto(evento) {
        const productoAEliminar = evento.target.parentElement;
        const nombreProductoAEliminar = productoAEliminar.textContent.split('-')[0].trim();
        const precioProductoAEliminar = parseFloat(productoAEliminar.textContent.split('-')[1].slice(2));
        
        // Preguntar al usuario si realmente desea eliminar el producto
        if (confirm(`¿Estás seguro de que deseas eliminar "${nombreProductoAEliminar}" del carrito?`)) {
            productoAEliminar.remove();

            total -= precioProductoAEliminar;
            document.getElementById('total').textContent = `$${total.toFixed(2)}`; // Aquí se agrega el símbolo de dólar ($)
        }
    }

    // Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        while (carrito.firstChild) {
            carrito.removeChild(carrito.firstChild);
        }
        total = 0;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`; // Aquí se agrega el símbolo de dólar ($)
    });
});

