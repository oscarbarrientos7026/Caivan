document.addEventListener('DOMContentLoaded', function() {

    const categories =
        document.querySelectorAll('.category');

    categories.forEach(category => {

        category.addEventListener('click', function(event) {

            event.preventDefault();

            const selectedCategory =
                this.dataset.category;

            categories.forEach(item => {
                item.classList.remove('active');
            });

            this.classList.add('active');


            // Buscar las cards en el momento del click
            const cards =
                document.querySelectorAll('.card');


            cards.forEach(card => {

                const cardCategory =
                    card.dataset.category;

                if (
                    selectedCategory === 'todo' ||
                    cardCategory === selectedCategory
                ) {

                    card.style.display = '';

                } else {

                    card.style.display = 'none';

                }

            });

        });

    });

});