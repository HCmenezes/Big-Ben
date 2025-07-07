// Search Box
function search_book() {
    let input = document.getElementById('src').value
    input = input.toLowerCase();
    let books = document.getElementsByClassName('buttom');

    for (i = 0; i < books.length; i++) {
        if (!books[i].innerHTML.toLowerCase().includes(input)) {
            books[i].style.display = "none";
        }
        else {
            books[i].style.display = "list-item";
        }
    }
}

// Criação do BD, tabelas e armazenamento no Local Storage
var db;
var materiaHTML;
document.addEventListener('deviceready', function () {
    db = window.sqlitePlugin.openDatabase({ name: 'big_ben.db', location: 'default' });

    // Iniciar a transação Criar tabelas
    // db.transaction(function (tx) {
    //     tx.executeSql(
    //         'CREATE TABLE IF NOT EXISTS alerts (id_materia INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, titulo TEXT NOT NULL, icon TEXT, tempo_materia TEXT)',
    //         [],
    //         function () {
    //             console.log('Tabela criada com sucesso.');
    //         },
    //         function (tx, error) {
    //             console.error('Erro ao criar tabela:', error.message);
    //         }
    //     );

    db.transaction(function (tx) {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS materias (id_materia INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, titulo TEXT NOT NULL, icon TEXT, tempo_materia TEXT)',
            [],
            function () {
                console.log('Tabela criada com sucesso.');
            },
            function (tx, error) {
                console.error('Erro ao criar tabela:', error.message);
            }
        );

        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS sessoes (id_sessao INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, id_materia INTEGER NOT NULL, titulo TEXT NOT NULL, data_inicio TEXT, tempo_sessao TEXT, pomodoro REAL, CONSTRAINT fk_materia_sessao FOREIGN KEY (id_materia) REFERENCES materias (id_materia) ON DELETE CASCADE)',
            [],
            function () {
                console.log('Tabela criada com sucesso.');
            },
            function (tx, error) {
                console.error('Erro ao criar tabela:', error.message);
            }
        );

        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS notas (id_nota INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, id_sessao INTEGER NOT NULL, titulo TEXT NOT NULL, data_inicio TEXT, modificacao TEXT, conteudo TEXT, CONSTRAINT fk_sessao_nota FOREIGN KEY (id_sessao) REFERENCES sessoes(id_sessao) ON DELETE CASCADE)',
            [],
            function () {
                console.log('Tabela criada com sucesso.');
            },
            function (tx, error) {
                console.error('Erro ao criar tabela:', error.message);
            }
        );

        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS anexos (id_anexo INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, id_sessao INTEGER NOT NULL, nome TEXT, path TEXT, CONSTRAINT fk_sessao_anexo FOREIGN KEY(id_sessao) REFERENCES sessoes(id_sessao) ON DELETE CASCADE)',
            [],
            function () {
                console.log('Tabela criada com sucesso.');
            },
            function (tx, error) {
                console.error('Erro ao criar tabela:', error.message);
            }
        );
    });

// Iniciar a transação Buscar dados das tabelas
db.transaction(function (tx){
    tx.executeSql('SELECT * FROM materias',[],
        function (tx, resultSet) {
            let materias = [];

            // Iterar pelos resultados
            for (let i = 0; i < resultSet.rows.length; i++) {
                materias.push(resultSet.rows.item(i));
            }

            // Armazenar no LocalStorage
            localStorage.setItem('materias', JSON.stringify(materias));
            console.log('Dados armazenados no LocalStorage:', materias);
        },
        function (tx, error) {
            console.error('Erro ao buscar dados:', error.message);
        }
    );

    tx.executeSql('SELECT * FROM sessoes',[],
        function (tx, resultSet) {
            let sessoes = [];

            // Iterar pelos resultados
            for (let i = 0; i < resultSet.rows.length; i++) {
                sessoes.push(resultSet.rows.item(i));
            }

            // Armazenar no LocalStorage
            localStorage.setItem('sessoes', JSON.stringify(sessoes));
            console.log('Dados armazenados no LocalStorage:', sessoes);
        },
        function (tx, error) {
            console.error('Erro ao buscar dados:', error.message);
        }
    );

    tx.executeSql('SELECT * FROM notas',[],
        function (tx, resultSet) {
            let notas = [];

            // Iterar pelos resultados
            for (let i = 0; i < resultSet.rows.length; i++) {
                notas.push(resultSet.rows.item(i));
            }

            // Armazenar no LocalStorage
            localStorage.setItem('notas', JSON.stringify(notas));
            console.log('Dados armazenados no LocalStorage:', notas);
        },
        function (tx, error) {
            console.error('Erro ao buscar dados:', error.message);
        }
    );

    tx.executeSql('SELECT * FROM anexos',[],
        function (tx, resultSet) {
            let anexos = [];

            // Iterar pelos resultados
            for (let i = 0; i < resultSet.rows.length; i++) {
                anexos.push(resultSet.rows.item(i));
            }

            // Armazenar no LocalStorage
            localStorage.setItem('anexos', JSON.stringify(anexos));
            console.log('Dados armazenados no LocalStorage:', anexos);
        },
        function (tx, error) {
            console.error('Erro ao buscar dados:', error.message);
        }
    );
});
});

