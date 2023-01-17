import { useState } from "react";

function GetChartProperties(Props) {
  const [x_axis, setXAxis] = useState("");
  const [y_axis, setYAxis] = useState("");
  //const [message, setMessage] = useState('');
  //const [components, setComponents] = useState([false]);
  const [chatType, setChatType] = useState([false]);
  const [dimestions, setDimestions] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    //setComponents([true]);
    //setMessage(`Chart ${x_axis} Vs ${y_axis}!`);
    //setXAxis('');
    //setYAxis('');
    let message = ``;
    if (x_axis !== "" || y_axis !== "")
      message = `Chart ${x_axis} Vs ${y_axis}!`;
    else message = `Please select input variables!`;
    Props.onSubmit.getUserInput({ x_axis, y_axis, message, chatType });
  };

  const x_axisSet = (event) => {
    console.log(event.target.value);
    setXAxis(event.target.value);
    console.log("User Selected Value - ", event.target.value);
  };

  const y_axisSet = (event) => {
    console.log(event.target.value);
    setYAxis(event.target.value);
    console.log("User Selected Value - ", event.target.value);
  };

  const options = Props.onSubmit.tableRows;

  /*
     ['AvgTemperature', 'Year', 'Country'];
    const onOptionChangeHandler = (event) => {
        console.log("User Selected Value - ", event.target.value)
    }
    */
  const chartSelect = ["Line Chart", "Bar Chart", "Pie Chart"];

  const ChartSelector = (event) => {
    event.preventDefault();
    let chType = event.target.value;
    setChatType([chType]);

    switch (chType) {
      case "Line Chart":
        setDimestions(["Please choose X Axis", "Please choose Y Axis"]);
        break;
      case "Bar Chart":
        setDimestions([
          "Please choose categories",
          "Please choose value column",
        ]);
        break;

      case "Pie Chart":
        setDimestions([
          "Please choose Pie chat categories",
          "Please choose corresponding value column",
        ]);
        break;
      default:
      // code block
    }

    //setComponents([event.target.value])
    //setChatType([chType]);

    console.log("User Selected Value - ", event.target.value);
  };

  //console.log(Props.onSubmit.tableRows);

  return (
    <>
      <h3 className="text-lg font-bold text-sky-500 capitalize">Select Chart</h3>
      <form onSubmit={handleSubmit}>
        <select
          onChange={ChartSelector}
          className="bg-sky-500 p-[14px] border rounded-md  text-medium text-white hover:bg-cyan-500 cursor-pointer"
        >
          <option>Please choose Chart</option>
          {chartSelect.map((option, index) => {
            return <option key={index}>{option}</option>;
          })}
        </select>
        <br />
        <br />
        {(() => {
          if (chatType[0] !== false) {
            return (
              <>
                <h3 className="text-lg font-bold text-sky-500 capitalize">
                  Provide required Variable Names
                </h3>
                <select
                  onChange={x_axisSet}
                  className="bg-teal-500 p-[14px] border rounded-md text-medium text-white hover:bg-cyan-500 cursor-pointer"
                >
                  <option>{dimestions[0]}</option>
                  {options.map((option, index) => {
                    return <option key={index}>{option}</option>;
                  })}
                </select>

                <br />
                <br />

                <select
                  onChange={y_axisSet}
                  className="bg-teal-500 p-[14px] border rounded-md text-medium text-white hover:bg-cyan-500 cursor-pointer"
                >
                  <option>{dimestions[1]}</option>
                  {options.map((option, index) => {
                    return <option key={index}>{option}</option>;
                  })}
                </select>

                <br />
                <br />

                <button type="submit" className="btn">
                Show Chart
              </button>
              </>
            );
          }
        })()}

        
      </form>
    </>
  );
}

export default GetChartProperties;
