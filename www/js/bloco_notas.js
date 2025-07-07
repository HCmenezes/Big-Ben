// Recuperar o ID do localStorage
var id = parseInt(localStorage.getItem('bloco'));

//Pegar o titulo do local Storage
var sessoes = JSON.parse(localStorage.getItem('sessoes'));
var item = sessoes.find( sessao => sessao.id_sessao === id);

$(".title").text(item.titulo);

// Inserção na página
var notasHTML;
var db;

document.addEventListener('deviceready', function () {
    db = window.sqlitePlugin.openDatabase({ name: 'big_ben.db', location: 'default' });
    // Iniciar a transação
    db.transaction(function (tx) {
        // Buscar dados da tabela
        tx.executeSql('SELECT * FROM notas WHERE id_sessao = ?',[`${item.id_sessao}`],
            function (tx, resultSet) {
                let notas = [];
                if (resultSet.rows.length === 0) {
                    // Substituir o conteúdo
                    $(".block").empty();
                    notasHTML = `
                        <i id="None_Books" class="mdi mdi-note-alert"></i>
                        <h1 id="None_Books_text">Você ainda não adicionou uma anotação</h1>
                    `;
                    $(".block").append(notasHTML);
                } else {
                
                // Iterar pelos resultados
                for (let i = 0; i < resultSet.rows.length; i++) {
                    notas.push(resultSet.rows.item(i));
                }

                // Armazenar no LocalStorage
                localStorage.setItem('notas', JSON.stringify(notas));
                console.log('Dados armazenados no LocalStorage:', notas);
                
                // Substituir o conteúdo
                $(".block").empty();
                notas.forEach(nota =>{
                    if(nota.modificacao == null){
                        nota.modificacao = "";
                    }
                    notasHTML = `
                        <div data-id="${nota.id_nota}" class="buttom-session">
                            <h3>${nota.titulo}<br></h3>
                            <h4>Criação: ${nota.data_inicio}<br></h4>
                            <h4>Ultima modificação: ${nota.modificacao}</h4>
                        </div>
                    `;
                    $(".block").append(notasHTML);
                });

                $(".buttom-session").on('click', function(){
                    var id = $(this).attr('data-id');
                    localStorage.setItem('nota', id);
                    app.views.main.router.navigate("/nota/")
                })
            }
            },
            function (tx, error) {
                console.error('Erro ao buscar dados:', error.message);
            }
        );
    });
});

function inserirNot(){
    db = window.sqlitePlugin.openDatabase({ name: 'big_ben.db', location: 'default' });

    $("#Options-Buttons-sessions").empty();
    $("#Options-Buttons-sessions").append(`
            <a href="">
                <div onclick="criar()" class="Create-Button">
                    <i class="mdi mdi-note-plus"></i>
                    Nova
                </div>
            </a>
            <a href="">
                <div onclick="editSelectNot()" class="Edit-Button">
                    <i class="mdi mdi-note-edit"></i>
                    Editar
                </div>
            </a>
            <a href="">
                <div onclick="deleteSelectNot()" class="Delete-Button">
                    <i class="mdi mdi-note-minus"></i>
                    Apagar
                </div>
            </a>
        `);

    $(".block").empty();
    
    db.transaction(function (tx) {
        // Buscar dados da tabela
        tx.executeSql('SELECT * FROM notas WHERE id_sessao = ?',[`${item.id_sessao}`],
            function (tx, resultSet) {
                let notas = [];
                if (resultSet.rows.length === 0) {
                    // Substituir o conteúdo
                    $(".block").empty();
                    notasHTML = `
                        <i id="None_Books" class="mdi mdi-note-alert"></i>
                        <h1 id="None_Books_text">Você ainda não adicionou uma anotação</h1>
                    `;
                    $(".block").append(notasHTML);
                } else {
                
                // Iterar pelos resultados
                for (let i = 0; i < resultSet.rows.length; i++) {
                    notas.push(resultSet.rows.item(i));
                }

                // Armazenar no LocalStorage
                localStorage.setItem('notas', JSON.stringify(notas));
                console.log('Dados armazenados no LocalStorage:', notas);
                
                // Substituir o conteúdo
                $(".block").empty();
                notas.forEach(nota =>{
                    if(nota.modificacao == null){
                        nota.modificacao = "";
                    }
                    notasHTML = `
                        <div data-id="${nota.id_nota}" class="buttom-session">
                            <h3>${nota.titulo}<br></h3>
                            <h4>Criação: ${nota.data_inicio}<br></h4>
                            <h4>Ultima modificação: ${nota.modificacao}</h4>
                        </div>
                    `;
                    $(".block").append(notasHTML);
                });

                $(".buttom-session").on('click', function(){
                    var id = $(this).attr('data-id');
                    localStorage.setItem('nota', id);
                    app.views.main.router.navigate("/nota/")
                })
            }
            },
            function (tx, error) {
                console.error('Erro ao buscar dados:', error.message);
            }
        );
    }
)};