// Inserção na página
document.addEventListener('deviceready', function () {
    db = window.sqlitePlugin.openDatabase({ name: 'big_ben.db', location: 'default' });
    // db.transaction(function (tx) {
    //     // Inserir primeira entidade
    //     tx.executeSql(
    //         'INSERT INTO materias (titulo, icon, tempo_materia) VALUES (?, ?, ?)', 
    //         ['Linguagem PHP', 'mdi mdi-language-php', 1.5],
    //         function (tx, res) {
    //             console.log('Entidade 1 inserida com ID:', res.insertId);
    //         },
    //         function (tx, error) {
    //             console.error('Erro ao inserir entidade 1:', error.message);
    //         }
    //     );
    
    //     // Inserir segunda entidade
    //     tx.executeSql(
    //         'INSERT INTO materias (titulo, icon, tempo_materia) VALUES (?, ?, ?)', 
    //         ['Linguagem C', 'mdi mdi-language-c', 8.25],
    //         function (tx, res) {
    //             console.log('Entidade 2 inserida com ID:', res.insertId);
    //         },
    //         function (tx, error) {
    //             console.error('Erro ao inserir entidade 2:', error.message);
    //         }
    //     );
    
    //     // Inserir terceira entidade
    //     tx.executeSql(
    //         'INSERT INTO materias (titulo, icon, tempo_materia) VALUES (?, ?, ?)', 
    //         ['Linguagem Java', 'mdi mdi-language-java', 5.75],
    //         function (tx, res) {
    //             console.log('Entidade 3 inserida com ID:', res.insertId);
    //         },
    //         function (tx, error) {
    //             console.error('Erro ao inserir entidade 3:', error.message);
    //         }
    //     );
    // });
    
    // Iniciar a transação
    db.transaction(function (tx) {
        // Buscar dados da tabela
        tx.executeSql('SELECT * FROM materias',[],
            function (tx, resultSet) {
                let materias = [];

                if (resultSet.rows.length === 0) {
                    // Substituir o conteúdo
                    $(".block").empty();
                    materiaHTML = `
                        <i id="None_Books" class="mdi mdi-book-alert"></i>
                        <h1 id="None_Books_text">Você ainda não possui livros em sua biblioteca</h1>
                    `;
                    $(".block").append(materiaHTML);
                } else {
                
                // Iterar pelos resultados
                for (let i = 0; i < resultSet.rows.length; i++) {
                    materias.push(resultSet.rows.item(i));
                }

                // Armazenar no LocalStorage
                localStorage.setItem('materias', JSON.stringify(materias));
                console.log('Dados armazenados no LocalStorage:', materias);
                
                // Substituir o conteúdo
                $(".block").empty();
                materias.forEach(materia =>{
                    materiaHTML = `
                        <a href="#">
                            <div data-id="${materia.id_materia}" class="buttom">
                                <i class="${materia.icon}"></i>
                                ${materia.titulo}
                            </div>
                        </a>
                    `;
                    $(".block").append(materiaHTML);
                });

                $(".buttom").on('click', function(){
                    var id = $(this).attr('data-id');
                    localStorage.setItem('sessao', id);
                    app.views.main.router.navigate("/sessoes/")
                })
            }
            },
            function (tx, error) {
                console.error('Erro ao buscar dados:', error.message);
            }
        );
    });
});

