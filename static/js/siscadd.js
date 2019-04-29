/*!
  * Sistema de Apoio às CADDs
  * Copyright 2018
  */

// para o form plano de estudos prévia
function addDisciplina(e){

  // *************************//
  // Declaração das Variáveis //
  // *************************//

  var horaInicioTemp;               // Variável temporária;
  var horaTerminoTemp;              // Variável temporária;
  var i;                            // Variável temporária;
  var codigoDisciplina;             // Código da Disciplina que vem escrito nos detalhes completos da disciplina;
  var horaInicio;                   // Hora de Início da aula  que vem escrito nos detalhes completos da disciplina;
  var horaTermino;                  // Hora de Término da aula  que vem escrito nos detalhes completos da disciplina;
  var idDisciplinaCardBody;         // ID do CardBody que define as três primeiras letras iniciais do dia da semana
                                    // e é utilizada para definir para qual coluna a disciplina será enviada;
  var idDisciplinaTemp
  var horaInicioTextoPlanoSemPontos;// Representa a hora de início da aula de forma concatenada e sem os dois pontos;
  var tempoDeAulaEmMinutos;         // Conversão do tempo total de aula para minutos;
  var celulaDestino;                // Célula de Destino da disciplina;
  var disciplinaDivObject;          // DIV com o a disciplina;
  var countTemposAula;              //
  var idDisciplina

  // ************************//
  // Definição das Variáveis //
  // ************************//

  codigoDisciplina = e.target.parentNode.id;
  horaInicioTemp  = e.target.parentNode.getElementsByClassName("disciplina-previa-horario-inicio");
  horaTerminoTemp = e.target.parentNode.getElementsByClassName("disciplina-previa-horario-termino");
  idDisciplinaCardBody = e.target.parentNode.parentNode.getAttribute("id");
  idDisciplinaTemp = e.target.parentNode.getElementsByClassName("disciplina-previa-id");

  horaInicio = horaInicioTemp[0].innerHTML;

  if (horaInicio.length == 5) {
    horaInicio = "";
  }
  horaTermino = horaTerminoTemp[0].innerHTML;
  if (horaTermino.length == 5) {
    horaTermino = "";
  }
  idDisciplina = idDisciplinaTemp[0].innerHTML;

  celulaDestino = "tb_" + String(idDisciplinaCardBody);

  disciplinaDivObject = document.getElementById(codigoDisciplina);

  if(!horaInicio){
    prepararDisciplina(disciplinaDivObject, celulaDestino);
    moverDisciplina(document.getElementById(codigoDisciplina), "tb_out");
    return 0;
  }

  horaInicioTextoPlanoSemPontos = horaInicio.split(":");
  horaInicioTextoPlanoSemPontos = horaInicioTextoPlanoSemPontos[0]+horaInicioTextoPlanoSemPontos[1];
  horaInicioTextoPlanoSemPontosCopia = horaInicioTextoPlanoSemPontos;

  //tempoDeAulaEmMinutos = Number(horaToMinutos(horaTermino)) - Number(horaToMinutos(horaInicio));


  //countTemposAula = (Number(tempoDeAulaEmMinutos)/Number(50));
  //countTemposAula = Math.round(countTemposAula);

  prepararDisciplina(disciplinaDivObject, celulaDestino);
  moverDisciplina(disciplinaDivObject, celulaDestino);
  document.getElementById('discip').value += ((document.getElementById('discip').value!="") ? "_" : "") + idDisciplina;

}

function adicionarAoCalendario(disciplinaDivObject, celulaDestino) {
    var colunaSegunda = document.getElementById("tb_seg");
    var colunaTerca = document.getElementById("tb_ter");
    var colunaQuarta = document.getElementById("tb_qua");
    var colunaQuinta = document.getElementById("tb_qui");
    var colunaSexta = document.getElementById("tb_sex");
    var colunaTemp;

    if(celulaDestino == "tb_seg") {
        colunaTemp = colunaSegunda;
    }
    if(celulaDestino == "tb_ter") {
        colunaTemp = colunaTerca;
    }
    if(celulaDestino == "tb_qua") {
        colunaTemp = colunaQuarta;
    }
    if(celulaDestino == "tb_qui") {
        colunaTemp = colunaQuinta;
    }
    if(celulaDestino == "tb_sex") {
        colunaTemp = colunaSexta;
    }

    colunaTemp = colunaTemp.children;
    colunaTemp = Array.from(colunaTemp);

    colunaTemp.push(disciplinaDivObject);
    colunaTemp.sort(function(a, b){
        var x = a.getElementsByClassName("disciplina-previa-horario-inicio");
        var y = b.getElementsByClassName("disciplina-previa-horario-inicio");

        x = x[0].innerHTML;
        y = y[0].innerHTML;

        x = x.split(":");
        x = x[0]+x[1];

        y = y.split(":");
        y = y[0]+y[1];

        if(Number(x) < Number(y)) {return -1;}
        if(Number(x) > Number(y)) {return 1;}
        return 0;
    });

    for (i = 0; i < colunaTemp.length; i++){
        moverDisciplina(colunaTemp[i],celulaDestino);
    }
}



