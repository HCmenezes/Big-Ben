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

    // Iniciar a transação
    db.transaction(function (tx) {
        
        // Criar tabelas
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS materias (id_materia INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, titulo TEXT NOT NULL, icon TEXT, tempo_materia REAL)',
            [],
            function () {
                console.log('Tabela criada com sucesso.');
            },
            function (tx, error) {
                console.error('Erro ao criar tabela:', error.message);
            }
        );

        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS sessoes (id_sessao INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, id_materia INTEGER NOT NULL, titulo TEXT NOT NULL, data_inicio TEXT, tempo_sessao REAL, CONSTRAINT fk_materia_sessao FOREIGN KEY (id_materia) REFERENCES materias (id_materia) ON DELETE CASCADE)',
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

        // Buscar dados das tabelas
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
                        <a data-id="${materia.id_materia}" href="#">
                            <div class="buttom">
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
    let materiasStorage = JSON.parse(localStorage.getItem('materias'));

    $(".Options-Buttons").empty();
    $(".Options-Buttons").append(`
            <a href="">
                                <div  onclick="criar()" class="Create-Button">
                                    <i class="mdi mdi-book-plus"></i>
                                    Novo
                                </div>
                            </a>
                            <a href="">
                                <div class="Edit-Button">
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
    materiasStorage.forEach(materia =>{
        materiaHTML = `
            <a data-id="${materia.id_materia}" href="#">
                <div class="buttom">
                    <i class="${materia.icon}"></i>
                    ${materia.id_materia}
                </div>
            </a>
        `;
        $(".block").append(materiaHTML);
        $(".buttom").hide();
    });
    $(".buttom").fadeIn();
}

// CRUD

function criar() {
    // Iniciar transação para deletar registros
    db.transaction(function (tx) {
       // Inserir entidades teste
       tx.executeSql(
        'INSERT INTO materias (titulo, icon, tempo_materia) VALUES (?, ?, ?)',
        ['Desenvolvimento de Sistemas', 'mdi mdi-unfold-more-vertical', 1.5],
        function (tx, res) {
            console.log('Entidade 1 inserida com ID:', res.insertId);
        },
        function (tx, error) {
            console.error('Erro ao inserir entidade 1:', error.message);
        }
    );

    tx.executeSql(
        'INSERT INTO materias (titulo, icon, tempo_materia) VALUES (?, ?, ?)',
        ['Java', 'mdi mdi-unfold-more-vertical', 2.0],
        function (tx, res) {
            console.log('Entidade 2 inserida com ID:', res.insertId);
        },
        function (tx, error) {
            console.error('Erro ao inserir entidade 2:', error.message);
        }
    );

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
                    <a data-id="${materia.id_materia}" href="#">
                        <div class="buttom">
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

    $(".block").empty();
    materiasStorage.forEach(materia =>{
        materiaHTML = `
                <div onclick="deleteMat(${materia.id_materia})" id="delete-buttom" class="buttom">
                    <i class="mdi mdi-delete-circle-outline"></i>
                    ${materia.titulo}
                </div>
        `;
        $(".block").append(materiaHTML);
        $(".buttom").hide();
    });
    $(".buttom").fadeIn();
}

function deleteMat(event){
    db = window.sqlitePlugin.openDatabase({ name: 'big_ben.db', location: 'default' });
    var itemId = event
        db.transaction(function(tx) {
            tx.executeSql('DELETE FROM materias WHERE id_materia = ?', [itemId], function(tx, res) {
                app.dialog.alert('Matéria deletada!!');

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
                            
                            $(".Options-Buttons").empty();
                            $(".Options-Buttons").append(`
                            <a href="">
                                <div  onclick="criar()" class="Create-Button">
                                    <i class="mdi mdi-book-plus"></i>
                                    Novo
                                </div>
                            </a>
                            <a href="">
                                <div class="Edit-Button">
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
                            // Substituir o conteúdo
                            $(".block").empty();
                            materias.forEach(materia =>{
                                materiaHTML = `
                                    <a data-id="${materia.id_materia}" href="#">
                                        <div class="buttom">
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
            }, function(tx, error) {
                app.dialog.alert('Erro ao deletar a Matéria: ', error.message);
            });
        });
}
