import '../../styles/pages/SolvePage.scss';

const SolveExplain = ({ htmlContent, mode }) => {
  return (
    <div
      className={`Solve--Explain--Text--${mode}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    ></div>
  );
};

export default SolveExplain;
