// Recuperar o ID do localStorage
var id = parseInt(localStorage.getItem('cronometro'));

//Pegar o titulo do local Storage
var sessoes = JSON.parse(localStorage.getItem('sessoes'));
var item = sessoes.find( sessao => sessao.id_sessao === id);

$(".title").text(item.titulo);

// Inserção na página
var sessaoHTML;
var db;