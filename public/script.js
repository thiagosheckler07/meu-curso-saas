fetch('/api/cursos')
  .then(response => response.json())
  .then(cursos => {
    const container = document.getElementById('cursos');
    cursos.forEach(curso => {
      container.innerHTML += `
        <h2>${curso.titulo}</h2>
        <video controls width="500" src="${curso.video}"></video>
      `;
    });
  })
  .catch(error => {
    console.error('Erro ao carregar cursos:', error);
  });
