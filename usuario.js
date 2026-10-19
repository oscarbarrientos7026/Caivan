

        // ==========================================
        // 1. IMPORTAMOS FIREBASE
        // ==========================================

        import {
            initializeApp
        }
        from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";


        import {
            getAuth,
            onAuthStateChanged,
            signOut
        }
        from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";


        // Firestore
        import {
            getFirestore,
            collection,
            addDoc,
            serverTimestamp,
            query,
            where,
            getDocs,
            deleteDoc,
            doc,
            updateDoc,
            getDoc,
            setDoc,
        }
        from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


        // ==========================================
        // 2. CONFIGURACIÓN DE FIREBASE
        // ==========================================

        const firebaseConfig = {

              apiKey: "AIzaSyA9nKwRTGJliMO0Fk3rXiPk6rEAbQATiwA",
              authDomain: "mercado-caivan.firebaseapp.com",
              projectId: "mercado-caivan",
              storageBucket: "mercado-caivan.firebasestorage.app",
              messagingSenderId: "193052002924",
              appId: "1:193052002924:web:228d68afbd8601dd7e2649",
              measurementId: "G-WVWSJ9MD6Q"

        };


        // ==========================================
        // 3. INICIALIZAMOS FIREBASE
        // ==========================================

        const app = initializeApp(firebaseConfig);


        // ==========================================
        // 4. AUTENTICACIÓN
        // ==========================================

        const auth = getAuth(app);


        // ==========================================
        // 5. FIRESTORE
        // ==========================================

        const db = getFirestore(app);


        // ==========================================
        // 6. ELEMENTOS HTML
        // ==========================================

        const nombreUsuario =
            document.getElementById("nombre-usuario");

        const emailUsuario =
            document.getElementById("email-usuario");

        const perfilFormulario = document.getElementById( "perfil-formulario");

    perfilFormulario.addEventListener(
    "submit",
    async (event) => {
        event.preventDefault();

        const nombre =
            document.getElementById( "nombre" ).value.trim();


        const apellido =
            document.getElementById( "apellido").value.trim();


        const whatsapp =
            document.getElementById( "whatsapp" ).value.trim();


        const mensajePerfil =
            document.getElementById( "mensaje-perfil" );


        // Comprobar formato del teléfono
        if (!/^[0-9]{8}$/.test(whatsapp)) {
            mensajePerfil.textContent ="Ingresa un número móvil chileno de 8 dígitos.";
            return;
        }


        try {
            await setDoc(
                doc(db,
                    "usuarios",
                    usuarioActual.uid
                ),
                { nombre: nombre,
                    apellido: apellido,
                    whatsapp: whatsapp
                }
            );


            mensajePerfil.textContent =
                "Datos guardados correctamente.";

            mostrarPerfilCompleto({
                nombre: nombre,
                apellido: apellido,
                whatsapp: whatsapp
            });
        await cargarPublicaciones();

        } catch (error) {

            console.error( "Error al guardar perfil:",error);

            mensajePerfil.textContent ="No se pudieron guardar los datos.";
        }
    }
);

        const mensaje =
            document.getElementById("mensaje");

        const logout =
            document.getElementById("logout");

        // Icono que corresponde a cada categoría
                    const iconosCategoria = {
            
                hogar: "fa-chair",
            
                ropa: "fa-shirt",
            
                tecnologia: "fa-laptop",
            
                deportes: "fa-futbol",
            
                comida: "fa-utensils",
            
                tiendas: "fa-store",
            
                arriendos: "fa-house",
            
                reparaciones: "fa-wrench",
            
                transporte: "fa-car",
            
                mascotas: "fa-dog"
            };

// ==========================================
// 7. USUARIO ACTUAL
 // ==========================================

        let usuarioActual = null;
        let publicacionEditando = null;

                                                        // FUNCIONES

async function comprobarPerfil() {

    const referencia =
        doc(db,"usuarios", usuarioActual.uid );

    const resultado = await getDoc(referencia);


    // =================================
    // EL PERFIL EXISTE
    // =================================

    if (resultado.exists()) {

        mostrarPerfilCompleto( resultado.data());

        // Ahora sí puede utilizar
        // sus publicaciones
        await cargarPublicaciones();
        return;
    }


    // =================================
    // PERFIL NO EXISTE
    // =================================

    mostrarFormularioPerfil();
}
        
