
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res =>  res.json() ) // res = response
    .then( states => {

        for (const state of states) {

            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>` // Busca dentro do arquivo HTML o Estado desejado e exibe seu nome
            
        }
        
    }) 
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value // Determina uma constante para armazenar ID da UF

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true 
    
    fetch(url)
    .then( res =>  res.json() ) // res = response
    .then( cities => {

        for (const city of cities) {

            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>` // Busca dentro do arquivo HTML a Cidade desejada e exibe seu nome
            
        }

        citySelect.disabled = false 
      // Por definição prévia, este campo estava desabilitado. Agora, ao definir o estado, adquire-se o ID do mesmo para buscar as cidades pertencentes a ele [Linha 35]  

    }) 
    
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// Itens de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {

    const itemLi = event.target
    
    // Adicionar ou remover uma classe com JS
    itemLi.classList.toggle("selected")
    
    const itemId = itemLi.dataset.id

    

    // Verificar se existem itens selecionados, caso sim, pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId // Isso seá true ou false
        return itemFound
    })

    // Se já estiver selecionado

    if ( alreadySelected >= 0 ) {

        // Retirar da seleção

        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
        
    } else { // Se não estiver selecionado. adicionar à seleção
        selectedItems.push(itemId)
    }
    
    // Atualizar o campo escondido com os itens selecionados

    collectedItems.value = selectedItems
    
}