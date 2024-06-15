import '../../styles/pages/SolvePage.scss';

const SolveExample = ({ htmlContent, mode }) => {
  const formattedContent = htmlContent?.replace(/\n/g, '<br>');

  return (
    <div
      className={`Solve--Explain--Text--${mode}`}
      dangerouslySetInnerHTML={{ __html: formattedContent }}
    ></div>
  );
};

export default SolveExample;