function mostrarFormularioPerfil() {
    document.getElementById("perfil-container").style.display = "block";
}

function mostrarPerfilCompleto(perfil) {

    // Ocultar formulario de completar perfil
    document.getElementById(
        "perfil-container"
    ).style.display = "none";


    // Mostrar datos del usuario
    document.getElementById(
        "datos-usuario"
    ).style.display = "block";


    // Mostrar nombre
    document.getElementById(
        "datos-nombre"
    ).textContent = perfil.nombre;


    // Mostrar apellido
    document.getElementById(
        "datos-apellido"
    ).textContent = perfil.apellido;


    // Mostrar WhatsApp
    document.getElementById(
        "datos-whatsapp"
    ).textContent = perfil.whatsapp;


    // Mostrar formulario de publicaciones
    document.getElementById(
        "form-publicacion"
    ).style.display = "block";
}
const botonEditarWhatsapp =
    document.getElementById(
        "boton-editar-whatsapp"
    );


const actualizarWhatsappContainer =
    document.getElementById(
        "actualizar-whatsapp-container"
    );


    botonEditarWhatsapp.addEventListener(
    "click",
    () => {

        actualizarWhatsappContainer.style.display =
            "block";

    }
);

const guardarWhatsapp =
    document.getElementById(
        "guardar-whatsapp"
    );


    guardarWhatsapp.addEventListener(
    "click",
    async () => {

        const nuevoWhatsapp =
            document.getElementById(
                "nuevo-whatsapp"
            ).value.trim();


        const mensajeWhatsapp =
            document.getElementById(
                "mensaje-whatsapp"
            );


        // Comprobar que sean exactamente 8 dígitos
        if (!/^[0-9]{8}$/.test(nuevoWhatsapp)) {

            mensajeWhatsapp.textContent =
                "Ingresa un número móvil chileno de 8 dígitos.";

            return;
        }


        try {

            await updateDoc(
                doc(
                    db,
                    "usuarios",
                    usuarioActual.uid
                ),
                {
                    whatsapp: nuevoWhatsapp
                }
            );


            // Actualizar el número mostrado
            document.getElementById(
                "datos-whatsapp"
            ).textContent =
                nuevoWhatsapp;


            mensajeWhatsapp.textContent =
                "Número actualizado correctamente.";


            // Limpiar campo
            document.getElementById(
                "nuevo-whatsapp"
            ).value = "";

            // Ocultar nuevamente el formulario
            actualizarWhatsappContainer.style.display =
            "none";
        
        } catch (error) {

            console.error(
                "Error al actualizar WhatsApp:",
                error
            );


            mensajeWhatsapp.textContent =
                "No se pudo actualizar el número.";
        }

    }
);

// ==========================================
// MOSTRAR MIS PUBLICACIONES
// ==========================================

