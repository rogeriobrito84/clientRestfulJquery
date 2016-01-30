
//Ap�s carregar a p�gina 
function inicial(){
}

function carregarTabela(idTbody, usuarios){
	for(var i = 0; i < usuarios.length; i++){
		document.write(usuarios[i].nome);
	}
	
}

function listar(){
	$.ajax({
	    type: "GET",
	    url: "http://localhost:8080/servicesRestfull/usuario/",
	    success: function(retorno){
	        document.write("Retorno: " + retorno.usuario);
	    },
	    error: function(xhr, textStatus, errorThrown){
	         showMsg(xhr.responseText, null, "error", "lg");
	    }
	});
}

function buscar(id){
	var dialog = showAguarde();
	$.ajax({
		type: "GET",
		url: "http://localhost:8080/servicesRestfull/usuario/" +id,
		success: function(retorno){
			dialog.close();
			showMsg("Retorno: " + retorno.nome, null, "primario");
		},
		error: function(xhr, textStatus, errorThrown){
			dialog.close();
			showMsg("Error: " + xhr.responseText, null, "primario");
		}
	});
}

function excluir(id){
	$.ajax({
		type: "DELETE",
		url: "http://localhost:8080/servicesRestfull/usuario/" + id,
		dataType:"html",
		contentType: "application/json",
		success: function(retorno){
			showMsg(retorno, "Sucesso", "sucesso", null);
		},error: function(xhr, textStatus, errorThrown){
			showMsg(xhr.responseText, null, "error", "lg");
		}
	});
}

function inserir(obj){
	obj = JSON.stringify(obj);
	$.ajax({
	    type: "POST",
	    url: "http://localhost:8080/servicesRestfull/usuario/",
	    dataType:"html",
	    contentType: "application/json",
	    data: obj,
	    success: function(retorno){
	    	showMsg(retorno, "Sucesso", "sucesso", null);
	    },error: function(xhr, textStatus, errorThrown){
	    	showMsg(xhr.responseText, null, "error", "lg");
	    }
	});
}

function alterar(obj){
	obj = JSON.stringify(obj);
	$.ajax({
	    type: "PUT",
	    url: "http://localhost:8080/servicesRestfull/usuario/",
	    dataType:"html",
	    contentType: "application/json",
	    data: obj,
	    success: function(retorno){
	    	showMsg(retorno, "Sucesso", "sucesso", null);
	    },error: function(xhr, textStatus, errorThrown){
	    	showMsg(xhr.responseText, null, "error", "lg");
	    }
	});
}

function showMsg(msg, titulo, tipo, largura){
	if(titulo == null || titulo == undefined){
		titulo = "Mensagem";
	}
	if(tipo == null || tipo == undefined){
		tipo = 'type-default';
	}else{
		switch(tipo){
			case "padrao": tipo = 'type-default';
			break;
			case "informacao": tipo = 'type-info';
			break;
			case "primario": tipo = 'type-primary';
			break;
			case "sucesso": tipo = 'type-success';
			break;
			case "atencao": tipo = 'type-warning';
			break;
			case "erro": tipo = 'type-danger';
			break;
			default: tipo = 'type-default';
		}
	}
	if(largura == undefined || largura == null){
		largura = '';
	}
	BootstrapDialog.show({
		title: titulo,
		message: msg,
		type: tipo,
		width: largura,
	    draggable: true,
	    buttons: [{
	        icon: 'glyphicon glyphicon-check',       
	        label: 'OK',
	        cssClass: 'btn-primary', 
	        autospin: false,
	        action: function(dialogRef){    
	            dialogRef.close();
	        }
	    }]
	});
}

function showAguarde(){
	var dialog = new BootstrapDialog({
		title: "Aguarde...",
		message: "<div style='margin:0 auto;text-align: center; width: 20em;'><button  class='btn btn-default  btn-carregando'></button></div>",
		draggable: true,
		closable: false
    });
    dialog.realize();
    dialog.open();
    return dialog;
}

function showModal(texto , titulo, rodape, largura, aposMostrar, aposEsconder){
	
	if(texto == undefined || texto == null){
		texto = "Mensagem Modal";
	}
	if(titulo == undefined || titulo == null){
		titulo = "Mensagem";
	}
	if(rodape == undefined || rodape == null){
		rodape = '';
	}
	if(largura == undefined || largura == null){
		largura = '';
	}
	if(aposMostrar == undefined || aposMostrar == null){
		aposMostrar = '';
	}
	if(aposEsconder == undefined || aposEsconder == null){
		return false;
	}
	
	var modal = new  BootstrapDialog({
		title: titulo,
		message: texto,
		width: largura,
		footer: rodape,
		onshow: aposMostrar,
		onhide: aposEsconder,
		draggable: true,
		closable:false
	 });
	modal.realize();
	modal.open();
	return modal;
}

function limparAlerts(){
	$(" .alert").slideUp("500");
}

function ajaxPost(elementoTela, url, parametros, msgAguarde, idCombo, callbacksCombo, callbacksComplete){
	limparAlerts();
	var msgPadrao= "<div style='margin:0 auto;text-align: center; width: 20em;'><button class='btn btn-default  btn-carregando noLoading'></button></div>";
//	var msgPadrao= "<div class='carregando text-center '></div>";
	if(msgAguarde == null || msgAguarde == undefined){
		msgAguarde = msgPadrao;
	}
	if(parametros == null || parametros == undefined){
		parametros = "";
	}
	if(elementoTela != null && elementoTela != undefined){
		$(elementoTela).slideUp("1000",function(){
			$(elementoTela).html(msgAguarde);
			$(elementoTela).slideDown("500", function(){
			    $.post(url, parametros,
			        function( data ) {
			    	$(elementoTela).slideUp("500", function(){
			           $(elementoTela).html(data);
			           if(callbacksComplete != null && callbacksComplete != undefined){
		        		   listCallbacks(callbacksComplete);
		        	   }
		        	   if((idCombo != null && idCombo != undefined) && (callbacksCombo != null && callbacksCombo != undefined)){
		        		   setCombo(idCombo, callbacksCombo);
		        	   }
			           $(elementoTela).slideDown("1000");
			    	});
				 });
			});
		});
	}
	
	function setCombo(idCombo, callbacks){
		$(idCombo).select2().on("change", function(e) {
		  	listCallbacks(callbacks);
		});
	}
	function listCallbacks(callbacks){
		for(var i = 0; i < callbacks.length;i++){
	  		callbacks[i]();
	  	}
	}

}

