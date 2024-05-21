export const LIGHT = 'TOGGLE/LIGHT';
export const DARK = 'TOGGLE/DARK';

export const changeLightMode = () => ({ type: LIGHT });
export const changeDarkMode = () => ({ type: DARK });

const initialState = {
  mode: 'light',
};

const toggle = (state = initialState, action) => {
  switch (action.type) {
    case LIGHT:
      return {
        ...state,
        mode: 'light',
      };
    case DARK:
      return {
        ...state,
        mode: 'dark',
      };
    default:
      return state;
  }
};

export default toggle;
