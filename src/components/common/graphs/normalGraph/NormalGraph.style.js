
import React, { useRef, useEffect } from "react";
import p5 from "p5";
import styled from "styled-components";

const ChartContainer = styled.div`
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const NormalChart = ({ data, zoom }) => {
  const sketchRef = useRef();

  useEffect(() => {
    const sketch = (p) => {
      let canvas;

      p.setup = () => {
        canvas = p.createCanvas(600, 400);
        canvas.parent(sketchRef.current);
      };

      p.draw = () => {
        p.background(255);
        p.stroke(0);
        p.fill(100, 100, 250, 150);

        const barWidth = p.width / data.length;

        for (let i = 0; i < data.length; i++) {
          const x = i * barWidth;
          const y = p.height - data[i];
          p.rect(x, y, barWidth - 10, data[i]);
        }
      };
    };

    new p5(sketch);

    return () => {
      // Cleanup p5 instance
      sketchRef.current.innerHTML = "";
    };
  }, [data]);

  return (
    <ChartContainer>
      <div ref={sketchRef} style={{ width: "500px", height: "400px" }}></div>
    </ChartContainer>
  );
};

export default NormalChart;