//$(".datepicker").mask("99/99/9999");
//
//$(".data").mask("99/99/9999");
//
//$(".data").change(
//		function (event) {
//			var obj = event.target;
//			var data = obj.value;
//			if (data != '') {
//				var dia = data.substring(0, 2);
//				var mes = data.substring(3, 5);
//				var ano = data.substring(6, 10);
//				// Criando um objeto Date usando os valores ano, mes e dia.
//				var novaData = new Date(ano, (mes - 1), dia);
//				var mesmoDia = parseInt(dia, 10) == parseInt(novaData.getDate());
//				var mesmoMes = parseInt(mes, 10) == parseInt(novaData.getMonth()) + 1;
//				var mesmoAno = parseInt(ano) == parseInt(novaData.getFullYear());
//
//				if (!((mesmoDia) && (mesmoMes) && (mesmoAno))) {
//					showMsg(data_informada_invalida, null, "primario");
//					obj.value = "";
//					obj.focus();
//					return false;
//				}
//				return true;
//			}
//		}
//
//);
//
//$('.datepicker').datepicker({
//	format: "dd/mm/yyyy",
//	autoclose: true,
//	todayHighlight: true,
//	forceParse: false,
//});
//
//$(".hora").mask("99:99");
//
//$(".hora").change(
//		function (event) {
//			var obj = event.target;
//			var hora = obj.value;
//			if (hora != '') {
//				var isHorasValida = true;
//				var horas = hora.substring(0, 2);
//				var minutos = hora.substring(3, 5);
//				// Criando um objeto Date usando os valores ano, mes e dia.
//				if(horas != ''){
//					horas =  parseInt(horas);
//					if(horas > 23){
//						isHorasValida = false;
//					}
//				}
//				if(minutos != ''){
//					minutos =  parseInt(minutos);
//					if(minutos > 59){
//						isHorasValida = false;
//					}
//					
//				}
//				if (!isHorasValida) {
//					showMsg(horas_informada_invalida, null,"primario");
//					obj.value = "";
//					obj.focus();
//					return isHorasValida;
//				}
//				return isHorasValida;
//			}
//		}
//
//);
//
//$('.clockpicker').clockpicker({
//    placement: 'top',
//    align: 'left',
//    donetext: 'button',
//    autoclose: 'true',
//    vibrate: 'true'
//});
//
//$(".cpf").mask("999.999.999-99");
//
//$(".cpf").change(
//		function(event) {
//		 CPF = $(this).val();
//	        if(!CPF){ return false;}
//	        erro  = new String;
//	        cpfv  = CPF;
//	        if(cpfv.length == 14 || cpfv.length == 11){
//	            cpfv = cpfv.replace('.', '');
//	            cpfv = cpfv.replace('.', '');
//	            cpfv = cpfv.replace('-', '');
//	  
//	            var nonNumbers = /\D/;
//	    
//	            if(nonNumbers.test(cpfv)){
//	                erro = verificacao_cpf_apenas_numero;
//	            }else{
//	                if (cpfv == "00000000000" ||
//	                    cpfv == "11111111111" ||
//	                    cpfv == "22222222222" ||
//	                    cpfv == "33333333333" ||
//	                    cpfv == "44444444444" ||
//	                    cpfv == "55555555555" ||
//	                    cpfv == "66666666666" ||
//	                    cpfv == "77777777777" ||
//	                    cpfv == "88888888888" ||
//	                    cpfv == "99999999999") {
//	                            
//	                    erro = numero_cpf_invalido;
//	                }
//	                var a = [];
//	                var b = new Number;
//	                var c = 11;
//	  
//	                for(i=0; i<11; i++){
//	                    a[i] = cpfv.charAt(i);
//	                    if (i < 9) b += (a[i] * --c);
//	                }
//	                if((x = b % 11) < 2){
//	                    a[9] = 0
//	                }else{
//	                    a[9] = 11-x
//	                }
//	                b = 0;
//	                c = 11;
//	                for (y=0; y<10; y++) b += (a[y] * c--);
//	    
//	                if((x = b % 11) < 2){
//	                    a[10] = 0;
//	                }else{
//	                    a[10] = 11-x;
//	                }
//	                if((cpfv.charAt(9) != a[9]) || (cpfv.charAt(10) != a[10])){
//	                	 erro = numero_cpf_invalido;
//	                }
//	            }
//	        }else{
//	            if(cpfv.length == 0){
//	                return false;
//	            }else{
//	            	 erro = numero_cpf_invalido;
//	            }
//	        }
//	        if (erro.length > 0){
//	            $(this).val('');
//	            showMsg(erro, null, "primario");
//	            setTimeout(function(){$(this).focus();},100);
//	            return false;
//	        }
//	        return $(this);
//	});
//
//$(".moedaReal").maskMoney({symbol:'R$ ', 
//	showSymbol:false, thousands:'.', decimal:',', symbolStay: false, allowNegative: true, affixesStay: false
//});
//$("a").not(".noLoading").click(function(){ 
//	showAguarde();
//});