function inserirMat(){
    db = window.sqlitePlugin.openDatabase({ name: 'big_ben.db', location: 'default' });

    $(".Options-Buttons").empty();
    $(".Options-Buttons").append(`
            <a href="">
                <div  onclick="criar()" class="Create-Button">
                    <i class="mdi mdi-book-plus"></i>
                    Novo
                </div>
            </a>
            <a href="">
                <div onclick="editSelectMat()" class="Edit-Button">
                    <i class="mdi mdi-book-edit"></i>
                    Editar
                </div>
            </a>
            <a href="">
                <div onclick="deleteSelectMat()" class="Delete-Button">
                    <i class="mdi mdi-book-minus"></i>
                    Apagar
                </div>
            </a>
        `);

    $(".block").empty();
    
    db.transaction(function (tx) {
        // Buscar dados da tabela
        tx.executeSql('SELECT * FROM materias',[],
            function (tx, resultSet) {
                let materias = [];

                if (resultSet.rows.length === 0) {
                    document.getElementById('src').placeholder = 'O que vamos estudar hoje?';
                    // Substituir o conteúdo
                    $(".block").empty();
                    materiaHTML = `
                        <i id="None_Books" class="mdi mdi-book-alert"></i>
                        <h1 id="None_Books_text">Você ainda não possui livros em sua biblioteca</h1>
                    `;
                    $(".block").append(materiaHTML);
                } else {
                
                // Iterar pelos resultados
                for (let i = 0; i < resultSet.rows.length; i++) {
                    materias.push(resultSet.rows.item(i));
                }
                
                // Armazenar no LocalStorage
                localStorage.setItem('materias', JSON.stringify(materias));
                console.log('Dados armazenados no LocalStorage:', materias);

                // Substituir o conteúdo
                document.getElementById('src').placeholder = 'O que vamos estudar hoje?';
                $(".block").empty();
                materias.forEach(materia =>{
                    materiaHTML = `
                        <a href="#">
                            <div data-id="${materia.id_materia}" class="buttom">
                                <i class="${materia.icon}"></i>
                                ${materia.titulo}
                            </div>
                        </a>
                    `;
                    $(".block").append(materiaHTML);
                    $(".buttom").hide();
                });
                $(".buttom").on('click', function(){
                    var id = $(this).attr('data-id');
                    localStorage.setItem('sessao', id);
                    app.views.main.router.navigate("/sessoes/")
                })
                $(".buttom").fadeIn();
            }
            },
            function (tx, error) {
                console.error('Erro ao buscar dados:', error.message);
            }
        );
    });
}

// CRUD
var titulo;
var icone;

function getIcon(icone, titulo){
    db = window.sqlitePlugin.openDatabase({ name: 'big_ben.db', location: 'default' });
    
    db.transaction(function (tx) {
        // Inserir entidades
        tx.executeSql(
         'INSERT INTO materias (titulo, icon) VALUES (?, ?)',
         [`${titulo}`, `${icone}`],
         function (tx, res) {
             console.log('Matéria inserida com ID:', res.insertId);
         },
         function (tx, error) {
             console.error('Erro ao inserir matéria:', error.message);
         }
     )});
     inserirMat();
};

function criar(){
    app.dialog.prompt('Digite o nome do assunto', (titulo) => {
        if(titulo == ""){
            app.dialog.alert("Digite um nome válido");
        } else{
                $(".Options-Buttons").empty();
                $(".Options-Buttons").append(`
                        <div onclick="inserirMat()" id="Cancel-Button" class="Delete-Button">
                            <i class="mdi mdi-cancel"></i>
                            Cancelar
                        </div>
                    `);
                document.getElementById('src').placeholder = 'Procure seu ícone';
                $(".block").empty();
                    materiaHTML = `
                            <div onclick="getIcon('mdi mdi-language-c', '${titulo}')" id="select-icon" class="buttom">
                                <i class="mdi mdi-language-c"></i> <br>
                                Linguagem C
                            </div>
                            <div onclick="getIcon('mdi mdi-language-ruby', '${titulo}')" id="select-icon" class="buttom">
                                <i class="mdi mdi-language-ruby"></i> <br>
                                Linguagem Ruby
                            </div>
                            <div onclick="getIcon('mdi mdi-language-java', '${titulo}')" id="select-icon" class="buttom">
                                <i class="mdi mdi-language-java"></i> <br>
                                Linguagem Java
                            </div>
                            <div onclick="getIcon('mdi mdi-language-html5', '${titulo}')" id="select-icon" class="buttom">
                                <i class="mdi mdi-language-html5"></i> <br>
                                Linguagem HTML
                            </div>
                            <div onclick="getIcon('mdi mdi-language-css3', '${titulo}')" id="select-icon" class="buttom">
                                <i class="mdi mdi-language-css3"></i> <br>
                                Linguagem CSS
                            </div>
                            <div onclick="getIcon('mdi mdi-language-javascript', '${titulo}')" id="select-icon" class="buttom">
                                <i class="mdi mdi-language-javascript"></i> <br>
                                Linguagem Java Script
                            </div>
                            <div onclick="getIcon('mdi mdi-language-php', '${titulo}')" id="select-icon" class="buttom">
                                <i class="mdi mdi-language-php"></i> <br>
                                Linguagem PHP
                            </div>
                            <div onclick="getIcon('mdi mdi-language-python', '${titulo}')" id="select-icon" class="buttom">
                                <i class="mdi mdi-language-python"></i> <br>
                                Linguagem Python
                            </div>
                    `;
                    $(".block").append(materiaHTML);
                    $(".buttom").hide();
                    $(".buttom").fadeIn();
        }
      });
}

