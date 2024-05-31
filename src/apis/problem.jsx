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
