// Recuperar o ID do localStorage
var id = parseInt(localStorage.getItem('cronometro'));

//Pegar o titulo do local Storage
var sessoes = JSON.parse(localStorage.getItem('sessoes'));
var item = sessoes.find( sessao => sessao.id_sessao === id);

$(".title").text(item.titulo);

// CRONO
var db
var cronoHTML;

var check = 0;
var pomo = item.pomodoro;
var hora = 0;
var min = 0;
var seg = 0;
var tempo = 1000; //milésimos por segundo
var cron;

document.getElementById('chk').addEventListener('change', function(){
    var checkbox = document.getElementById('chk');
    var timerDisplay = document.getElementById('timer');
    var timerType = document.getElementById('timerType');
    
    if (checkbox.checked) {
        check = 1;
        timerDisplay.textContent = `${String(pomo).padStart(2, '0')}:00`;
        timerType.textContent = 'Pomodoro';
    } else {
        check = 0;
        timerDisplay.textContent = '00:00:00';
        timerType.textContent = 'Cronômetro';
    }
});

document.getElementById('timer').addEventListener('click', function(){
    if(check == 1){
        app.dialog.prompt('Digite o tempo em minutos para o seu pomodoro', (pomos) =>{
            pomos = parseInt(pomos);
            if (isNaN(pomo)) {
                app.dialog.alert('Digite um tempo válido');
            } else {
                pomo = pomos;
                db = window.sqlitePlugin.openDatabase({ name: 'big_ben.db', location: 'default' });
                var sesId = item.id_sessao;
                    db.transaction(function(tx) {
                        tx.executeSql('UPDATE sessoes SET pomodoro = ? WHERE id_sessao = ?', [pomo, sesId], function(tx, res) {
                            var timerDisplay = document.getElementById('timer');
                            app.dialog.alert(`Tempo do pomodoro autalizado para ${pomo} minutos`);
                            timerDisplay.textContent = `${pomo}:00`;
                    })
                }); 
            }
        })
    }
})

function start() {
    cron = setInterval(() => { timer(); }, tempo);

    $("#btn_1").remove();
    $("#btn_1-2").remove();
    $("#text_1").remove();
    //Add pause btn
    cronoHTML = `
        <button onclick="pause()" id="btn_1-1" class="play-button">▶</button>
    `
    $(".manage_btn").prepend(cronoHTML);
    //Add pause text
    cronoHTML = `
        <p id="text_0" class="play-text">Pausar</p>
    `
    $(".manage-text").prepend(cronoHTML);
    
    document.querySelectorAll('.manage_btn').forEach(element => {
        element.style.paddingLeft = "0px";
    });

    document.querySelectorAll('.manage-text').forEach(element => {
        element.style.paddingLeft = "30px";
    });

    if(document.getElementById("btn_3") == null && document.getElementById("btn_2") == null){
        //Add reset btn
        cronoHTML = `
        <button onclick="reset()" id="btn_2" class="play-button">⟳</button>
        `
        $(".manage_btn").append(cronoHTML);
        //Add reset text
        cronoHTML = `
            <p id="text_2" class="play-text">Reiniciar</p>
        `
        $(".manage-text").append(cronoHTML);
        //Add stop btn
        cronoHTML = `
        <button onclick="stop()" id="btn_3" class="play-button">■</button>
        `
        $(".manage_btn").append(cronoHTML);
        //Add stop text
        cronoHTML = `
            <p id="text_3"class="play-text">Parar</p>
        `
        $(".manage-text").append(cronoHTML);
    }
}

function pause() {
    clearInterval(cron);

    $("#btn_1-1").remove();
    $("#text_0").remove();
    cronoHTML = `
        <button onclick="start()" id="btn_1-2" class="play-button">❚❚</button>
    `
    $(".manage_btn").prepend(cronoHTML);
    cronoHTML = `
        <p id="text_1" class="play-text">Continuar</p>
    `
    $(".manage-text").prepend(cronoHTML);
}

function reset() {
    clearInterval(cron);
    hora = 0;
    min = 0;
    seg = 0;

    if (check == 1) {
        document.getElementById('timer').innerText = `${String(pomo).padStart(2, '0')}:00`;
    } else {
        document.getElementById('timer').innerText = '00:00:00'
    }

    // Frontend
    $("#btn_2").remove();
    $("#btn_3").remove();
    $("#text_2").remove();
    $("#text_3").remove();
    $("#btn_1-1").remove();
    $("#btn_1-2").remove();
    $("#text_0").remove();
    $("#text_1").remove();
    //Add start btn
    cronoHTML = `
        <button onclick="start()" id="btn_1" class="play-button">▷</button>
    `
    $(".manage_btn").prepend(cronoHTML);
    //Add start text
    cronoHTML = `
        <p id="text_1" class="play-text">Começar</p>
    `
    $(".manage-text").prepend(cronoHTML)

    document.querySelectorAll('.manage_btn').forEach(element => {
        element.style.paddingLeft = "85px";
    });

    document.querySelectorAll('.manage-text').forEach(element => {
        element.style.paddingLeft = "117px";
    });
}

