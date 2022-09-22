import { useState } from "react";

const StatisticLine = ({ text, value, percentage }) => {
  return (
    // <p>
    //   {text} : {value}
    // </p>
    <tr>
      <td>{text}</td>
      <td>
        {value}
        {percentage ? "%" : null}
      </td>
    </tr>
  );
};

const FeedbackButton = ({ text, action }) => {
  return <button onClick={action}>{text}</button>;
};

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad > 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="Good" value={good} />
            <StatisticLine text="Neutral" value={neutral} />
            <StatisticLine text="Bad" value={bad} />
            <StatisticLine text="All" value={good + neutral + bad} />
            <StatisticLine
              text="Average"
              value={(good - bad) / (good + neutral + bad)}
            />
            <StatisticLine
              text="Positive"
              value={(good * 100) / (good + neutral + bad)}
              percentage
            />
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give your Feedback</h1>
      <div>
        <FeedbackButton
          text={"Good"}
          action={() => setGood((prev) => prev + 1)}
        />
        <FeedbackButton
          text={"Neutral"}
          action={() => setNeutral((prev) => prev + 1)}
        />
        <FeedbackButton
          text={"Bad"}
          action={() => setBad((prev) => prev + 1)}
        />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
