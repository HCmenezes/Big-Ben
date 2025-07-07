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
	  on: {
		pageBeforeIn: function (event, page) {
		// fazer algo antes da página ser exibida
    	$("#menu-principal").slideDown("fast")
		$.getScript('js/index.js')
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
      options: {
      transition: 'f7-dive',
      },
	  on: {
		pageBeforeIn: function (event, page) {
		// fazer algo antes da página ser exibida
		
		},
		pageAfterIn: function (event, page) {
		// fazer algo depois da página ser exibida
		$.getScript('js/relatorios.js')
		},
		pageInit: function (event, page) {
		// fazer algo quando a página for inicializada
		$.getScript('js/relatorios.js')
		},
		pageBeforeRemove: function (event, page) {
		// fazer algo antes da página ser removida do DOM
		},
	  }
    },
    {
      path: '/configuracoes/',
      url: 'configuracoes.html',
      options: {
      transition: 'f7-dive',
      },
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
		$.getScript('js/sessoes.js')
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
		$.getScript('js/crono.js')
		},
		pageBeforeRemove: function (event, page) {
		// fazer algo antes da página ser removida do DOM
		},
	  }
    },
	{
		path: '/bloco_notas/',
		url: 'bloco_notas.html',
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
		  $.getScript('js/bloco_notas.js')
		  },
		  pageBeforeRemove: function (event, page) {
		  // fazer algo antes da página ser removida do DOM
		  },
		}
	  },
		{
      path: '/nota/',
      url: 'nota.html',
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
		$.getScript('js/notas.js')
		},
		pageBeforeRemove: function (event, page) {
		// fazer algo antes da página ser removida do DOM
		},
	  }
    },
	{
		path: '/anexos/',
		url: 'anexos.html',
		animate: false,
		on: {
		  pageBeforeIn: function (event, page) {
			// fazer algo antes da página ser exibida
			$("#menu-principal").slideUp("fast");
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
		$.getScript('js/notas.js');
		var db = window.sqlitePlugin.openDatabase({ name: 'big_ben.db', location: 'default' });
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
		if (mainView.router.currentRoute.path === '/nota/') {
			e.preventDefault();
			// Recuperar o ID do localStorage
			var id = parseInt(localStorage.getItem('nota'));

			//Pegar o titulo do local Storage
			var notas = JSON.parse(localStorage.getItem('notas'));
			var itemN = notas.find( nota => nota.id_nota === id);
			var db_init = window.sqlitePlugin.openDatabase({ name: 'big_ben.db', location: 'default' });
			var nota_content = document.getElementById("editor-content").innerHTML;
			var dataAtual = new Date();

			db_init.transaction(function (tx) {
				// Inserir entidades
				tx.executeSql('UPDATE notas SET conteudo = ?, modificacao = ? WHERE id_nota = ?', [`${nota_content}`,`${dataAtual.toLocaleDateString()}` , `${itemN.id_nota}`]);
			});
			app.dialog.alert(`${dataAt}`)
			app.views.main.router.navigate("/bloco_notas/");
		} else {
      e.preventDefault();
      mainView.router.back({ force: true });
		}
    }
  }, false);

}
