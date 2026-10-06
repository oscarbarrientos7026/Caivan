// Esperamos hasta que el navegador haya terminado
// de construir el HTML.
document.addEventListener('DOMContentLoaded', function() {


    // ==========================================================
    // OBTENER ELEMENTOS DEL HTML
    // ==========================================================

    // Ahora que el HTML ya fue construido,
    // podemos buscar las categorías.
    const categories = document.querySelectorAll('.category');


    // ==========================================================
    // EVENTOS DE LAS CATEGORÍAS
    // ==========================================================

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

            const selectedCategory =
                this.dataset.category;


            // ==================================================
            // ACTUALIZAR CATEGORÍA ACTIVA
            // ==================================================

            // Primero quitamos "active" de todas las categorías.
            categories.forEach(item => {
                item.classList.remove('active');
            });

            this.classList.add('active');


            // ==================================================
            // OBTENER LAS CARDS
            // ==================================================

            // Buscamos las cards justo cuando se hace click.
            // Así también encontramos las que creó Firebase.
            const cards =
                document.querySelectorAll('.card');


            // ==================================================
            // FILTRAR LAS CARDS
            // ==================================================

            cards.forEach(card => {

                const cardCategory =
                    card.dataset.category;


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