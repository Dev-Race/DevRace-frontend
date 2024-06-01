import Apis from './Api';

export const getProblem = async (roomId) => {
  try {
    const response = await Apis.get(`/rooms/${roomId}`);
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSolvedCount = async () => {
  try {
    const response = await Apis.get('/users/solved-count');
    console.log(response.data.data);
    sessionStorage.setItem('solvedCount', response.data.data.solvedCount);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProblemStatus = async (roomId) => {
  try {
    const response = await Apis.get(`rooms/${roomId}/access-check`);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};
