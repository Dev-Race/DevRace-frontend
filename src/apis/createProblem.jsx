import Apis from './Api';

export const createProblem = async (number) => {
  let res;

  await Apis.post('/rooms', {
    problemNumber : number
  }).then((response) => {
      res = response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return res;
}