async function cargarPublicaciones() {

    const contenedor =
        document.getElementById("mis-publicaciones");

    contenedor.innerHTML = "";


    // Buscar las publicaciones del usuario actual
    const consulta = query(
        collection(db, "publicaciones"),
        where(
            "propietario",
            "==",
            usuarioActual.uid
        )
    );


    // Ejecutar la consulta
    const resultados =
        await getDocs(consulta);


    // Si no hay publicaciones
    if (resultados.empty) {

        contenedor.innerHTML =
            "<p>Aún no tienes publicaciones.</p>";

        return;
    }


    // Recorrer las publicaciones encontradas
    resultados.forEach((documento) => {

        const publicacion =
            documento.data();

        console.log(
            "Imagen de esta publicación:",
            publicacion.imagen
        );
        const idPublicacion =
            documento.id;

        // ==============================
        // TARJETA
        // ==============================

        const tarjeta =
            document.createElement("article");

        tarjeta.classList.add("card");

        tarjeta.addEventListener("click", (evento) => {

            // Si hacemos clic en un botón,
            // no queremos expandir la tarjeta.
            if (evento.target.closest("button")) {
                return;
            }

            tarjeta.classList.toggle("expanded");

        });
        tarjeta.dataset.category = publicacion.categoria;


        // ==============================
        // IMAGEN / ICONO
        // ==============================

        const cardImage =
            document.createElement("div");

        cardImage.classList.add("card-image");

        const offerTag =
            document.createElement("span");

        offerTag.classList.add("offer-tag");

        offerTag.textContent =
            "";

        const favorite =
            document.createElement("button");

        favorite.classList.add("favorite");

        favorite.innerHTML =
            '<i class="fa-regular fa-heart"></i>';

        const icono =
            document.createElement("i");

        icono.classList.add("fa-solid");

        icono.classList.add(
            iconosCategoria[publicacion.categoria]
            || "fa-tag"
        );

        cardImage.appendChild(offerTag);
        cardImage.appendChild(favorite);

        // ==============================
        // MOSTRAR IMAGEN O ICONO
        // ==============================


        if (
            publicacion.productos &&
            publicacion.productos.length > 0 &&
            publicacion.productos[0].imagen
        ) {

            const foto =
                document.createElement("img");

            foto.src =
                publicacion.productos[0].imagen;

            foto.alt =
                publicacion.titulo;

            cardImage.appendChild(foto);

        } else {

            cardImage.appendChild(icono);

        }


        // ==============================
        // CONTENIDO
        // ==============================

        const cardContent =
            document.createElement("div");

        cardContent.classList.add(
            "card-content"
        );


        const categoria =
            document.createElement("div");

        categoria.classList.add(
            "card-category"
        );

        categoria.textContent =
            publicacion.categoria;


        const titulo =
            document.createElement("div");

        titulo.classList.add(
            "card-title"
        );

        titulo.textContent =
            publicacion.titulo;


        const descripcion =
            document.createElement("div");

        descripcion.classList.add(
            "card-description"
        );

        descripcion.textContent =
            publicacion.descripcion;


        // ==============================
        // FOOTER
        // ==============================

        const cardFooter =
            document.createElement("div");
        const botonEditar =
            document.createElement("button");
            botonEditar.textContent ="Editar";
            botonEditar.classList.add("edit-button");
            botonEditar.addEventListener("click",() => {
                    editarPublicacion(
                    idPublicacion,
                    publicacion
                    );
                }
            );
        const botonEliminar =
            document.createElement("button");
        
            botonEliminar.textContent =
            "Eliminar";
        
            botonEliminar.classList.add(
            "delete-button"
            );
            botonEliminar.addEventListener(
            "click",
            async () => {
        
                const confirmar =
                    confirm(
                        "¿Quieres eliminar esta publicación?"
                    );
        
                if (!confirmar) {
                    return;
                }
        
                await eliminarPublicacion(
                    idPublicacion
                );
            }
        );
        cardFooter.classList.add(
            "card-footer"
        );


        const precio =
            document.createElement("div");

        precio.classList.add("price");


        const precioFormateado =
            new Intl.NumberFormat(
                "es-CL"
            ).format(
                publicacion.precio
            );
                
        const campoPrecio =
        document.getElementById("precio");

        const precioPorItem =
            document.getElementById("precio-por-item");

        const precioNegociable =
            document.getElementById("precio-negociable");


        precioPorItem.addEventListener(
            "change",
            function() {

                if (this.checked) {

                    campoPrecio.value = "";

                    campoPrecio.disabled = true;

                    precioNegociable.checked = false;

                    precioNegociable.disabled = true;

                } else {

                    campoPrecio.disabled = false;

                    precioNegociable.disabled = false;

                }

            }
        );

        precio.textContent =
            "$" + precioFormateado;


        const vendedor =
            document.createElement("div");

        vendedor.classList.add(
            "seller"
        );

        vendedor.textContent =
            usuarioActual.displayName;


        // ==============================
        // CONSTRUIR FOOTER
        // ==============================

        cardFooter.appendChild(precio);
        cardFooter.appendChild(vendedor);
        cardFooter.appendChild(botonEditar);
        cardFooter.appendChild(botonEliminar);

        // ==============================
        // CONSTRUIR CARD-CONTENT
        // ==============================

        cardContent.appendChild(categoria);
        cardContent.appendChild(titulo);
        cardContent.appendChild(descripcion);
        cardContent.appendChild(cardFooter);


        // ==============================
        // CONSTRUIR TARJETA
        // ==============================

        tarjeta.appendChild(cardImage);
        tarjeta.appendChild(cardContent);


        // Añadir tarjeta a la página
        contenedor.appendChild(tarjeta);

    });
}
         // boton agregar items
