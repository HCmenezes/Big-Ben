// Recuperar o ID do localStorage
var id = parseInt(localStorage.getItem('sessao'));

//Pegar o titulo do local Storage
var materias = JSON.parse(localStorage.getItem('materias'));
var item = materias.find( materia => materia.id_materia === id);

$(".title").text(item.titulo);

// Inserção na página
var sessaoHTML;
var db;
document.addEventListener('deviceready', function () {
    db = window.sqlitePlugin.openDatabase({ name: 'big_ben.db', location: 'default' });
    // Iniciar a transação
    db.transaction(function (tx) {
        // Buscar dados da tabela
        tx.executeSql('SELECT * FROM sessoes WHERE id_materia = ?',[`${item.id_materia}`],
            function (tx, resultSet) {
                let sessoes = [];
                if (resultSet.rows.length === 0) {
                    // Substituir o conteúdo
                    $(".block").empty();
                    sessaoHTML = `
                        <i id="None_Books" class="mdi mdi-timer-alert"></i>
                        <h1 id="None_Books_text">Você ainda não realizou sessões de estudo</h1>
                    `;
                    $(".block").append(sessaoHTML);
                } else {
                
                // Iterar pelos resultados
                for (let i = 0; i < resultSet.rows.length; i++) {
                    sessoes.push(resultSet.rows.item(i));
                }

                // Armazenar no LocalStorage
                localStorage.setItem('sessoes', JSON.stringify(sessoes));
                console.log('Dados armazenados no LocalStorage:', sessoes);
                
                // Substituir o conteúdo
                $(".block").empty();
                sessoes.forEach(sessao =>{
                    if(sessao.tempo_sessao == null){
                        sessao.tempo_sessao = "0";
                    }
                    sessaoHTML = `
                        <div data-id="${sessao.id_sessao}" class="buttom-session">
                            <h3>${sessao.titulo}<br></h3>
                            <h4>Início: ${sessao.data_inicio}<br></h4>
                            <h4>Tempo Total: ${sessao.tempo_sessao}</h4>
                        </div>
                    `;
                    $(".block").append(sessaoHTML);
                });

                $(".buttom-session").on('click', function(){
                    var id = $(this).attr('data-id');
                    localStorage.setItem('cronometro', id);
                    app.views.main.router.navigate("/cronometro/")
                })
            }
            },
            function (tx, error) {
                console.error('Erro ao buscar dados:', error.message);
            }
        );
    });
});

