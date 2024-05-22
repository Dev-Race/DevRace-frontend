import Apis from './Api';

export const signUpApi = async (file, nickname, bojId, isImageChange) => {
    const formData = new FormData();
    console.log(file)

    formData.append('imageFile', file || null);
    formData.append(
      'signupRequestDto',
      JSON.stringify({
        nickname: nickname,
        bojId: bojId,
        isImageChange: isImageChange,
      }),
    );

    const response = await Apis.post(`/signup`, formData);
    return response.data;
};
