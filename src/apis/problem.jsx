import Apis from './Api';

export const getProblem = async (roomId) => {
  try {
    const response = await Apis.get(`/rooms/${roomId}`);
    console.log(response.data)
    return response.data.data;
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
