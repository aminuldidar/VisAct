import "./App.css";
import { useState } from "react";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import ShowData from "./ShowData";
import GetChartProperties from "./GetChartProperties";
import FileUpload from "./FileUpload";
import Navbar from "./component/Navbar";
import WordCloud from "./WordCloud";
import DownloadConvFile from "./DownloadConvFile"; 
import ScatterChart from "./ScatterChart";


function App() {
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [rowValues, setValues] = useState([]);
  // Track file type
  const [fileType, setfileType] = useState("test");
  const [fileName, setfileName] = useState("");
  
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
    setMessage(Props.message);
    setfileName(Props.fileName);
  };

  const getUserInput = (Props) => {
    console.log(Props);
    setXAxis(Props.x_axis);
    setYAxis(Props.y_axis);
    setComponents(Props.chatType);
    setMessage(Props.message);
  };

  const dataCloud = [
    { word: "hello", value: 40 },
    { word: "world", value: 30 },
    { word: "react", value: 20 },
    { word: "Javascript", value: 20 },
    { word: "PHP", value: 20 },
    { word: "Great work", value: 20 },
    { word: "Life is good", value: 20 },
    { word: "Have fun", value: 20 },
    { word: "Beautiful", value: 20 },
    { word: "visax", value: 20 },
    { word: "Wonderful", value: 20 },
  ];

  return (
    <>
      <Navbar />

      <FileUpload onFileLoad={getFileInput} />
      
      
      {/*{tableRows.length > 0 && (*/}
        <div>
          <div>
            {
              <h4 className="text-center text-sky-500 font-bold text-2xl mt-10">
                {message}
              </h4>
            }

            {(() => {
              
              if (parsedData.length !== 0) {
                
                  return (
                    <DownloadConvFile
                      data={{parsedData, tableRows, fileType,fileName }}
                    />
                  );
               
              }
            })()}
           
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

            {(() => {
              //console.log(parsedData,components[0]);

              if (
                parsedData.length !== 0 &&
                x_axis !== "" &&
                y_axis !== "" &&
                components[0] === "Scatter Chart"
              ) {
                //console.lognpm start('Inside line chart_1');
                //setComponents([false]);
                //console.log(parsedData);
                return (
                  <ScatterChart
                    data={{ parsedData, x_axis, y_axis, tableRows, fileType }}
                  />
                );
              }
            })()}

            {(() => {
              //console.log(parsedData,components[0]);

              if (
                parsedData.length !== 0 &&
                
                components[0] === "Word Cloud"
              ) {
                //console.lognpm start('Inside line chart_1');
                //setComponents([false]);
                //console.log(parsedData);
                return (
                  <WordCloud data={{ dataCloud }}/>
                );
              }
            })()}

          </div>
        {tableRows.length > 0 && (
          <div className="flex items-center justify-center gap-10">
            <div className="">
              <ShowData tableData={{ tableRows, rowValues }} />
            </div>
            <div className="">
              <GetChartProperties onSubmit={{ getUserInput, tableRows }} />
            </div>
          </div>)}
          
          
        </div>

    
    </>
  );
}

export default App;