const contenedorItems =
    document.getElementById("contenedor-items");

const botonAgregarItem =
    document.getElementById("agregar-item");

botonAgregarItem.addEventListener(
    "click",
    function() {

        const nuevoItem =
            document.createElement("div");

        nuevoItem.classList.add(
            "item-publicacion"
        );

        nuevoItem.innerHTML = `
            <input
                type="file"
                class="imagen-item"
                accept="image/*"
            >
            `;
            /*
            <input
                type="text"
                class="descripcion-item"
                placeholder="nombre ítem"
            >

            <input
                type="text"
                class="precio-item"
                placeholder="Precio del ítem"
            >
            */
        
        document.addEventListener(
            "input",
            function(event) {

                if (
                    event.target.classList.contains(
                        "precio-item"
                    )
                ) {

                    let valor =
                        event.target.value;

                    valor =
                        valor.replace(/\D/g, "");

                    valor =
                        valor.replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            "."
                        );

                    event.target.value =
                        valor;

                }

            }
        );
        contenedorItems.appendChild(
            nuevoItem
        );

    }
);

async function eliminarPublicacion(idPublicacion) {

    try {

        // Localizamos el documento en Firestore
        const referencia =
            doc(
                db,
                "publicaciones",
                idPublicacion
            );


        // Lo eliminamos
        await deleteDoc(referencia);


        // Volvemos a cargar las publicaciones
        // para actualizar la pantalla
        await cargarPublicaciones();


    } catch (error) {

        console.error(
            "Error al eliminar:",
            error
        );

        alert(
            "No se pudo eliminar la publicación."
        );
    }
}
    const campoPrecio = document.getElementById("precio");

    campoPrecio.addEventListener("input", function () {

        let valor = this.value;

        // Dejar solamente números
        valor = valor.replace(/\D/g, "");

        // Agregar puntos cada tres cifras
        valor = valor.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            "."
        );

        this.value = valor;
    });
function editarPublicacion(idPublicacion, publicacion) {

    // Guardamos qué documento estamos editando
    publicacionEditando =
        idPublicacion;


    // Colocamos los datos de la publicación
    // dentro del formulario

    document.getElementById("titulo").value =
        publicacion.titulo;

    document.getElementById("categoria").value =
        publicacion.categoria;

    document.getElementById("precio").value =
        publicacion.precio;

    document.getElementById("descripcion").value =
        publicacion.descripcion;


    // Cambiamos el texto del botón
    const boton =
        document.querySelector(
            '#form-publicacion button[type="submit"]'
        );

    if (boton) {
        boton.textContent =
            "Guardar cambios";
    }


    // Mensaje para indicar que estamos editando
    const mensaje =
        document.getElementById("mensaje");

    mensaje.textContent =
        "Editando publicación...";


    // Llevamos al usuario hacia el formulario
    document
        .getElementById("titulo")
        .scrollIntoView({
            behavior: "smooth"
        });
}
        // ==========================================
        // 8. COMPROBAR AUTENTICACIÓN
        // ==========================================

   onAuthStateChanged(
    auth, async (user) => {

        // =================================
        // NO HAY USUARIO AUTENTICADO
        // =================================

        if (!user) {
          window.location.href =  "login.html";

            return;
        }


        // =================================
        // USUARIO AUTENTICADO
        // =================================

        usuarioActual = user;

        // Mostrar información de Google
        document.getElementById( "nombre-usuario" ).textContent =user.displayName || "Usuario";

        document.getElementById(  "email-usuario" ).textContent =user.email;


        // =================================
        // COMPROBAR PERFIL
        // =================================
        await comprobarPerfil();
    }
);

