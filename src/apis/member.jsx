import Apis from './Api';

export const member = async () => {
  let res;

  await Apis.get('/users')
    .then((response) => {
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
