// Recuperar o ID do localStorage
var id = parseInt(localStorage.getItem('nota'));

//Pegar o titulo do local Storage
var notas = JSON.parse(localStorage.getItem('notas'));
var item = notas.find( nota => nota.id_nota === id);

$(".title").text(item.titulo);

// Inserção na página
var editor = app.textEditor.create({
    el: '.text-editor',
    mode: 'toolbar',
    value: item.conteudo,
    buttons: [["bold", "italic", "underline", "strikeThrough"], ["orderedList", "unorderedList"]], // Botões disponíveis
    placeholder: 'Escreva suas notas aqui...',
 });

 $("#just-back").on('click', function(){
			db_init = window.sqlitePlugin.openDatabase({ name: 'big_ben.db', location: 'default' });
			nota_content = document.getElementById("editor-content").innerHTML;
			db.transaction(function (tx) {
				tx.executeSql('UPDATE notas SET conteudo = ?, modificacao = ? WHERE id_nota = ?', [`${nota_content}`,`${dataAtual.toLocaleDateString()}` , `${itemN.id_nota}`]);
			});

            app.views.main.router.navigate("/bloco_notas/");
})
