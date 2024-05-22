import Apis from './Api';

export const signUpApi = async (
  file,
  nickname,
  bojId,
  isImageChange,
  setBojIdError,
  setErrorMessage
) => {
  let res;
  const formData = new FormData();
  console.log(file);

  formData.append('imageFile', file || null);
  formData.append(
    'signupRequestDto',
    JSON.stringify({
      nickname: nickname,
      bojId: bojId,
      isImageChange: isImageChange,
    }),
  );

  await Apis.post(`/signup`, formData)
    .then((response) => {
      console.log(response.data.data)
      res = response.data.data;
    })
    .catch((err) => {
      setBojIdError(true);
      if (err.response.data.code === "NOT_FOUND_BOJID") {
        setErrorMessage('solved.ac에 존재하지 않는 백준ID 입니다.');
      } else if (err.response.data.code === 'DUPLICATE_BOJID') {
        setErrorMessage('중복되는 백준 ID입니다.');
      } 
      res = null
    });
    return res !== null ? res : null;
};
