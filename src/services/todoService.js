import axios from 'axios';

const baseUrl = 'http://localhost:3000';
// Todo를 조회하는 함수
const fetchTodoList = async () => {
  const url = `${baseUrl}/todos`;
  try {
    const resp = await axios.get(url);
    const data = resp.data;

    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

// Todo를 등록하는 함수
const addTodo = async ({ text, color }) => {
  const url = `${baseUrl}/todos`;
  let authToken = sessionStorage.getItem('authToken');
  if (authToken) {
    authToken = JSON.parse(authToken);
  }
  try {
    const resp = await axios.post(
      url,
      { text, color },
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${authToken.token}`,
        },
      }
    );
    return resp.data;
  } catch (err) {
    console.error(err);
  }
};

export { fetchTodoList, addTodo };
