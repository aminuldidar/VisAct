import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import d3cloud from "d3-cloud";

function WordCloud(Props){
    //console.log(Props.data);
  const svgRef = useRef();
 
  //console.log('parsedData: ',Props.data.parsedData);
  var prsdata=Props.data.parsedData;
  //console.log('Outside WordCloud..');
  useEffect(() => {
    //console.log('WordCloud printing..:',prsdata);
    const layout = d3cloud()
      .size([500, 500])
      .words(prsdata.map((d) => ({ text: d.word, size: d.value })))
      .padding(5)
      .rotate(() => ~~(Math.random() * 2) * 90)
      .font("Impact")
      .fontSize((d) => d.size)
      .on("end", draw);

    layout.start();

    function draw(words) {
      const svg = d3.select(svgRef.current);
      svg
        .append("g")
        .attr("transform", "translate(250,250)")
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", (d) => d.size + "px")
        .style("font-family", "Impact")
        .style(
          "fill",
          (d) => d3.schemeCategory10[Math.floor(Math.random() * 10)]
        )
        .attr("text-anchor", "middle")
        .attr("opacity", 0)
        .transition()
        .duration(1000)
        .attr("opacity", 1)
        .attr("transform", (d) => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
        .text((d) => d.text);
    }
  }, [prsdata]);

 
  return <div>
  <div className="flex justify-center items-center">
    <svg width="500" height="500" ref={svgRef} />
  </div>
</div>;
};

export default WordCloud;