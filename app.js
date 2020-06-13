 /* -- -- -- -- Classes -- -- -- -- */
class Despesa{
  constructor(data, tipo, descricao, valor){
    this.data = data;
    this.tipo = tipo;
    this.descricao = descricao;
    this.valor = valor;
  }

  validaCampos(){
    for(let i in this){ // Possível bug na checagem dos itens preenchidos 
      if(this[i] == undefined || this[i] == null || this[i] == ''){
        return false;
      }else{
        return true;
      }
    }
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

  recuperarTodosRegistros(){
    console.log('Estamos chegando aqui...');
    let i;
    let items = Array();
    for(i=0; i<=localStorage.length; i++){
      let item = JSON.parse( localStorage.getItem(i) );
      if(item == null){
        continue
      }
      items.push(item);
    }
    return items;
    
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
  
  if (despesa.validaCampos()){
    bd.gravar(despesa);

    document.getElementById('exampleModalLabel').innerHTML = 'Cadastrado com sucesso'
    document.getElementById('modal-bodyId').innerHTML = 'Os dados foram cadastrado com sucesso!'

    // document.getElementById('modal-headerId').classList.remove('text-danger')
    // document.getElementById('btnVoltar').classList.remove('btn-danger');
    document.getElementById('modal-headerId').className = 'modal-header text-success';
    document.getElementById('btnVoltar').className = 'btn-success';

    $('#registraDespesa').modal('show');
    console.log('Dados válidos!');
  }else{
    document.getElementById('exampleModalLabel').innerHTML = 'Erro no cadastro'
    document.getElementById('modal-bodyId').innerHTML = 'Existem campos que não foram preenchidos!'

    document.getElementById('modal-headerId').className = 'modal-header text-danger';
    document.getElementById('btnVoltar').className = 'btn-danger';

    // document.getElementById('modal-headerId').classList.remove('text-success')
    // document.getElementById('btnVoltar').classList.remove('btn-success');
    // document.getElementById('modal-headerId').classList.add('text-danger')
    // document.getElementById('btnVoltar').classList.add('btn-danger');
    $('#registraDespesa').modal('show');
  }
}

function carregaListaDespesas(){
  let items = Array();

  items = bd.recuperarTodosRegistros();

  let listaItens = document.getElementById('listaItens');

  items.forEach( x => {
    
    // Criando as linhas
    let linha = listaItens.insertRow();
    
    // Criando as colunas
    linha.insertCell(0).innerHTML = x.data;
    //Ajustando o tipo 
    switch(x.tipo){
      case '1': x.tipo = 'Alimentação';
        break;
      case '2': x.tipo = 'Educação';
        break;
      case '3': x.tipo = 'Lazer';
        break;
      case '4': x.tipo = 'Saúde';
        break;
      case '5': x.tipo = 'Transporte';
        break;
    }
    linha.insertCell(1).innerHTML = x.tipo;
    linha.insertCell(2).innerHTML = x.descricao; 
    linha.insertCell(3).innerHTML = x.valor; 
     

  });

}


{/* <tbody id="listaItens">
            <tr>
              <th scope="row">04/02/2020</th>
              <td>Saúde</td>
              <td>Dentista</td>
              <td>90.00</td>
            </tr> */}






















