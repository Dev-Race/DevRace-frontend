import Apis from './Api';

export const getProblem = async (roomId) => {
  try {
    const response = await Apis.get(`/rooms/${roomId}`);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSolvedCount = async () => {
  try {
    const response = await Apis.get('/users/solved-count');
    sessionStorage.setItem('solvedCount', response.data.data.solvedCount);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProblemStatus = async (roomId) => {
  try {
    const response = await Apis.get(`rooms/${roomId}/access-check`);
    return response;
  } catch (error) {
    console.error(error);
  }
};