/*
function removeDisciplina(e){
  var idDisciplina = e.target.parentNode.id;
  var idCardBody = e.target.parentNode.parentNode.id;
  idCardBody = idCardBody.slice(0,3);
  alert("idCardBody: " + document.getElementById(idCardBody));
  alert("idDisciplina: " + document.getElementById(idDisciplina));
  document.getElementById(idCardBody).appendChild(
  document.getElementById(idDisciplina));
}
*/



/* function verificarConflito(celulaDestino, idDisciplinaCardBody, countTemposAula){
  var CelulaDestino = document.getElementById(celulaDestino);
  // alert("Cheguei em 01");

  // alert("countTemposAula: " + countTemposAula);
  // alert("disciplinaDivObject: " + disciplinaDivObject.id);

  var idDisciplinaCardBody;

  if(!verificarExistencia(celulaDestino)){
    return 1;
  }
  else{
    NextCellToVerify = celulaDestino.slice(3,7);
    NextCellToVerify = incrementarTempoEmHora(NextCellToVerify);

    var x = 0;

    x += CelulaDestino.innerHTML.length;
    if(x){
      return(1);
    }
    else{
      for (i = 0; i < countTemposAula - 1; i++) {
        CellToVerify = String(idDisciplinaCardBody) + String(NextCellToVerify);
        CellToVerify = document.getElementById(CellToVerify);
        x += CellToVerify.innerHTML.length;
        NextCellToVerify = incrementarTempoEmHora(NextCellToVerify);
      }
    }
    if(x){
      return(1);
    }
    else{
      return(0);
    }
  }
}
/*
function verificarExistencia(celulaDestino){
  if(document.getElementById(celulaDestino)){
    return 1;
  }
  else{
    return 0;
  }
}

function prepararTabela(disciplinaDivObject, celulaDestino, countTemposAula){

  var CelulaDestino;
  var idDisciplinaCardBody = disciplinaDivObject.parentNode.id;

  CelulaDestino = document.getElementById(celulaDestino);
  CelulaDestino.rowSpan = countTemposAula;
  CelulaDestino.style.backgroundColor = "#CFC";
  CelulaDestino.style.border = "1px solid green";

  NextCellToDelete = celulaDestino.slice(3,7);
  NextCellToDelete = incrementarTempoEmHora(NextCellToDelete);

  for (i = 0; i < countTemposAula - 1; i++) {
    CellToDelete = String(idDisciplinaCardBody) + String(NextCellToDelete);
    CellToDelete = document.getElementById(CellToDelete);
    CellToDelete.parentNode.removeChild(CellToDelete);
    NextCellToDelete = incrementarTempoEmHora(NextCellToDelete);
  }
}

/*function incrementarTempoEmHora(hhmm){

  /*************************/
  /*Definição do Incremento*/
  /*************************/
  /*var incremento;

  switch(hhmm) {
    case "0850":
      incremento = Number(65);
      break;
    case "1430":
      incremento = Number(65);
      break;
    case "1820":
      incremento = Number(50);
      break;
    case "1910":
      incremento = Number(50);
      break;
    case "2000":
      incremento = Number(60);
      break;
    case "2100":
      incremento = Number(50);
      break;
    default:
      incremento = Number(55);
  }
  /***********************/
  /*
  b = hhmm.slice(0,2);
  c = hhmm.slice(2,4);
  b = Number(b);
  c = Number(c);

  c += incremento;
  if(c >= 60){
    b += Number(1);
    c -= Number(60);
  }
  b = String(b);
  c = String(c);
  if(c.length == 1){
    c = c + "0";
  }
  return (String(b)+(c));
}
*/
function prepararDisciplina(disciplinaDivObject, celulaDestino){
  disciplinaDivObject.firstElementChild.classList.remove("col-11");
  disciplinaDivObject.firstElementChild.classList.add("col-12");
}
function horaToMinutos(hhmm){
  x = hhmm.split(":");
  y = x[0];
  z = x[1];
  y*=60;
  return  Number(y) + Number(z);
}

function moverDisciplina(disciplinaDivObject, celulaDestino){
  document.getElementById(celulaDestino).appendChild(disciplinaDivObject);
}

