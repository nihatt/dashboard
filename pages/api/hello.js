const BASE_URL = 'http://192.168.1.50:5000/api';

async function sendRequest(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  console.log(url)
  const response = await fetch(url, options);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }

  const data = await response.json();
  return data;
}

const api = {
    getUsers: async () => {
        const path = '/users';
        const users = await sendRequest(path);
        return users;
      },

  createUser: async (username,password) => {
    const path = '/register';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"username":username,"password":password,"isActive":true})
    };

    const createdUser = await sendRequest(path, options);

    return createdUser;
  },
  getRecords: async () => {
    const path = '/records';
    const records = await sendRequest(path);
    return records;
  },
  createRecord: async (userid,text,phone) => {
    const path = '/insertRecord';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userid,text,phone)
    };

    const createdRecord = await sendRequest(path, options);

    return createdRecord;
  },
  deleteRecord: async (idToDelete) => {
    const path = '/deleteRecord';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(idToDelete)
    };

    const deleteRecord = await sendRequest(path, options);

    return deleteRecord;
  },
  deleteUser: async (id) => {
    const path = '/deleteUser/'+id;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      
    };

    const deleteRecord = await sendRequest(path, options);

    return deleteRecord;
  },
  updateUser: async (id,val) => {
    const path = '/users/'+id+"/"+val;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
     
    };

    const updateUser = await sendRequest(path, options);

    return updateUser;
  },
};

export default api;