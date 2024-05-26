import Apis from './Api';

export const roomCheck = async (roomId) => {
    let res = await Apis.get(`/rooms/${roomId}/state-check`)
    return res.data.data;
}
