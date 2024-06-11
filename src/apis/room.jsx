import Apis from './Api';

export const roomCheck = async (roomId) => {
  let res = await Apis.get(`/rooms/${roomId}/state-check`);
  return res.data.data;
};

export const leaveWaitRoom = async (roomId) => {
  let res = await Apis.put(`/rooms/${roomId}`);
  return res.data.data;
};

export const fetchRoomsData = async () => {
  try {
    const response = await Apis.get('users/rooms');
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
