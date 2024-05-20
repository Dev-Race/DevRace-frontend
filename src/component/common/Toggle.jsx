import '../../styles/common/Toggle.scss';

const Toggle = ({ isOn, onToggleChange }) => {
  const toggleHandler = () => {
    onToggleChange(!isOn);
  };

  return (
    <div className="toggle_wrapper" onClick={toggleHandler}>
      <div className={`toggle-container ${isOn ? 'toggle--checked' : ''}`} />
      <div className={`toggle-circle ${isOn ? 'toggle--checked' : ''}`} />
    </div>
  );
};

export default Toggle;
