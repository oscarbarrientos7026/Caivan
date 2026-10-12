
        const modalDetalle =
            document.getElementById(
                "modal-detalle"
            );

        const detalleContenido =
            document.getElementById(
                "detalle-contenido"
            );

        const cerrarDetalle =
            document.getElementById(
                "cerrar-detalle"
            );


        // ==============================
        // CERRAR CON X
        // ==============================

        cerrarDetalle.addEventListener(
            "click",
            () => {

                modalDetalle.style.display =
                    "none";

                detalleContenido.innerHTML =
                    "";

            }
        );


        // ==============================
        // CERRAR HACIENDO CLIC AFUERA
        // ==============================

        modalDetalle.addEventListener(
            "click",
            (evento) => {

                if (
                    evento.target === modalDetalle
                ) {

                    modalDetalle.style.display =
                        "none";

                    detalleContenido.innerHTML =
                        "";

                }

            }
        );