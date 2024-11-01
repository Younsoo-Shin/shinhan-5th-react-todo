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

export { fetchTodoList };
