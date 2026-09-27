

    // Esperamos hasta que el navegador haya terminado
    // de construir el HTML.
    document.addEventListener('DOMContentLoaded', function() {


        // ==========================================================
        // OBTENER ELEMENTOS DEL HTML
        // ==========================================================

        // Ahora que el HTML ya fue construido,
        // podemos buscar las categorías.
        const categories = document.querySelectorAll('.category');

        // Y también podemos buscar las cards.
        const cards = document.querySelectorAll('.card');


        // ==========================================================
        // EVENTOS DE LAS CATEGORÍAS
        // ==========================================================

        // Recorremos todas las categorías.
        //
        // Por ejemplo:
        //
        // Todo
        // Hogar
        // Ropa
        // Tecnología
        // Deportes
        // ...
        //
        categories.forEach(category => {


            // A cada categoría le asignamos un "escuchador"
            // que detectará cuando el usuario haga click.
            category.addEventListener('click', function(event) {


                // Como nuestras categorías son <a href="#">
                // evitamos que el navegador siga el enlace.
                event.preventDefault();


                // ==================================================
                // OBTENER CATEGORÍA SELECCIONADA
                // ==================================================

                // "this" representa la categoría sobre la que
                // el usuario acaba de hacer click.
                //
                // Por ejemplo, si hizo click en:
                //
                // <a data-category="tecnologia">
                //
                // esto nos devuelve:
                //
                // "tecnologia"
                //
                const selectedCategory = this.dataset.category;


                // ==================================================
                // ACTUALIZAR CATEGORÍA ACTIVA
                // ==================================================

                // Primero quitamos "active" de todas las categorías.
                categories.forEach(item => {
                    item.classList.remove('active');
                });


                                this.classList.add('active');


                // ==================================================
                // FILTRAR LAS CARDS
                // ==================================================

                // Recorremos todas las tarjetas de productos.
                cards.forEach(card => {



                    const cardCategory = card.dataset.category;


                    // ==================================================
                    // COMPARAR
                    // ==================================================

                    
                    if (
                        selectedCategory === 'todo' ||
                        cardCategory === selectedCategory
                    ) {

                        card.style.display = '';

                    } else {

                        // Ocultar la tarjeta.
                        card.style.display = 'none';

                    }

                });

            });

        });

    });