function inserirSes(){
    db = window.sqlitePlugin.openDatabase({ name: 'big_ben.db', location: 'default' });

    $("#Options-Buttons-sessions").empty();
    $("#Options-Buttons-sessions").append(`
            <a href="">
                <div onclick="criar()" class="Create-Button">
                    <i class="mdi mdi-timer-plus"></i>
                    Nova
                </div>
            </a>
            <a href="">
                <div onclick="editSelectSes()" class="Edit-Button">
                    <i class="mdi mdi-timer-edit"></i>
                    Editar
                </div>
            </a>
            <a href="">
                <div onclick="deleteSelectSes()" class="Delete-Button">
                    <i class="mdi mdi-timer-minus"></i>
                    Apagar
                </div>
            </a>
        `);

    $(".block").empty();
    
    db.transaction(function (tx) {
        // Buscar dados da tabela
        tx.executeSql('SELECT * FROM sessoes WHERE id_materia = ?',[`${item.id_materia}`],
            function (tx, resultSet) {
                let sessoes = [];
                if (resultSet.rows.length === 0) {
                    // Substituir o conteúdo
                    $(".block").empty();
                    sessaoHTML = `
                        <i id="None_Books" class="mdi mdi-timer-alert"></i>
                        <h1 id="None_Books_text">Você ainda não realizou sessões de estudo</h1>
                    `;
                    $(".block").append(sessaoHTML);
                } else {
                
                // Iterar pelos resultados
                for (let i = 0; i < resultSet.rows.length; i++) {
                    sessoes.push(resultSet.rows.item(i));
                }

                // Armazenar no LocalStorage
                localStorage.setItem('sessoes', JSON.stringify(sessoes));
                console.log('Dados armazenados no LocalStorage:', sessoes);
                
                // Substituir o conteúdo
                $(".block").empty();
                sessoes.forEach(sessao =>{
                    if(sessao.tempo_sessao == null){
                        sessao.tempo_sessao = "0";
                    }
                    sessaoHTML = `
                        <div data-id="${sessao.id_sessao}" class="buttom-session">
                            <h3>${sessao.titulo}<br></h3>
                            <h4>Início: ${sessao.data_inicio}<br></h4>
                            <h4>Tempo Total: ${sessao.tempo_sessao}</h4>
                        </div>
                    `;
                    $(".block").append(sessaoHTML);
                });

                $(".buttom-session").on('click', function(){
                    var id = $(this).attr('data-id');
                    localStorage.setItem('cronometro', id);
                    app.views.main.router.navigate("/cronometro/")
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
    app.dialog.prompt('Escreva o nome da sessão', (titulo) => {
        if(titulo == ""){
            app.dialog.alert("Digite um nome válido");
        } else{
            db = window.sqlitePlugin.openDatabase({ name: 'big_ben.db', location: 'default' });
            data_criacao = dataAtual.toLocaleDateString();
            db.transaction(function (tx) {
                // Inserir entidades
                tx.executeSql(
                    'INSERT INTO sessoes (id_materia, titulo, data_inicio, pomodoro) VALUES (?, ?, ?, ?)',
                    [`${item.id_materia}`, `${titulo}`, `${data_criacao}`, 25],
                    function (tx, res) {
                        inserirSes();
                    },
                    function (tx, error) {
                        console.error('Erro ao inserir entidade 1:', error.message);
                    }
                )});
        }
      });
}

function editSelectSes(){
    $("#Options-Buttons-sessions").empty();
    $("#Options-Buttons-sessions").append(`
            <div onclick="inserirSes()" id="Cancel-Button" class="Edit-Button">
                <i class="mdi mdi-cancel"></i>
                Cancelar
            </div>
        `);
    
    let sessoesStorage = JSON.parse(localStorage.getItem('sessoes'));

    $(".block").empty();
    sessoesStorage.forEach(sessao =>{
        if(sessao.id_materia == item.id_materia){
            if(sessao.tempo_sessao == null){
                sessao.tempo_sessao = "0";
            }
        sessaoHTML = `
                <div onclick="editSes(${sessao.id_sessao}, '${sessao.titulo}')" id="edit-buttom-session" class="buttom-session">
                    <h3>${sessao.titulo}<br></h3>
                    <h4>Início: ${sessao.data_inicio}<br></h4>
                    <h4>Tempo Total: ${sessao.tempo_sessao}</h4>
                </div>
        `;
        $(".block").append(sessaoHTML);
        $(".buttom-session").hide();
        }
    });
        $(".buttom-session").fadeIn();
}

function editSes(sesId, ses_tit){
    db = window.sqlitePlugin.openDatabase({ name: 'big_ben.db', location: 'default' });
    var itemId = sesId;
    var itemTit = ses_tit;
        app.dialog.prompt('Escreva o novo título da Sessão', (titulo) => {
            if(titulo == ""){
                app.dialog.alert("Digite um nome válido");
            } else{
                db.transaction(function(tx) {
                    tx.executeSql('UPDATE sessoes SET titulo = ? WHERE id_sessao = ?', [titulo, itemId], 
                    function(tx, res) {
                        inserirSes();
                    },
                    function(tx, error) {
                        app.dialog.alert('Erro ao deletar a Matéria: ', error.message);
                    });
                });
            } 
        });
}

function deleteSelectSes(){
    $("#Options-Buttons-sessions").empty();
    $("#Options-Buttons-sessions").append(`
            <div onclick="inserirSes()" id="Cancel-Button" class="Delete-Button">
                <i class="mdi mdi-cancel"></i>
                Cancelar
            </div>
        `);
    
    let sessoesStorage = JSON.parse(localStorage.getItem('sessoes'));

    $(".block").empty();
    sessoesStorage.forEach(sessao =>{
        if(sessao.id_materia == item.id_materia){
            if(sessao.tempo_sessao == null){
                sessao.tempo_sessao = "0";
            }
        sessaoHTML = `
                <div onclick="deleteSes(${sessao.id_sessao}, '${sessao.titulo}')" id="delete-buttom-session" class="buttom-session">
                    <h3>${sessao.titulo}<br></h3>
                    <h4>Início: ${sessao.data_inicio}<br></h4>
                    <h4>Tempo Total: ${sessao.tempo_sessao}</h4>
                </div>
        `;
        $(".block").append(sessaoHTML);
        $(".buttom-session").hide();
        }
    });
    $(".buttom-session").fadeIn();
}

function deleteSes(sesId, ses_tit){
    db = window.sqlitePlugin.openDatabase({ name: 'big_ben.db', location: 'default' });
    var itemId = sesId;
    var itemTit = ses_tit;
        app.dialog.confirm(`Deseja Realmente apagar a sessão ${itemTit}?`, () => {

            db.transaction(function(tx) {
                tx.executeSql('DELETE FROM sessoes WHERE id_sessao = ?', [itemId], function(tx, res) {
                    app.dialog.alert('Sessão apagada!');
                    inserirSes();
                }, function(tx, error) {
                    app.dialog.alert('Erro ao deletar a Matéria: ', error.message);
                });
            });
        });
}