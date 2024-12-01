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
		// app.views.main.router.navigate("/sessoes/")
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
    	$("#menu-principal").slideDown("fast")
		},
		pageAfterIn: function (event, page) {
		// fazer algo depois da página ser exibida
		},
		pageInit: function (event, page) {
		// fazer algo quando a página for inicializada
		const ctx = document.getElementById('myChart').getContext('2d');
			const myChart = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: ['Matéria1', 'Matéria2', 'Matéria3', 'Matéria4'],
					datasets: [{
						label: 'Horas estudadas',
						
						data: [10, 20, 15, 25, 30], // Exemplo de valores para cada matéria
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
		document.getElementById('chk').addEventListener('change', updateTimerAndTitle);
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
		var editor = app.textEditor.create({
			el: '.text-editor',
			mode: 'toolbar',
			buttons: [["bold", "italic", "underline", "strikeThrough"], ["orderedList", "unorderedList"]], // Botões disponíveis
			placeholder: 'Escreva suas notas aqui...',
		 });
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