/*function golf(disciplinaDivObject, celulaDestino) {
    day = celulaDestino.substr(3,3);
    var x = disciplinaDivObject.getElementsByClassName("disciplina-previa-horario-inicio");
    var y = disciplinaDivObject.getElementsByClassName("disciplina-previa-horario-termino");
    x = x[0].innerHTML;
    x = x.split(":");
    x = x[0] + x[1];


    y = y[0].innerHTML;
    y = y.split(":");
    y = y[0] + y[1];

    z = Number(y)-Number(x);

    var coluna = document.getElementById("tb_" + day);
    var itens = coluna.childNodes;
    if (itens.length === 0) {
        disciplinaDivObject.style.marginTop = (x - 700)/2 + "px";
    }
    else {
        var lastitem = itens.length - 1;
        itens[lastitem].style.marginBottom = z + "px";
        alert(z + "px");
    }


}*/

/*
function ajustarHorario(horaInicio, celulaDestino){
  horaInicio = horaToMinutos(horaInicio);
  if (horaInicio < 475) {
    j = celulaDestino.slice(0,3);
    k = celulaDestino.slice(3,7);
    k = "0700";
    celulaDestino = j + k;
    return celulaDestino;
  } else if (horaInicio < 530) {
    j = celulaDestino.slice(0,3);
    k = celulaDestino.slice(3,7);
    k = "0755";
    celulaDestino = j + k;
    return celulaDestino;
  } else if (horaInicio < 595) {
    j = celulaDestino.slice(0,3);
    k = celulaDestino.slice(3,7);
    k = "0850";
    celulaDestino = j + k;
    return celulaDestino;
  } else if (horaInicio < 650) {
    j = celulaDestino.slice(0,3);
    k = celulaDestino.slice(3,7);
    k = "0955";
    celulaDestino = j + k;
    return celulaDestino;
  } else if (horaInicio < 705) {
    j = celulaDestino.slice(0,3);
    k = celulaDestino.slice(3,7);
    k = "1050";
    celulaDestino = j + k;
    return celulaDestino;
  } else if (horaInicio < 760) {
    j = celulaDestino.slice(0,3);
    k = celulaDestino.slice(3,7);
    k = "1145";
    celulaDestino = j + k;
    return celulaDestino;
  } else if (horaInicio < 815) {
    j = celulaDestino.slice(0,3);
    k = celulaDestino.slice(3,7);
    k = "1240";
    celulaDestino = j + k;
    return celulaDestino;
  } else if (horaInicio < 870) {
    j = celulaDestino.slice(0,3);
    k = celulaDestino.slice(3,7);
    k = "1335";
    celulaDestino = j + k;
    return celulaDestino;
  } else if (horaInicio < 935) {
    j = celulaDestino.slice(0,3);
    k = celulaDestino.slice(3,7);
    k = "1430";
    celulaDestino = j + k;
    return celulaDestino;
  } else if (horaInicio < 990) {
    j = celulaDestino.slice(0,3);
    k = celulaDestino.slice(3,7);
    k = "1535";
    celulaDestino = j + k;
    return celulaDestino;
  } else if (horaInicio < 1045) {
    j = celulaDestino.slice(0,3);
    k = celulaDestino.slice(3,7);
    k = "1630";
    celulaDestino = j + k;
    return celulaDestino;
  } else if (horaInicio < 1100) {
    j = celulaDestino.slice(0,3);
    k = celulaDestino.slice(3,7);
    k = "1725";
    return celulaDestino = j + k;
  } else if (horaInicio < 1150) {
    j = celulaDestino.slice(0,3);
    k = celulaDestino.slice(3,7);
    k = "1820";
    celulaDestino = j + k;
    return celulaDestino;
  } else if (horaInicio < 1200) {
    j = celulaDestino.slice(0,3);
    k = celulaDestino.slice(3,7);
    k = "1910";
    celulaDestino = j + k;
    return celulaDestino;
  } else if (horaInicio < 1260) {
    j = celulaDestino.slice(0,3);
    k = celulaDestino.slice(3,7);
    k = "2000";
    celulaDestino = j + k;
    return celulaDestino;
  } else if (horaInicio < 1310) {
    j = celulaDestino.slice(0,3);
    k = celulaDestino.slice(3,7);
    k = "2100";
    celulaDestino = j + k;
    return celulaDestino;
  } else if (horaInicio < 1350) {
    j = celulaDestino.slice(0,3);
    k = celulaDestino.slice(3,7);
    k = "2150";
    celulaDestino = j + k;
    return celulaDestino;
  }
}
*/

/*function exibirDisciplinasSemHorario() {
  var x = document.getElementById('outros');
  if (x.style.display === 'none') {
    x.style.display = 'block';
    } else {
    x.style.display = 'none';
  }
}*/

/*function prepararDisciplinaSemHorario(disciplinaDivObject){
  disciplinaDivObject.classList.remove("disciplina-previa");
  disciplinaDivObject.classList.add("disciplina-previa-sem-horario");
}*/