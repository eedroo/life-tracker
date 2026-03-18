let valorHoraInput = document.getElementById("valorHora")
let tempoElemento = document.getElementById("tempo")
let ganhosElemento = document.getElementById("ganhos")
let historicoElemento = document.getElementById("historico")

let startBtn = document.getElementById("startBtn")
let stopBtn = document.getElementById("stopBtn")

let segundos = 0
let intervalo = null

let sessoes = JSON.parse(localStorage.getItem("sessoes")) || []

function atualizarTela(){

segundos++

let horas = Math.floor(segundos / 3600)
let minutos = Math.floor((segundos % 3600) / 60)
let seg = segundos % 60

tempoElemento.textContent =
String(horas).padStart(2,'0') + ":" +
String(minutos).padStart(2,'0') + ":" +
String(seg).padStart(2,'0')

let valorHora = Number(valorHoraInput.value)

let horasTrabalhadas = segundos / 3600

let ganhos = valorHora * horasTrabalhadas

ganhosElemento.textContent = ganhos.toFixed(2)

}

function iniciar(){

if(intervalo !== null){
return
}

intervalo = setInterval(atualizarTela,1000)

}

function parar(){

clearInterval(intervalo)
intervalo = null

salvarSessao()

segundos = 0

tempoElemento.textContent = "00:00:00"
ganhosElemento.textContent = "0.00"

}

function salvarSessao(){

let valorHora = Number(valorHoraInput.value)

let horasTrabalhadas = segundos / 3600

let ganhos = valorHora * horasTrabalhadas

let data = new Date().toLocaleDateString()

let sessao = {
data:data,
tempo:tempoElemento.textContent,
ganhos:ganhos.toFixed(2)
}

sessoes.push(sessao)

localStorage.setItem("sessoes", JSON.stringify(sessoes))

mostrarHistorico()

}

function mostrarHistorico(){

historicoElemento.innerHTML = ""

sessoes.forEach(sessao => {

let li = document.createElement("li")

li.textContent =
sessao.data +
" | " +
sessao.tempo +
" | €" +
sessao.ganhos

historicoElemento.appendChild(li)

})

}

mostrarHistorico()

startBtn.onclick = iniciar
stopBtn.onclick = parar

let resetBtn = document.getElementById("resetBtn")

function limparHistorico(){
localStorage.removeItem("sessoes")
sessoes = []
mostrarHistorico()
}

resetBtn.onclick = limparHistorico