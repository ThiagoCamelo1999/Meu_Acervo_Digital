console.log('Arquivo JavaScript carregado');

document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  console.log('Formulário enviado'); // Verifique se esta linha aparece no console
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Fazendo a requisição de login
  const response = await fetch('http://localhost:3000/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  console.log('Resposta do servidor:', data);  // Verifique a resposta do servidor

  // Mensagem de sucesso
  const successMessage = document.createElement('p');
  successMessage.textContent = 'Login realizado com sucesso!';
  successMessage.style.color = 'green';
  successMessage.style.marginTop = '20px';
  successMessage.style.textAlign = 'center';

  // Mensagem de erro
  const errorMessage = document.getElementById('error-message');
  
  // Condição para verificar a resposta do servidor
  if (response.ok) {
    // Caso o login seja bem-sucedido
    // Coloca a mensagem de sucesso logo abaixo do formulário
    const loginForm = document.getElementById('loginForm');
    loginForm.appendChild(successMessage);
    
    // Redireciona para a página principal após 2 segundos
    setTimeout(() => {
      window.location.href = 'livros.html';
    }, 2000); // Espera 2 segundos para redirecionar
  } else {
    // Caso o login falhe
    // Exibe a mensagem de erro
    errorMessage.textContent = data.error || 'Usuário ou senha inválidos';
    errorMessage.style.display = 'block';

    // Esconde a mensagem de erro após 3 segundos
    setTimeout(() => {
      errorMessage.style.display = 'none';
    }, 3000); // 3000 milissegundos = 3 segundos
  }
});
