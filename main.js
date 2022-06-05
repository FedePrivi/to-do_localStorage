const alert = document.querySelector('.alert');
const formulario = document.getElementById('formulario');
const pintarTodo = document.getElementById('pintarTodo');
const templateTodo = document.getElementById('templateTodo').content;
let todos = [];

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log('funciona formulario');

    const data = new FormData(formulario);

    const [todo] = [...data.values()]
    // console.log(todo);

    // console.log(!todo.trim()); //el casocontrario de todo.trim() devuelve true si el ususrio manda solo espacios en blanco
    alert.classList.add("d-none")
    if (!todo.trim()) {
        // console.log("error se trata de enviar un campo vacio");
        alert.classList.remove("d-none")
        return; //recordemos que el return hace q se salga de toda la funciond el addEventListener es decir no llega a llamarse a la funcion agregarTodo()
    }


    agregarTodo(todo) //el parametro todo es el string es decir el valor del input del formulario

    pintarTodos();
})

const agregarTodo = (todo) => {
    const objetoTodo = {
        nombre: todo, //aca es a donde va a parar el string del input del formulario
        id: `${Date.now()}`
    }
    todos.push(objetoTodo);
}

const pintarTodos = () => {

    localStorage.setItem('todos', JSON.stringify(todos));


    pintarTodo.textContent = "";

    const fragment = document.createDocumentFragment();

    todos.forEach(item => {
        const clone = templateTodo.cloneNode(true);
        clone.querySelector('p').textContent = item.nombre;
        clone.querySelector('.btn').dataset.id = item.id;  //puedo usar btn porq solo busca en el template no busca en todo el dumento html
        fragment.appendChild(clone);
    });

    pintarTodo.appendChild(fragment);

}

document.addEventListener("click", e => {

    // console.log(e.target.dataset);
    // console.log(e.target.dataset.id);
    console.log(e.target.matches('.btn-danger'));
    if (e.target.matches('.btn-danger')) {
        // console.log("se dio click en el boton eliminar");
        todos = todos.filter(item => item.id !== e.target.dataset.id)
        pintarTodos();
    }
})

document, addEventListener('DOMContentLoaded', (e) => {
    localStorage.getItem('todos')
    if (localStorage.getItem('todos')) {
        todos = JSON.parse(localStorage.getItem('todos'))
        pintarTodos();
    }
})