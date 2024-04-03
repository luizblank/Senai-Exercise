var nomeGlobal;
var mensagemGlobal;
var dateGlobal;

var darkMode = true;

function conferirMensagemWhatsApp() {
    var info = document.getElementById("info");
    var infobutton = document.getElementById("info-button");

    var nome = document.getElementById("nome").value;
    var mensagem = document.getElementById("mensagem").value;
    var date = new Date().toLocaleString();

    nomeGlobal = nome;
    mensagemGlobal = mensagem;
    dateGlobal = date;

    textGlobal = `${nomeGlobal} / ${mensagemGlobal} / ${dateGlobal}`

    document.getElementById("confNome").textContent = nome;
    document.getElementById("confMsg").textContent = mensagem;
    document.getElementById("confDate").textContent = date;

    info.style.display = 'block'
    infobutton.style.display = 'block'
}

function enviar() {
    var numeroTelefone = "5541999999999";

    var linkWhatsApp = `https://wa.me/${numeroTelefone}?text=${textGlobal}`

    window.open(linkWhatsApp);
}

function toggleDarkMode() {
    darkMode = !darkMode
    if (darkMode) {
        document.body.style.backgroundColor = 'white';
        return
    }

    document.body.style.backgroundColor = '#4c4c4c';
}