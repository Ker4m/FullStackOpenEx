const Footer = ({ parts }) => {
  let sum = 0;
  parts.forEach(part => sum += part.exercises )
    return (
      <b>
        total of
        {' ' +sum+' '}
         exercices
      </b>
    );
  };

export default Footer