function stop() {
    db = window.sqlitePlugin.openDatabase({ name: 'big_ben.db', location: 'default' });
    var sesId = item.id_sessao;
    var sesTAtual = document.getElementById('timer').innerText;
    var sesTTotal;

        db.transaction(function(tx) {
            tx.executeSql('SELECT tempo_sessao FROM sessoes WHERE id_sessao = ?', [`${item.id_sessao}`], function(tx, res) {
                if (check == 1) {
                    var ti = pomo*60;
                    var tf = min*60+seg;
                    var dt = ti-tf;
                    var mm = Math.floor(dt/60);
                    var ss = dt%60

                    if (res.rows.item(0).tempo_sessao == null) {
                        tx.executeSql('UPDATE sessoes SET tempo_sessao = ? WHERE id_sessao = ?', [`00:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`, `${item.id_sessao}`]);
                    } else {
                        var hh = 0;
                        sesTTotal = res.rows.item(0).tempo_sessao;
                        ss = parseInt(ss) + parseInt(sesTTotal.substring(6,8));
                        mm = parseInt(mm) + parseInt(sesTTotal.substring(3,5)) + Math.floor(ss / 60);
                        hh = parseInt(hh) + parseInt(sesTTotal.substring(0,2)) + Math.floor(mm / 60);
                        ss %= 60;
                        mm %= 60;
                        tx.executeSql('UPDATE sessoes SET tempo_sessao = ? WHERE id_sessao = ?', [`${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`, `${item.id_sessao}`]);
                    }
                } else {
                    var hh = sesTAtual.substring(0,2);
                    var mm = sesTAtual.substring(3,5);
                    var ss = sesTAtual.substring(6,8);

                    if (res.rows.item(0).tempo_sessao == null) {
                        tx.executeSql('UPDATE sessoes SET tempo_sessao = ? WHERE id_sessao = ?', [sesTAtual, `${item.id_sessao}`]);
                    } else {
                        sesTTotal = res.rows.item(0).tempo_sessao;
                        ss = parseInt(ss) + parseInt(sesTTotal.substring(6,8));
                        mm = parseInt(mm) + parseInt(sesTTotal.substring(3,5)) + Math.floor(ss / 60);
                        hh = parseInt(hh) + parseInt(sesTTotal.substring(0,2)) + Math.floor(mm / 60);
                        ss %= 60;
                        mm %= 60;
                        tx.executeSql('UPDATE sessoes SET tempo_sessao = ? WHERE id_sessao = ?', [`${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`, `${item.id_sessao}`]);
                    }
                }
            });          
        });
    
    clearInterval(cron);

    if (check == 1) {
        document.getElementById('timer').innerText = `${String(pomo).padStart(2, '0')}:00`;
    } else {
        document.getElementById('timer').innerText = '00:00:00'
    }

    //Frontend
    $("#btn_2").remove();
    $("#btn_3").remove();
    $("#text_2").remove();
    $("#text_3").remove();
    $("#btn_1-1").remove();
    $("#btn_1-2").remove();
    $("#text_0").remove();
    $("#text_1").remove();
    //Add start btn
    cronoHTML = `
        <button onclick="start()" id="btn_1" class="play-button">▷</button>
    `
    $(".manage_btn").prepend(cronoHTML);
    //Add start text
    cronoHTML = `
        <p id="text_1" class="play-text">Começar</p>
    `
    $(".manage-text").prepend(cronoHTML)

    document.querySelectorAll('.manage_btn').forEach(element => {
        element.style.paddingLeft = "85px";
    });

    document.querySelectorAll('.manage-text').forEach(element => {
        element.style.paddingLeft = "117px";
    });
}

function timer() {
    if (check == 1) {
        if (document.getElementById("timer").innerText === `${String(pomo).padStart(2,'0')}:00`) {
            min = pomo-1;
            seg = 60;
        }

        seg--;
        
        if (seg <= 0) {
            seg = 59;
            min--;
                if (min < 0) {
                    min = 0;
                    seg = 0;
                }
                if (min === 0 && seg === 0) {
                    clearInterval(cron);
                    hora = 0;
                    min = 0;
                    seg = 0;
                    document.getElementById('timer').innerText = '00:00'
                }
        }
        var format = (min < 10 ? '0'+min : min) + ':' + (seg < 10 ? '0'+seg : seg);
        document.getElementById("timer").innerText = format;
    } else {
        var format = (hora < 10 ? '0'+hora : hora) + ':' + (min < 10 ? '0'+min : min) + ':' + (seg < 10 ? '0'+seg : seg);
        document.getElementById("timer").innerText = format;

        seg++;

        if (seg == 60) {
        seg = 0;
        min++;
            
            if (min == 60) {
                min = 0;
                hora++;
                
            }
        }
    }
}