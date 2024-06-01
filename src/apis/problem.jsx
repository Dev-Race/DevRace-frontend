import Apis from './Api';

export const getProblem = async (roomId) => {
  const accessToken = sessionStorage.getItem('accessToken');

  try {
    const response = await Apis.get(`/rooms/${roomId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSolvedCount = async () => {
  const accessToken = sessionStorage.getItem('accessToken');

  try {
    const response = await Apis.get('/users/solved-count', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data.data.solvedCount);
    sessionStorage.setItem('solvedCount', response.data.data.solvedCount);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProblemStatus = async (roomId) => {
  const accessToken = sessionStorage.getItem('accessToken');

  try {
    const response = await Apis.get(`rooms/{roomId}/access-check`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};