const formulario =document.getElementById("form-publicacion");
console.log(
    "Formulario encontrado:",
    formulario
);
        // ==========================================
        // 9. CREAR PUBLICACIÓN
        // ==========================================
function blobADataURL(blob) {

    return new Promise((resolve, reject) => {

        const lector =
            new FileReader();

        lector.onloadend = () => {

            resolve(
                lector.result
            );

        };

        lector.onerror = () => {

            reject(
                new Error(
                    "No se pudo convertir la imagen."
                )
            );

        };

        lector.readAsDataURL(blob);

    });
}
function reducirImagen(archivo) {

    return new Promise((resolve, reject) => {

        const imagen = new Image();

        const lector = new FileReader();


        lector.onload = (evento) => {

            imagen.onload = () => {

                console.log(
                    "Resolución original:",
                    imagen.width,
                    "x",
                    imagen.height
                );


                // =================================
                // CALCULAR NUEVAS DIMENSIONES
                // =================================

                const anchoOriginal =
                    imagen.width;

                const altoOriginal =
                    imagen.height;

                let nuevoAncho =
                    anchoOriginal;

                let nuevoAlto =
                    altoOriginal;


                // Si el lado mayor supera 720 px
                if (
                    anchoOriginal > 720 ||
                    altoOriginal > 720
                ) {

                    if (
                        anchoOriginal >= altoOriginal
                    ) {

                        // Imagen horizontal
                        nuevoAncho = 720;

                        nuevoAlto =
                            Math.round(
                                altoOriginal *
                                (720 / anchoOriginal)
                            );

                    } else {

                        // Imagen vertical
                        nuevoAlto = 720;

                        nuevoAncho =
                            Math.round(
                                anchoOriginal *
                                (720 / altoOriginal)
                            );

                    }

                }


                console.log(
                    "Nueva resolución:",
                    nuevoAncho,
                    "x",
                    nuevoAlto
                );


                // =================================
                // CREAR CANVAS
                // =================================

                const canvas =
                    document.createElement("canvas");


                canvas.width =
                    nuevoAncho;

                canvas.height =
                    nuevoAlto;


                const contexto =
                    canvas.getContext("2d");


                // Dibujar imagen redimensionada
                contexto.drawImage(
                    imagen,
                    0,
                    0,
                    nuevoAncho,
                    nuevoAlto
                );


                // =================================
                // CONVERTIR A JPEG
                // =================================

                canvas.toBlob(
                    (blob) => {

                        if (!blob) {

                            reject(
                                new Error(
                                    "No se pudo procesar la imagen."
                                )
                            );

                            return;
                        }


                        resolve(blob);

                    },
                    "image/jpeg",
                    0.75
                );

            };


            imagen.onerror = () => {

                reject(
                    new Error(
                        "No se pudo leer la imagen."
                    )
                );

            };


            imagen.src =
                evento.target.result;

        };


        lector.onerror = () => {

            reject(
                new Error(
                    "No se pudo leer el archivo."
                )
            );

        };


        lector.readAsDataURL(archivo);

    });
}

