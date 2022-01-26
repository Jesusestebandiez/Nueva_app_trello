document.getElementById('formTareas').addEventListener('Guardar', saveTareas);

function saveTareas(e) {
  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;
  console.log(description)

  let tarea = {
    title,
    description
  };

  if(localStorage.getItem('tareas') === null) {
    let tareas = [];
    tareas.push(tarea);
    localStorage.setItem('tareas', JSON.stringify(tareas));
  } else {
    let tareas = JSON.parse(localStorage.getItem('tareas'));
    tareas.push(tarea);
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }

  getTareas();
  document.getElementById('formTareas').reset();
  e.preventDefault();
}

function deleteTarea(title) {
  console.log(title)
  let tareas = JSON.parse(localStorage.getItem('tareas'));
  for(let i = 0; i < tareas.length; i++) {
    if(tareas[i].title == title) {
      tareas.splice(i, 1);
    }
  }
  
  localStorage.setItem('tareas', JSON.stringify(tareas));
  getTareas();
}

function getTareas() {
  let tareas = JSON.parse(localStorage.getItem('tareas'));
  let tareasView = document.getElementById('tareas');
  tareasView.innerHTML = '';
  for(let i = 0; i < tareas.length; i++) {
    let title = tareas[i].title;
    let description = tareas[i].description;

    tareasView.innerHTML += `<div class="card mb-3">
        <div class="card-body">
          <p>${title} - ${description}
          <a href="#" onclick="deleteTareas('${title}')" class="btn btn-danger ml-5">Delete</a>
          </p>
        </div>
      </div>`;
  }
  getTareas();  
}
