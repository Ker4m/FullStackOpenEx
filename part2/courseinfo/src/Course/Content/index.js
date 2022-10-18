import Part from "./Part";

const Content = ({ parts }) => {
    return (
      <div>
        {parts.map((part,i) => <Part key={part.id} part={parts[i].name} exercise={parts[i].exercises}/>)}
      </div>
    );
  };

export default Content;