formulario.addEventListener(
    "submit",
    async (event) => {

        console.log(
            "SE EJECUTÓ EL SUBMIT"
        );

        event.preventDefault();


        // ==============================
        // OBTENER DATOS DEL FORMULARIO
        // ==============================

        const titulo =
            document.getElementById(
                "titulo"
            ).value;

        const categoria =
            document.getElementById(
                "categoria"
            ).value;

        const precioTexto =
            document.getElementById(
                "precio"
            ).value;

        const precioPorItem =
            document.getElementById(
                "precio-por-item"
            ).checked;

        const precioNegociable =
            document.getElementById(
                "precio-negociable"
            ).checked;

        let precio = null;

        if (!precioPorItem) {

            precio =
                Number(
                    precioTexto.replace(/\./g, "")
                );

        }

        const descripcion =
            document.getElementById(
                "descripcion"
            ).value;


        // ==============================
        // OBTENER IMÁGENES Y DESCRIPCIONES
        // ==============================

        const items =
            document.querySelectorAll(
                ".item-publicacion"
            );

        const productos = [];


        for (const item of items) {

            const archivo =
                item.querySelector(
                    ".imagen-item"
                ).files[0];
/*
            const descripcionItem =
                item.querySelector(
                    ".descripcion-item"
                ).value;

            const precioItemTexto =
                item.querySelector(
                    ".precio-item"
                ).value;

            const precioItem =
                precioItemTexto
                    ? Number(
                        precioItemTexto.replace(/\./g, "")
                    )
                    : null;
            // Si este bloque no tiene imagen,
            // simplemente lo ignoramos.
*/
            if (!archivo) {
                continue;
            }


            // Comprimir imagen

            const imagenReducida =
                await reducirImagen(
                    archivo
                );


            // Convertir a Base64

            const imagenBase64 =
                await blobADataURL(
                    imagenReducida
                );


            console.log(
                "Tamaño de imagen:",
                Math.round(
                    imagenBase64.length / 1024
                ),
                "KB"
            );


            // Guardar imagen + descripción

            productos.push({

                imagen:
                    imagenBase64,
                /*
                descripcion:
                    descripcionItem,

                precio:
                    precioItem,
                */
            });

        }


        // ==============================
        // COMPROBAR USUARIO
        // ==============================

        if (!usuarioActual) {

            mensaje.textContent =
                "Debes iniciar sesión.";

            return;
        }


        try {

            // =================================
            // CASO 1: ESTAMOS EDITANDO
            // =================================

            if (publicacionEditando) {

                const referencia =
                    doc(
                        db,
                        "publicaciones",
                        publicacionEditando
                    );


                await updateDoc(
                    referencia,
                    {
                        titulo: titulo,
                        categoria: categoria,
                        precio: precio,
                        precioPorItem: precioPorItem,
                        precioNegociable: precioNegociable,
                        descripcion: descripcion,
                        productos: productos,
                    }
                );


                mensaje.textContent =
                    "¡Publicación actualizada correctamente!";


                publicacionEditando = null;


                formulario.reset();


                const boton =
                    formulario.querySelector(
                        'button[type="submit"]'
                    );

                boton.textContent =
                    "Publicar";


                await cargarPublicaciones();

                return;
            }


            // =================================
            // CASO 2: NUEVA PUBLICACIÓN
            // =================================

            const referenciaUsuario =
                doc(
                    db,
                    "usuarios",
                    usuarioActual.uid
                );


            const resultadoUsuario =
                await getDoc(
                    referenciaUsuario
                );


            const perfil =
                resultadoUsuario.data();


            const docRef =
                await addDoc(
                    collection(
                        db,
                        "publicaciones"
                    ),
                    {
                        titulo:
                            titulo,

                        categoria:
                            categoria,

                        precio:
                            precio,

                        precioPorItem:
                            precioPorItem,

                        precioNegociable:
                            precioNegociable,

                        descripcion:
                            descripcion,

                        propietario:
                            usuarioActual.uid,

                        nombreVendedor:
                            perfil.nombre +
                            " " +
                            perfil.apellido,

                        whatsapp:
                            perfil.whatsapp,

                        productos:
                            productos,

                        fecha:
                            serverTimestamp(),

                        autorizada:
                            false
                    }
                );


            console.log(
                "Publicación creada:",
                docRef.id
            );


            mensaje.textContent =
                "¡Publicación creada correctamente!... Considera un tiempo de revisión, lo hacemos para evitar la publicación de contenido censurable";


            formulario.reset();


            await cargarPublicaciones();

        }

        catch (error) {

            console.error(
                "Error al guardar:",
                error
            );

            mensaje.textContent =
                "No se pudo guardar la publicación.";
        }

    }
);

        // ==========================================
        // 10. CERRAR SESIÓN
        // ==========================================

        logout.addEventListener(
            "click",
            async () => {

                try {

                    await signOut(auth);

                    window.location.href =
                        "index.html";

                }

                catch (error) {

                    console.error(
                        "Error al cerrar sesión:",
                        error
                    );

                }

            }
        );

