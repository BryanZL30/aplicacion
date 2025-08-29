let idioma = 'es';
let indiceActual = 0;

const unidadesES = ['','uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
const decenasES = ['', 'diez', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
const especialesES = {
    10: 'diez', 11: 'once', 12: 'doce', 13: 'trece', 14: 'catorce',
    15: 'quince', 16: 'dieciséis', 17: 'diecisiete', 18: 'dieciocho', 19: 'diecinueve',
    20: 'veinte'
};

const unidadesEN = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const decenasEN = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const especialesEN = {
    10: 'ten', 11: 'eleven', 12: 'twelve', 13: 'thirteen', 14: 'fourteen',
    15: 'fifteen', 16: 'sixteen', 17: 'seventeen', 18: 'eighteen', 19: 'nineteen'
};

function generarNombreES(n) {
    if (n === 100) return 'cien';
    if (especialesES[n]) return especialesES[n];
    const decena = Math.floor(n / 10);
    const unidad = n % 10;

    if (n < 30 && n > 20) {
    return 'veinti' + unidadesES[unidad];
}

    if (unidad === 0) return decenasES[decena];
    return `${decenasES[decena]}  ${unidadesES[unidad]}`;
}

function generarNombreEN(n) {
    if (n === 100) return 'one hundred';
    if (especialesEN[n]) return especialesEN[n];
    const decena = Math.floor(n / 10);
    const unidad = n % 10;
    if (unidad === 0) return decenasEN[decena];
    return `${decenasEN[decena]} ${unidadesEN[unidad]}`;
}

const numeros = [];
for (let i = 1; i <= 100; i++) {
    numeros.push({
    valor: i,
    es: generarNombreES(i),
    en: generarNombreEN(i)
    });
}

function seleccionarIdioma(lang) {
    idioma = lang;
    mostrarPantalla('aprendizaje');
    mostrarNumero();
}

function mostrarPantalla(id) {
    document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('activa'));
    document.getElementById(id).classList.add('activa');
}

function mostrarNumero() {
    const numero = numeros[indiceActual];
    const texto = idioma === 'es' ? numero.es : numero.en;
    document.getElementById('numero-texto').textContent = `${numero.valor} - ${texto}`;
}

function siguienteNumero() {
    indiceActual = (indiceActual + 1) % numeros.length;
    mostrarNumero();
}

function anteriorNumero() {
    indiceActual = (indiceActual - 1 + numeros.length) % numeros.length;
    mostrarNumero();
}

function reproducirNumero() {
    const texto = idioma === 'es' ? numeros[indiceActual].es : numeros[indiceActual].en;
    const voiceLang = idioma === 'es' ? 'es-ES' : 'en-US';
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = voiceLang;
    speechSynthesis.speak(utterance);
}