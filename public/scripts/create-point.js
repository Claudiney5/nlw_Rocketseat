

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( (res) => { return res.json() })
        .then( states => {
            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
    })

}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`


    citySelect.innerHTML = "<option value>Selecione a Cidade</option> "
    citySelect.disabled = true
    fetch(url)
        .then(res => res.json())
        .then( cities => {
            for ( const city of cities ) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
        })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// Itens de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const Item of itemsToCollect) {
    Item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    //adiconar e remover uma classe com JS
    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id

    //verificar se existem itens seleciondos, se sim
    // pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex(item => item == itemId) // true ou false

    //se já estiver selecionado (>=0), tirar a seleção
    if(alreadySelected >= 0) {
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        // se não estiver selecionmado, adicionar a seleção
        selectedItems.push(itemId)

    }

    //atualizar o campo escondido com os itens selecionados
          // document.querySelector("input[name=items]") -> lá em cima
    collectedItems.value = selectedItems
} 