//CRUD
var titulo;
var dataAtual = new Date();

function criar(){
    app.dialog.prompt('Escreva o título da anotação', (titulo) => {
        if(titulo == ""){
            app.dialog.alert("Digite um título válido");
        } else{
                    db = window.sqlitePlugin.openDatabase({ name: 'big_ben.db', location: 'default' });
                    data_criacao = dataAtual.toLocaleDateString();
                    db.transaction(function (tx) {
                        // Inserir entidades
                        tx.executeSql(
                         'INSERT INTO notas (id_sessao, titulo, data_inicio) VALUES (?, ?, ?)',
                         [`${item.id_sessao}`, `${titulo}`, `${data_criacao}`],
                        function (tx, res) {
                            inserirNot();
                        },
                         function (tx, error) {
                            console.error('Erro ao inserir entidade 1:', error.message);
                        }
                     )
                });
        }
      });
}

function editSelectNot(){
    $("#Options-Buttons-sessions").empty();
    $("#Options-Buttons-sessions").append(`
            <div onclick="inserirNot()" id="Cancel-Button" class="Edit-Button">
                <i class="mdi mdi-cancel"></i>
                Cancelar
            </div>
        `);
    
    let notasStorage = JSON.parse(localStorage.getItem('notas'));

    $(".block").empty();
    notasStorage.forEach(nota =>{
        if(nota.modificacao == null){
            nota.modificacao = "";
        }
        notasHTML = `
            <div onclick="editNot(${nota.id_nota}, '${nota.titulo}')" id="edit-buttom-session" class="buttom-session">
                <h3>${nota.titulo}<br></h3>
                <h4>Criação: ${nota.data_inicio}<br></h4>
                <h4>Ultima modificação: ${nota.modificacao}</h4>
            </div>
        `;
        $(".block").append(notasHTML);
        $(".buttom-session").hide();
    });
        $(".buttom-session").fadeIn();
}

function editNot(notId, not_tit){
    db = window.sqlitePlugin.openDatabase({ name: 'big_ben.db', location: 'default' });
    var itemId = notId;
    var itemTit = not_tit;
        app.dialog.prompt('Escreva o novo título da Anotação', (titulo) => {
            if(titulo == ""){
                app.dialog.alert("Digite um título válido");
            } else{
                db.transaction(function(tx) {
                    tx.executeSql('UPDATE notas SET titulo = ? WHERE id_nota = ?', [titulo, itemId], 
                        function(tx, res) {
                            inserirNot();
                        },
                        function(tx, error) {
                            app.dialog.alert('Erro ao deletar a Matéria: ', error.message);
                    });
                });
            }
        });
}

function deleteSelectNot(){
    $("#Options-Buttons-sessions").empty();
    $("#Options-Buttons-sessions").append(`
            <div onclick="inserirNot()" id="Cancel-Button" class="Delete-Button">
                <i class="mdi mdi-cancel"></i>
                Cancelar
            </div>
        `);
    
    let notasStorage = JSON.parse(localStorage.getItem('notas'));

    $(".block").empty();
    notasStorage.forEach(nota =>{
        if(nota.modificacao == null){
            nota.modificacao = "";
        }
        notasHTML = `
            <div onclick="deleteNot(${nota.id_nota}, '${nota.titulo}')" id="delete-buttom-session" class="buttom-session">
                <h3>${nota.titulo}<br></h3>
                <h4>Criação: ${nota.data_inicio}<br></h4>
                <h4>Ultima modificação: ${nota.modificacao}</h4>
            </div>
        `;
        $(".block").append(notasHTML);
        $(".buttom-session").hide();
    });
        $(".buttom-session").fadeIn();
}

function deleteNot(notId, not_tit){
    db = window.sqlitePlugin.openDatabase({ name: 'big_ben.db', location: 'default' });
    var itemId = notId;
    var itemTit = not_tit;
        app.dialog.confirm(`Deseja Realmente apagar a Anotação ${itemTit}?`, () => {
            db.transaction(function(tx) {
                tx.executeSql('DELETE FROM notas WHERE id_nota = ?', [itemId], 
                    function(tx, res) {
                        app.dialog.alert('Nota apagada!');
                        inserirNot();
                    },
                    function (tx, error) {
                        console.error('Erro ao buscar dados:', error.message);
                });
            });
            });
};