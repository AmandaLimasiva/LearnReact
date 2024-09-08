import { useEffect, useState, useRef } from "react";
import "./style.css";
import Trash from "../../assets/trash.svg";
import api from "../../services/api"

//React Hooks//
//UseState
//useEffect
//useRef

function Home() {

  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()
  
//Função - Listar Usuários cadastrados
  async function getUsers(){
    const usersFromApi = await api.get('/users')
    setUsers(usersFromApi.data)
    //console.log(users)
  }

//Função - Criar Usuários novos
    async function createUsers(){
    await api.post('/users', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email:inputEmail.current.value
    })

    getUsers()
  }

  //Função - Editar Usuários novos
  /*
    async function editUsers(){
      await api.put('/users', {

      })

    }
  */

  //Função - Deletar Usuários novos
  async function deleteUsers(id){
    await api.delete(`/users/${id}`) 

    getUsers()
  }



  useEffect(() => {
    getUsers()
  }, [])



  return (
    <div className="container">
      <form>
        <h1>Cadastro do Usuário</h1>
        <input placeholder="Nome Completo" name="nome" type="text" ref={inputName}/>
        <input placeholder="Idade" name="idade" type="number"  ref={inputAge}/>
        <input placeholder="E-mail" name="e-mail" type="email" ref={inputEmail}/>
        <button type="button" onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="cards"> 
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age} </span></p>
            <p>e-mail: <span>{user.email}</span></p>
          </div>
          <button onClick={ () => deleteUsers(user.id) } >
            <img src={Trash} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
