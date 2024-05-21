import { useSelector, useDispatch } from 'react-redux';
import { changeLightMode, changeDarkMode } from '../../reducers/toggle/toggle';
import '../../styles/common/Toggle.scss';

const Toggle = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.toggle);

  const onChangeMode = () => {
    if(mode === 'light') {
      dispatch(changeDarkMode());
    } else {
      dispatch(changeLightMode());
    }
  }
  console.log(mode)

  return (
    <div className="toggle_wrapper" onClick={onChangeMode}>
      <div className={`toggle-container ${(mode !== 'light') ? 'toggle--checked' : ''}`} />
      <div className={`toggle-circle ${(mode !== 'light') ? 'toggle--checked' : ''}`} />
    </div>
  );
};

export default Toggle;
