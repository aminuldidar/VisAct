function DownloadConvFile(Props) {
  const downloadJSONFile = () => {
    //console.log('Inside downloadFile',Props.data.parsedData);
    var data = new Blob([JSON.stringify(Props.data.parsedData)], {
      type: "text",
    });
    var csvURL = window.URL.createObjectURL(data);
    var tempLink = document.createElement("a");
    //console.log('tempLink',tempLink);
    tempLink.href = csvURL;
    tempLink.setAttribute("download", Props.data.fileName + ".json");
    tempLink.click();
  };

  function convertToCSV(objArray) {
    //console.log('res:',objArray);
    var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
    var str = "";

    for (var i = 0; i < array.length; i++) {
      var line = "";
      for (var index in array[i]) {
        if (line !== "") line += ",";

        line += array[i][index];
      }

      str += line + "\r\n";
    }

    return str;
  }

  function exportCSVFile(headers, items, fileTitle) {
    if (headers) {
      items.unshift(headers);
    }

    // Convert Object to JSON
    var jsonObject = JSON.stringify(items);

    var csv = convertToCSV(jsonObject);
    //console.log('csv:',csv)
    var exportedFilenmae = fileTitle + ".csv" || "export.csv";
    //console.log('exportedFilenmae',exportedFilenmae);

    var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
      var link = document.createElement("a");
      if (link.download !== undefined) {
        // feature detection
        // Browsers that support HTML5 download attribute
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", exportedFilenmae);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  const downloadCSVFile = () => {
    console.log("Inside CSV downloadFile");
    //var data = new Blob([JSON.stringify(parsedData)], {type: 'csv'});

    //itemsNotFormatted=[{"Region":"Africa","Country":"Algeria","State":"","City":"Algiers","Month":"1","Day":"1","Year":"1995","AvgTemperature":"64.2"},{"Region":"Africa","Country":"Algeria","State":"","City":"Algiers","Month":"1","Day":"2","Year":"1995","AvgTemperature":"49.4"},{"Region":"Africa","Country":"Algeria","State":"","City":"Algiers","Month":"1","Day":"3","Year":"1995","AvgTemperature":"48.8"},{"Region":"Africa","Country":"Algeria","State":"","City":"Algiers","Month":"1","Day":"4","Year":"1995","AvgTemperature":"46.4"},{"Region":"Africa","Country":"Algeria","State":"","City":"Algiers","Month":"1","Day":"5","Year":"1995","AvgTemperature":"47.9"},{"Region":"Africa","Country":"Algeria","State":"","City":"Algiers","Month":"1","Day":"6","Year":"1995","AvgTemperature":"48.7"},{"Region":"Africa","Country":"Algeria","State":"","City":"Algiers","Month":"1","Day":"7","Year":"1995","AvgTemperature":"48.9"},{"Region":"Africa","Country":"Algeria","State":"","City":"Algiers","Month":"1","Day":"8","Year":"1995","AvgTemperature":"49.1"},{"Region":"Africa","Country":"Algeria","State":"","City":"Algiers","Month":"1","Day":"9","Year":"1995","AvgTemperature":"49.0"},{"Region":"Africa","Country":"Algeria","State":"","City":"Algiers","Month":"1","Day":"10","Year":"1995","AvgTemperature":"51.9"},{"Region":"Africa","Country":"Algeria","State":"","City":"Algiers","Month":"1","Day":"11","Year":"1995","AvgTemperature":"51.7"},{"Region":"Africa","Country":"Algeria","State":"","City":"Algiers","Month":"1","Day":"12","Year":"1995","AvgTemperature":"51.3"},{"Region":"Africa","Country":"Algeria","State":"","City":"Algiers","Month":"1","Day":"13","Year":"1995","AvgTemperature":"47.0"},{"Region":"Africa","Country":"Algeria","State":"","City":"Algiers","Month":"1","Day":"14","Year":"1995","AvgTemperature":"46.9"},{"Region":"Africa","Country":"Algeria","State":"","City":"Algiers","Month":"1","Day":"15","Year":"1995","AvgTemperature":"47.5"},{"Region":"Africa","Country":"Algeria","State":"","City":"Algiers","Month":"1","Day":"16","Year":"1995","AvgTemperature":"45.9"}]

    exportCSVFile(
      Props.data.tableRows,
      Props.data.parsedData,
      Props.data.fileName
    );
  };

  return (
    <>
      {(() => {
        //console.log(parsedData,components[0]);
        //console.lognpm start('Inside line chart_1');
        //setComponents([false]);
        //console.log(parsedData);

        if (Props.data.fileType === "csv")
          return (
            <div className="w-full mb-6">
              <button className="btn text-sm" onClick={downloadJSONFile}>
                Download Converted JSON
              </button>
            </div>
          );
        if (Props.data.fileType === "json")
          return (
            <div className="w-full mb-6">
              <button className="btn text-sm" onClick={downloadCSVFile}>
                Download Converted CSV
              </button>
            </div>
          );
      })()}
    </>
  );
}

export default DownloadConvFile;
