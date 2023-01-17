import "./App.css";
import { useState } from "react";
//import Papa from "papaparse";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import ShowData from "./ShowData";
import GetChartProperties from "./GetChartProperties";
import FileUpload from "./FileUpload";
import Navbar from "./component/Navbar";

function App() {
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [rowValues, setValues] = useState([]);
  // Track file type
  const [fileType, setfileType] = useState("test");
  const [components, setComponents] = useState([false]);

  const [x_axis, setXAxis] = useState("");
  const [y_axis, setYAxis] = useState("");
  const [message, setMessage] = useState("");

  const getFileInput = (Props) => {
    console.log(Props);

    setValues(Props.rowValues);
    setParsedData(Props.parsedData);
    setTableRows(Props.tableRows);
    setfileType(Props.fileType);
    setComponents(Props.components);
  };

  const getUserInput = (Props) => {
    console.log(Props);
    setXAxis(Props.x_axis);
    setYAxis(Props.y_axis);
    setComponents(Props.chatType);
    setMessage(Props.message);
  };

  return (
    <>
      <Navbar />

      <FileUpload onFileLoad={getFileInput} />

      {tableRows.length > 0 && (
        <div>
          <div>
            {
              <h4 className="text-center text-sky-500 font-bold text-2xl mt-10">
                {message}
              </h4>
            }
            {/*Block:Line Chart */}
            {(() => {
              //console.log(parsedData,components[0]);

              if (
                parsedData.length !== 0 &&
                x_axis !== "" &&
                y_axis !== "" &&
                components[0] === "Line Chart"
              ) {
                //console.lognpm start('Inside line chart_1');
                //setComponents([false]);
                //console.log(parsedData);
                return (
                  <LineChart
                    data={{ parsedData, x_axis, y_axis, tableRows, fileType }}
                  />
                );
              }
            })()}

            {/*Block: Pie Chart */}

            {(() => {
              //console.log(parsedData,components[0]);

              if (parsedData.length !== 0 && components[0] === "Pie Chart") {
                //&& x_axis !=='' && y_axis !==''
                //console.lognpm start('Inside line chart_1');
                //setComponents([false]);
                console.log(tableRows, rowValues);
                return (
                  <PieChart
                    chartData={{
                      x_axis,
                      y_axis,
                      tableRows,
                      rowValues,
                      parsedData,
                    }}
                  />
                );
              }
            })()}

            {/*Block: Bar Chart */}

            {(() => {
              //console.log(parsedData,components[0]);

              if (parsedData.length !== 0 && components[0] === "Bar Chart") {
                //&& x_axis !=='' && y_axis !==''
                //console.lognpm start('Inside line chart_1');
                //setComponents([false]);
                console.log(tableRows, rowValues);
                return (
                  <BarChart
                    chartData={{
                      x_axis,
                      y_axis,
                      tableRows,
                      rowValues,
                      parsedData,
                    }}
                  />
                );
              }
            })()}
          </div>
          <div className="flex items-center justify-center gap-10">
            <div className="">
              <ShowData tableData={{ tableRows, rowValues }} />
            </div>
            <div className="">
              <GetChartProperties onSubmit={{ getUserInput, tableRows }} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
