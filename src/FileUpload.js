import Papa from "papaparse";
import { useState } from "react";
function FileUpload(Props){
    
    const [parsedData, setParsedData] = useState([]);
  
    // Preprocessing data
    
    //State to store table Column name
    const [tableRows, setTableRows] = useState([]);
  
    //State to store the values
    const [rowValues, setValues] = useState([]);
    const [fileType, setfileType] = useState('test');
    const [components, setComponents] = useState([false]);
    

    const changeHandler = (event) => {
    
        if(event.target.files[0]=== undefined)
          return;
     
        let fType=event.target.files[0].name.split('.')[1];
        console.log(fType);
        setfileType(fType);

        setComponents([false]);

        if(fType==='csv')
        {
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
              //parsedData=results.data;
    
              // Filtered Column Names
              //console.log(rowsArray[0]);
              setTableRows(rowsArray[0]);
              //tableRows = rowsArray[0];
    
              // Filtered Values
              //console.log(valuesArray);
              setValues(valuesArray);
              //parsedData=results.data;
              //tableRows = rowsArray[0];
              //rowValues=valuesArray; 
            },
            });
            console.log("File upload props", Props);
            
        }
        else if(fType==='json'){
    
          const fileReader = new FileReader();
          fileReader.readAsText(event.target.files[0], "UTF-8");
          fileReader.onload = e => {
            //console.log("e.target.result", e.target.result);
            var DataObject = JSON.parse(e.target.result);
            //['AvgTemperature']
            //console.log("DataObject:",Object.entries(DataObject));
            //var result = Object.keys(DataObject).map((key) => [Number(key), DataObject[key]]);
            let result=[];
            let dcol=0;
            console.log("DataObject:", DataObject);
            setParsedData(DataObject);
            for (const [key, value] of Object.entries(DataObject)) {
              console.log(`${key}: ${value}`);
              //let dum=[];
              //result.push([])
              
              for (const [keyin, valuein] of Object.entries(value)) {
                //console.log(`${keyin}: ${valuein}`);
                //console.log(row,col);
                var x = `${valuein}`;
                //console.log(x);
                if(dcol===0)
                  result.push([]);
                
                result[Number(keyin)].push(x);
                //drow.push(x);
              }
              dcol= dcol+1;
              
            }
            //console.log("result:",result);
          
            setTableRows(Object.keys(DataObject));
            setValues(result);

            //parsedData= DataObject;
            //tableRows =Object.keys(DataObject);
            //rowValues=result; 
            
            //setFiles(e.target.result);
          };
    
        }
        else{
          return;
        }
        
      };

    const uploadFile = (event) => {
        event.preventDefault();
        Props.onFileLoad({parsedData, tableRows, rowValues, fileType, components});

    }

    return(<>
    <h1>VisAct: look inside your data!</h1>
      <h3>Select File for Line Chart</h3>
      <form onSubmit={uploadFile}>
        <input
            type="file"
            name="file"
            onChange={changeHandler}
            accept=".csv, .json"
            style={{ margin: "10px auto" }}
        />
        <br />
        <br />
        <button type="submit">Upload</button>
      </form>
    
    </>);
}
export default FileUpload;