import Apis from './Api';

export const roomCheck = async (roomId) => {
  let res = await Apis.get(`/rooms/${roomId}/state-check`);
  return res.data.data;
};

export const leaveWaitRoom = async (roomId) => {
  let res = await Apis.put(`/rooms/${roomId}`);
  return res.data.data;
};

export const fetchPaginationRoomsData = async (
  page = 0,
  isPass = null,
  number = null,
) => {
  try {
    const url =
      `users/rooms?page=${page}` +
      (isPass !== null ? `&isPass=${isPass}` : '') +
      (number !== null ? `&number=${number}` : '');

    const response = await Apis.get(url);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
