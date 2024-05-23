import Apis from '../../apis/Api';

export const member = async (accessToken) => {
  let res;

  await Apis.get('/users', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      console.log(response);
      console.log(response.data.data);
      res = response.data.data;

      sessionStorage.setItem('imageUrl', response.data.data.imageUrl);
      sessionStorage.setItem('nickname', response.data.data.nickname);
      sessionStorage.setItem('bojId', response.data.data.bojId);
    })
    .catch((error) => {
      console.error(error);
    });
  return res !== false ? res : true;
};
