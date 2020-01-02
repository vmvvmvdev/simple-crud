const getUsers = async (page=1, limit=20)=> {

  const data = await fetch(`/api/user?page=${page}&limit=${limit}`, {
    method: 'get',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());
  console.log(data);
  return data;
}

const removeUser = async(id)=>{
  await fetch(`/api/user`, {
    method: 'delete',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({id})
  })

  return true;
}

const updateUser = async(userData)=>{
  await fetch(`/api/user`, {
    method: 'put',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({...userData})
  })

  return true;
}

const createUser = async(userData)=>{
  await fetch(`/api/user`, {
    method: 'post',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({...userData})
  })

  return true;
}

const API = {getUsers, removeUser, updateUser, createUser};

export default API;