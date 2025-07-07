// DB
var db;
var relatHTML;

// Cálculo tempo total
document.addEventListener('deviceready', function () {
    db = window.sqlitePlugin.openDatabase({ name: 'big_ben.db', location: 'default' });

    db.transaction(function(tx) {
        // Seleciona todas as matérias
        tx.executeSql('SELECT id_materia FROM materias', [], function(tx, res) {
            let totalMaterias = res.rows.length;

            if (totalMaterias != 0) {
                
            } else {
                for (let i = 0; i < totalMaterias; i++) {
                    let idMateria = res.rows.item(i).id_materia;
    
                    // Calcula o tempo total das sessões dessa matéria
                    tx.executeSql(
                        'SELECT tempo_sessao FROM sessoes WHERE id_materia = ?', [idMateria],
                        function(tx, resultSet) {
                            let tempoTotal = 0;
    
                            for (let j = 0; j < resultSet.rows.length; j++) {
                                let tempoSessao = resultSet.rows.item(j).tempo_sessao;
                                app.dialog.alert(`${tempoSessao}`)
                                if (tempoSessao != null) {
                                    let [hh, mm, ss] = tempoSessao.split(':').map(Number);
                                    tempoTotal += hh + (mm / 60) + (ss / 3600);
                                    parseInt(tempoTotal);
                                } else { tempoTotal = 0.0;}
                            }
    
                            // Atualiza a matéria com o tempo total calculado
                            tx.executeSql('UPDATE materias SET tempo_materia = ? WHERE id_materia = ?', [`${tempoTotal.toFixed(2)}`, idMateria]);
                        },
                        function(tx, error) {
                            console.error(`Erro ao calcular tempo total para a matéria ${idMateria}:`, error.message);
                        }
                    );
                }
            }
        });
    });
});

//Inserção na Página
function relatIndex() {
    db = window.sqlitePlugin.openDatabase({ name: 'big_ben.db', location: 'default' });

    db.transaction(function (tx) {
        // Buscar dados da tabela
        tx.executeSql('SELECT * FROM materias',[],
            function (tx, resultSet) {
                let materias = [];

                if (resultSet.rows.length === 0) {
                    // Substituir o conteúdo
                    $(".block").empty();
                    relatHTML = `
                        <div id="mat-relat" class="info-section">
                            <p class="info-title">Você não possui nenhum livro em sua bibliotecav</p>
                        </div>
                        <hr>
                    `;
                    $(".block").append(relatHTML);
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
                    relatHTML = `
                        <div id="mat-relat" class="info-section">
                            <p class="info-title"><i class="${materia.icon}"></i> ${materia.titulo}</p>
                            <p id="mat-relat-detail" class="info-detail">${materia.tempo_materia} horas</p>
                        </div>
                        <hr>
                    `;
                    $(".block").append(relatHTML);
                });
            }
            },
            function (tx, error) {
                console.error('Erro ao buscar dados:', error.message);
            }
        );
    });

    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["C", "PHP", "Java"],
            datasets: [{
                label: 'Horas estudadas',
                data: [1.5, 8.25, 5.75],
                backgroundColor: [
                    '#ec4c47',
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                    padding: 20 // Distância dos índices em relação ao eixo X
                    },
                    grid: {
                    display: false // Esconde a linha de grid para um efeito visual mais limpo
                    }
                },
                y: {
                    beginAtZero: true
                }
                },
            plugins: {
                legend: {
                    position: 'top',
                },
            },
        }
    });
};