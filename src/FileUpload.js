import Papa from "papaparse";
import { useState } from "react";
function FileUpload(Props) {
  const [parsedData, setParsedData] = useState([]);

  // Preprocessing data

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [rowValues, setValues] = useState([]);
  const [fileType, setfileType] = useState("test");
  const [fileName, setfileName] = useState("datafile");
  const [components, setComponents] = useState([false]);

  const changeHandler = (event) => {
    if (event.target.files[0] === undefined) return;
    let fName = event.target.files[0].name.split(".")[0];
    let fType = event.target.files[0].name.split(".")[1];
    console.log(fType);
    setfileType(fType);
    setfileName(fName);

    setComponents([false]);

    if (fType === "csv") {
      //console.log('csv');
      Papa.parse(event.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const rowsArray = [];
          const valuesArray = [];
          //console.log(results.data);
          // Iterating data to get column name and their values
          results.data.map((d) => {
            //console.log(Object.values(d));
            rowsArray.push(Object.keys(d));
            valuesArray.push(Object.values(d));
            return 0;
          });

          // Parsed Data Response in array format

          setParsedData(results.data);
          //console.log("Data object:", results.data);
          //console.log('Data object to JSON:',JSON.stringify(results.data));
          //parsedData=results.data;

          // Filtered Column Names
          //console.log(rowsArray[0]);
          setTableRows(rowsArray[0]);
          //tableRows = rowsArray[0];

          // Filtered Values
          //console.log(valuesArray);
          setValues(valuesArray);
        },
      });
      console.log("File upload props", Props);
    } else if (fType === "json") {
      const fileReader = new FileReader();
      fileReader.readAsText(event.target.files[0], "UTF-8");
      fileReader.onload = (e) => {
        //console.log("e.target.result", e.target.result);
        var DataObject = JSON.parse(e.target.result);
        //['AvgTemperature']
        //console.log("DataObject:",Object.entries(DataObject));
        //var result = Object.keys(DataObject).map((key) => [Number(key), DataObject[key]]);
        let result = [];
        let dcol = 0;
        //console.log("DataObject:", DataObject);
        //setParsedData(DataObject);
        for (const [key, value] of Object.entries(DataObject)) {
          console.log(`${key}: ${value}`);
          //let dum=[];
          //result.push([])

          for (const [keyin, valuein] of Object.entries(value)) {
            //console.log(`${keyin}: ${valuein}`);
            //console.log(row,col);
            var x = `${valuein}`;
            //console.log(x);
            if (dcol === 0) result.push([]);

            result[Number(keyin)].push(x);
            //drow.push(x);
          }
          dcol = dcol + 1;
        }
        //console.log("result:",result);

        var colNames = Object.keys(DataObject);
        var DataObjectUp = [];
        for (var i = 0; i < result.length; i++) {
          //console.log(result[i]);
          var dataObj = {};
          for (var j = 0; j < result[i].length; j++) {
            dataObj[colNames[j]] = result[i][j];
          }
          //console.log(dataObj);
          DataObjectUp.push(dataObj);
        }
        console.log("DataObjectUp", DataObjectUp);
        setParsedData(DataObjectUp);
        setTableRows(Object.keys(DataObject));
        setValues(result);

        //parsedData= DataObject;
        //tableRows =Object.keys(DataObject);
        //rowValues=result;

        //setFiles(e.target.result);
      };
    } else {
      return;
    }
  };

  const uploadFile = (event) => {
    event.preventDefault();
    let message = "";
    Props.onFileLoad({
      parsedData,
      tableRows,
      rowValues,
      fileType,
      components,
      message,
      fileName,
    });
  };

  return (
    <>
      <h3 className="text-center text-sky-500 capitalize">
        Select File to Start
      </h3>
      <div className="flex items-center justify-center">
        <form onSubmit={uploadFile} className="flex flex-col">
          <input
            type="file"
            name="file"
            onChange={changeHandler}
            accept=".csv, .json"
            className="px-5 py-3 font-medium text-medium text-grey-600 bg-white border border-gray-500 rounded-lg transition duration-250 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-800 mb-3"
          />
          <button type="submit" className="btn">
            Upload
          </button>
        </form>
      </div>
    </>
  );
}
export default FileUpload;
