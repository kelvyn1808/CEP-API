const inputCep = document.querySelector("#cep");
const inputEstado = document.querySelector("#estado");
const inputBairro = document.querySelector("#bairro");
const inputLogradouro = document.querySelector("#logradouro");
const inputCidade = document.querySelector("#cidade");
const inputNumero = document.querySelector("#numero");
const inputComplemento = document.querySelector("#complemento");
const btnBuscar = document.querySelector("#btn-buscar");

async function preencherForm() {
    inputBairro.value = "";
    inputEstado.value = "";
    inputLogradouro.value = "";
    inputCidade.value = "";
    inputComplemento.value = "";
    inputNumero.value = "";

    let valeuInputCep = inputCep.value;
    try {
        let response = await fetch(
            `https://viacep.com.br/ws/${valeuInputCep}/json/`
        );
    let data = await response.json();

    if (data.erro == "true") {
        inputNumero.setAttribute("disabled", "");
        inputComplemento.setAttribute("disabled", "");
        alert("CEP inválido");
        return;  
    }

    inputBairro.value = data.bairro;
    inputEstado.value = data.estado;
    inputLogradouro.value = data.logradouro;
    inputCidade.value = data.localidade;
    
    inputNumero.removeAttribute("disabled");
    inputComplemento.removeAttribute("disabled");
    } catch (error) {
        inputNumero.setAttribute("disabled", "");
        inputComplemento.setAttribute("disabled", "");
        alert("Erro ao buscar o CEP");
    }
}

btnBuscar.addEventListener("click", preencherForm);

function mask() {
    let valeuInputCep = inputCep.value;
    let lengthInputCep = valeuInputCep.length;

    if (lengthInputCep == 5) {
        inputCep.value += "-";
    }
}

inputCep.addEventListener("keypress", mask);