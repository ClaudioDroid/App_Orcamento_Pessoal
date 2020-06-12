 /* -- -- -- -- Classes -- -- -- -- */
class Despesa{
  constructor(data, tipo, descricao, valor){
    this.data = data;
    this.tipo = tipo;
    this.descricao = descricao;
    this.valor = valor;
  }
}

class Bd{
  
  constructor(){
    let id = localStorage.getItem('id');

    if (id == null){
      localStorage.setItem('id', 0); //definindo CHAVE e VALOR no Local Storage.
    }
  }

  getProximoId(){ // Recupera um valor e armazena numa variável
    let proximoId = localStorage.getItem('id');
    return parseInt(proximoId) +1;
  }

  gravar(d){ // Gravando itens no localStorage do browser
    let id = this.getProximoId();
    
    localStorage.setItem(id, JSON.stringify(d));

    localStorage.setItem('id', id);
  }
}

let bd = new Bd();

 /* -- -- -- -- Funções -- -- -- -- */
function cadastrarDespesa(){
  let data = document.getElementById('data');
  let tipo = document.getElementById('tipo');
  let descricao = document.getElementById('descricao');
  let valor = document.getElementById('valor');

  let despesa = new Despesa(
    data.value,
    tipo.value,
    descricao.value,
    valor.value
  )
  bd.gravar(despesa);

}




















