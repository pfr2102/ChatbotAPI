document.addEventListener('DOMContentLoaded', function() {
  var chatIcon = document.getElementById('chat-icon');
  var chatContainer = document.getElementById('chat-container');
  const divChat = document.getElementById('chat-espacio');
  const pregunta = document.getElementById('texto');
  const fechaChat = new Date();
  const hora = fechaChat.getHours();
  const minutos = fechaChat.getMinutes();

  p = pregunta.value;

  chatIcon.addEventListener('click', () => {
    chatContainer.style.display = chatContainer.style.display === 'none' ? 'block' : 'none';
  });

  function preguntar() {
    p = pregunta.value;
    pregunta.value = '';
    divChat.innerHTML += `
      <div class="d-flex flex-row justify-content-start">
      <img src="img/ava2.png"
        alt="avatar 1" style="width: 45px; height: 100%;">
      <div>
        <p class="small msg" style="background-color: #f5f6f7;">${p}</p>
        <p class="small ms-3 mb-3 rounded-3 text-muted">${hora}:${minutos}</p>
      </div>
      </div>
      `;
      // Desplazar el scroll hacia abajo
      divChat.scrollTop = divChat.scrollHeight;
      respuesta()
  }

  async function respuesta(){
    const q = {
      "question":p
    };
    await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 2 segundos (2000 milisegundos)
    console.log(q);
    fetch('http://127.0.0.1:5000/chatbot',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(q)
    })
      .then(response => response.json())
      .then(data => {
        divChat.innerHTML += `
        <div class="d-flex flex-row justify-content-end" style="justify-content: end;">
            <div>
            <p class="small bg-success msg" style="background-color: green;">${data['response']}</p>
              <p class="small text-muted d-flex" style="justify-content: end;">${hora}:${minutos}</p>
            </div>
            <img src="img/ava1.png"
              alt="avatar 1" style="width: 45px; height: 100%;">
        </div> 
        `;
        // Desplazar el scroll hacia abajo
        divChat.scrollTop = divChat.scrollHeight;
        console.log('Respuesta:', data['response']);
      })
      .catch(error => {
        console.error('Error al crear el registro:', error);
      });
  }

  pregunta.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      preguntar();
    }
  });
});