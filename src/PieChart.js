import ReactEcharts from 'echarts-for-react';

function PieChart(Props){

    //var legendData=Props.chartData.tableRows;
    var chartData=Props.chartData.parsedData;
    
    var legendData=[];
    var dataDisplay=[];
    chartData.forEach(element => {
        let elm={};
        for (const key in element) {

            if(key===Props.chartData.y_axis){
                console.log(`${key}: ${element[Props.chartData.y_axis]}`);
                //legendData.push(`${element[key]}`);
                elm['value']= element[Props.chartData.y_axis];
            }
            
            if(key===Props.chartData.x_axis){
                console.log(`${key}: ${element[Props.chartData.x_axis]}`);
                legendData.push(`${element[key]}`);
                elm['name']= element[Props.chartData.x_axis];
            }

           
        }
        dataDisplay.push(elm);
        
    });

    console.log(legendData);
    console.log(dataDisplay);
    
    
    return (<ReactEcharts
                option={{
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 10,
                        data: legendData
                    },
                    series: [
                    {
                        name: 'Utilization',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: dataDisplay
                        }
                    ]
                }}
            />
            )

}

export default PieChart;