function editSelectMat(){
    $(".Options-Buttons").empty();
    $(".Options-Buttons").append(`
            <div onclick="inserirMat()" id="Cancel-Button" class="Edit-Button">
                <i class="mdi mdi-cancel"></i>
                Cancelar
            </div>
        `);
    
    let materiasStorage = JSON.parse(localStorage.getItem('materias'));

    document.getElementById('src').placeholder = 'O que deseja editar?';
    $(".block").empty();
    materiasStorage.forEach(materia =>{
        materiaHTML = `
                <div onclick="editMat(${materia.id_materia}, '${materia.titulo}')" id="edit-buttom" class="buttom">
                    <i class="mdi mdi-square-edit-outline"></i>
                    ${materia.titulo}
                </div>
        `;
        $(".block").append(materiaHTML);
        $(".buttom").hide();
    });
    $(".buttom").fadeIn();
}

function editMat(matId, mat_tit){
    db = window.sqlitePlugin.openDatabase({ name: 'big_ben.db', location: 'default' });
    var itemId = matId;
    var itemTit = mat_tit;
        app.dialog.prompt('Escreva o novo nome do livro', (titulo) => {
            if(titulo == ""){
                app.dialog.alert("Digite um nome válido");
            } else{
                db.transaction(function(tx) {
                    tx.executeSql('UPDATE materias SET titulo = ? WHERE id_materia = ?', [titulo, itemId],
                    function (tx, res) {
                        console.log('Matéria alterada com ID:', res.insertId);
                    },     
                    function(tx, error) {
                        app.dialog.alert('Erro ao editar a Matéria: ', error.message);
                    });
                });
                inserirMat();
            }
        });
}

function deleteSelectMat(){
    $(".Options-Buttons").empty();
    $(".Options-Buttons").append(`
            <div onclick="inserirMat()" id="Cancel-Button" class="Delete-Button">
                <i class="mdi mdi-cancel"></i>
                Cancelar
            </div>
        `);
    
    let materiasStorage = JSON.parse(localStorage.getItem('materias'));

    document.getElementById('src').placeholder = 'O que deseja deletar?';
    $(".block").empty();
    materiasStorage.forEach(materia =>{
        materiaHTML = `
                <div onclick="deleteMat(${materia.id_materia}, '${materia.titulo}')" id="delete-buttom" class="buttom">
                    <i class="mdi mdi-delete-circle-outline"></i>
                    ${materia.titulo}
                </div>
        `;
        $(".block").append(materiaHTML);
        $(".buttom").hide();
    });
    $(".buttom").fadeIn();
}

function deleteMat(matId, mat_tit){
    db = window.sqlitePlugin.openDatabase({ name: 'big_ben.db', location: 'default' });
    var itemId = matId;
    var itemTit = mat_tit;
        app.dialog.confirm(`Deseja Realmente apagar o livro ${itemTit}?`, () => {
            db.transaction(function(tx) {
                tx.executeSql('DELETE FROM materias WHERE id_materia = ?', [itemId], function(tx, res) {
                    app.dialog.alert('Livro retirado da biblioteca!!');
                    inserirMat();
                }, function(tx, error) {
                    app.dialog.alert('Erro ao deletar a Matéria: ', error.message);
                    inserirMat();
                });
            });
        });
}