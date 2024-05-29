import axios from 'axios';

const compilerApi = axios.create({
  baseURL: process.env.REACT_APP_RAPID_API_URL,
});

export const compileCode = async (language, sourceCode) => {
  const response = await compilerApi.post;
};
