import Apis from './Api';

export const roomCheck = async (roomId) => {
  let res = await Apis.get(`/rooms/${roomId}/state-check`);
  return res.data.data;
};

export const leaveWaitRoom = async (roomId) => {
  let res = await Apis.put(`/rooms/${roomId}`);
  return res.data.data;
};

export const fetchAllRoomsData = async () => {
  let allData = [];
  let page = 0;
  let totalPages = 1;

  while (page < totalPages) {
    try {
      const response = await Apis.get(`users/rooms?page=${page}`);
      const data = response.data.data;

      allData = allData.concat(data.content);
      totalPages = data.totalPages;
      page += 1;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return allData;
};
