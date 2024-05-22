import Apis from './Api';

export const signUpApi = (file, nickname, bojId, isImageChange) => {
    const formData = new FormData();

    formData.append('imageFile', file);
    formData.append(
      'signupRequestDto',
      new Blob(
        [
          JSON.stringify({
            nickname: nickname,
            bojId: bojId,
            isImageChange: isImageChange,
          }),
        ],
        { type: 'application/json' },
      ),
    );

    const response = Apis.post(`/signup`, formData);
    return response;
};
