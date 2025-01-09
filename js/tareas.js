
document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.getElementById("formularioTareas");
    const lista = document.getElementById("lista");
    const inputTarea = document.getElementById("tarea");

    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas.forEach((tarea) => agregarTareaDOM(tarea.texto, tarea.completada));

    formulario.addEventListener("submit", (event) => {
        event.preventDefault();

        const tarea = inputTarea.value.trim();

        if (tarea === "") { alert("Por favor, escribe una tarea."); return; }

        const nuevaTarea = { texto: tarea, completada: false };
        tareas.push(nuevaTarea);
        guardarTareas();

        agregarTareaDOM(nuevaTarea.texto, nuevaTarea.completada);
        inputTarea.value = "";
    });

    function agregarTareaDOM(texto, completada) {

        const li = document.createElement("li");
        li.className = "flex justify-between items-center p-2 border-solid border-2 border-black m-1";

        const span = document.createElement("span");
        span.textContent = texto; if (completada) { span.classList.add("line-through") && li.classList.add("bg-lime-500")  }

        const botones = document.createElement("div");
        botones.className = "flex gap-2";

        const btnCompletar = document.createElement("button");
        btnCompletar.className = "fa-solid fa-check px-1 py-1 bg-green-500 text-white rounded hover:bg-green-700 ml-2";
        

        btnCompletar.addEventListener("click", () => {
            span.classList.toggle("line-through");
            li.classList.toggle("bg-lime-500");
            const index = obtenerIndiceTarea(texto);
            tareas[index].completada = !tareas[index].completada;
            guardarTareas();
        });

        const btnEliminar = document.createElement("button");
        btnEliminar.className = "fa-solid fa-trash px-1 py-1 bg-red-500 text-white rounded hover:bg-red-700";

        btnEliminar.addEventListener("click", () => {
            li.remove();
            tareas = tareas.filter((t) => t.texto !== texto);
            guardarTareas()
        });

        botones.appendChild(btnCompletar);
        botones.appendChild(btnEliminar);

        li.appendChild(span);
        li.appendChild(botones);
        lista.appendChild(li);
    }

    function guardarTareas() {
        localStorage.setItem("tareas", JSON.stringify(tareas));
    }

    function obtenerIndiceTarea(texto) {
        return tareas.findIndex((tarea) => tarea.texto === texto);
    }
});
