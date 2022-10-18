const Footer = ({ parts }) => {
  const total = parts.map(part=>part.exercises).reduce((s, p) => {
    return s + p
  });
    return (
      <b>
        total of
        {' '+total+' '}
         exercises
      </b>
    );
  };

export default Footer;