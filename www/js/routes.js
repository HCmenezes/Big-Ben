//INICIALIZAÇÃO DO F7 QUANDO DISPOSITIVO ESTÁ PRONTO
document.addEventListener('deviceready', onDeviceReady, false);
var app = new Framework7({
  // App root element
  el: '#app',
  // App Name
  name: 'Bigben',
  // App id
  id: 'com.myapp.test',
  // Enable swipe panel
  panel: {
    swipe: true,
  },
  dialog: {
    buttonOk: 'Sim',
    buttonCancel: 'Cancelar',
  },
  // Add default routes
  routes: [
    {
      path: '/index/',
      url: 'index.html',
      animate: false,
	  on: {
		pageBeforeIn: function (event, page) {
		// fazer algo antes da página ser exibida
    	$("#menu-principal").slideDown("fast")
		},
		pageAfterIn: function (event, page) {
		// fazer algo depois da página ser exibida
		},
		pageInit: function (event, page) {
		// fazer algo quando a página for inicializada
		
		},
		pageBeforeRemove: function (event, page) {
		// fazer algo antes da página ser removida do DOM
		},
	  }
    },
    {
      path: '/relatorios/',
      url: 'relatorios.html',
      animate: false,
	  on: {
		pageBeforeIn: function (event, page) {
		// fazer algo antes da página ser exibida
    	$("#menu-principal").slideDown("fast")
		},
		pageAfterIn: function (event, page) {
		// fazer algo depois da página ser exibida
		},
		pageInit: function (event, page) {
		// fazer algo quando a página for inicializada
		},
		pageBeforeRemove: function (event, page) {
		// fazer algo antes da página ser removida do DOM
		},
	  }
    },
    {
      path: '/configuracoes/',
      url: 'configuracoes.html',
      animate: false,
	  on: {
		pageBeforeIn: function (event, page) {
		// fazer algo antes da página ser exibida
    $("#menu-principal").slideDown("fast")
		},
		pageAfterIn: function (event, page) {
		// fazer algo depois da página ser exibida
		},
		pageInit: function (event, page) {
		// fazer algo quando a página for inicializada
		},
		pageBeforeRemove: function (event, page) {
		// fazer algo antes da página ser removida do DOM
		},
	  }
    },
    {
      path: '/sessoes/',
      url: 'sessoes.html',
      options: {
      transition: 'f7-dive',
      },
	  on: {
		pageBeforeIn: function (event, page) {
		// fazer algo antes da página ser exibida
    $("#menu-principal").slideUp("fast")
		},
		pageAfterIn: function (event, page) {
		// fazer algo depois da página ser exibida
		},
		pageInit: function (event, page) {
		// fazer algo quando a página for inicializada
		},
		pageBeforeRemove: function (event, page) {
		// fazer algo antes da página ser removida do DOM
		},
	  }
    },
    {
      path: '/cronometro/',
      url: 'cronometro.html',
      options: {
      transition: 'f7-dive',
      },
	  on: {
		pageBeforeIn: function (event, page) {
		// fazer algo antes da página ser exibida
    $("#menu-principal").slideUp("fast")
		},
		pageAfterIn: function (event, page) {
		// fazer algo depois da página ser exibida
		},
		pageInit: function (event, page) {
		// fazer algo quando a página for inicializada
		// Função para atualizar o cronômetro e o título
		function updateTimerAndTitle() {
			var checkbox = document.getElementById('chk');
			var timerDisplay = document.getElementById('timer');
			var timerType = document.getElementById('timerType');
			
			if (checkbox.checked) {
				timerDisplay.textContent = '25:00:00';
				timerType.textContent = 'Pomodoro';
			} else {
				timerDisplay.textContent = '00:00:00';
				timerType.textContent = 'Cronômetro';
			}
		}
		
		// Adiciona um ouvinte de eventos para a mudança da checkbox
		document.getElementById('chk').addEventListener('change', updateTimerAndTitle);
		},
		pageBeforeRemove: function (event, page) {
		// fazer algo antes da página ser removida do DOM
		},
	  }
    },
    {
      path: '/sobre_app/',
      url: 'sobre_app.html',
      options: {
      transition: 'f7-dive',
      },
	  on: {
		pageBeforeIn: function (event, page) {
		// fazer algo antes da página ser exibida
    $("#menu-principal").slideUp("fast")
		},
		pageAfterIn: function (event, page) {
		// fazer algo depois da página ser exibida
		},
		pageInit: function (event, page) {
		// fazer algo quando a página for inicializada
		},
		pageBeforeRemove: function (event, page) {
		// fazer algo antes da página ser removida do DOM
		},
	  }
    },
    {
      path: '/acessibilidade/',
      url: 'acessibilidade.html',
      options: {
      transition: 'f7-dive',
      },
	  on: {
		pageBeforeIn: function (event, page) {
		// fazer algo antes da página ser exibida
    $("#menu-principal").slideUp("fast")
		},
		pageAfterIn: function (event, page) {
		// fazer algo depois da página ser exibida
		},
		pageInit: function (event, page) {
		// fazer algo quando a página for inicializada
		},
		pageBeforeRemove: function (event, page) {
		// fazer algo antes da página ser removida do DOM
		},
	  }
    },
    {
      path: '/idiomas/',
      url: 'idiomas.html',
      options: {
      transition: 'f7-dive',
      },
	  on: {
		pageBeforeIn: function (event, page) {
		// fazer algo antes da página ser exibida
    $("#menu-principal").slideUp("fast")
		},
		pageAfterIn: function (event, page) {
		// fazer algo depois da página ser exibida
		},
		pageInit: function (event, page) {
		// fazer algo quando a página for inicializada
		},
		pageBeforeRemove: function (event, page) {
		// fazer algo antes da página ser removida do DOM
		},
	  }
    }
  ],
  
  // ... other parameters
});

//Para testes direto no navegador
var mainView = app.views.create('.view-main', { url: '/index/' });

//EVENTO PARA SABER O ITEM DO MENU ATUAL
app.on('routeChange', function (route) {
  var currentRoute = route.url;
  console.log(currentRoute);
  document.querySelectorAll('.tab-link').forEach(function (el) {
    el.classList.remove('active');
  });
  var targetEl = document.querySelector('.tab-link[href="' + currentRoute + '"]');
  if (targetEl) {
    targetEl.classList.add('active');
  }
});


function onDeviceReady() {
  //Quando estiver rodando no celular
  var mainView = app.views.create('.view-main', { url: '/index/' });

  //COMANDO PARA "OUVIR" O BOTAO VOLTAR NATIVO DO ANDROID 	
  document.addEventListener("backbutton", function (e) {

    if (mainView.router.currentRoute.path === '/index/') {
      e.preventDefault();
      app.dialog.confirm('Deseja sair do aplicativo?', function () {
        navigator.app.exitApp();
      });
    } else {
      e.preventDefault();
      mainView.router.back({ force: true });
    }
  }, false);

}
