import React, { useEffect, useRef } from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";
import styled from "styled-components";
// import p5 from "p5";
// window.p5 = p5;
const ChartContainer = styled.div`
  // background: #fff;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(color[0], color[1], color[2], 0.1);
  border-radius: 10px;
`;

const sketch = (p5) => {
  let data = [];
  let date = [];
  let barProgress = [];
  let barStep = 0.3;
  let barIndex = 0;
  let lineProgress = 0;
  let lineStep = 0.3;
  let isAnimating = true;
  const lineDelay = 0.3 * 60; // 0.3초 딜레이 (프레임 단위, 60fps 기준)
  let axisProgress = 0;
  let auxLine1Progress = 0;
  const axisStep = 0.02;
  let auxLine1Length = 0;
  let auxLine2Length = 0;
  let auxLine3Length = 0;
  let auxLine4Length = 0;
  let currentBarHeight = [];
  let drawnLines = 0;
  let zoom = 1;
  let color = [];
  let width = 400;
  let darkMode = false;
  p5.setup = () => {
    p5.noLoop(); // 초기에는 멈춰 있는 상태로 설정
    p5.createCanvas(width + 200, 400);
  };

  p5.updateWithProps = (props) => {
    p5.noLoop(); // 초기에는 멈춰 있는 상태로 설정

    darkMode = props.darkMode;
    if (props.width) {
      width = props.width;
    }
    //todo 페이지 이동 시 새로고침되게 되면 createCanvas 주석처리 하기!
    p5.createCanvas(width + 200, 400);
    if (props) {
      data = props.data;
      barProgress = Array(data.length).fill(0);
      currentBarHeight = Array(data.length).fill(0);

      // console.log(props);
    }
    if (props.date) {
      date = props.date;
    }
    if (props.lineSpeed) {
      lineStep = props.lineSpeed;
      // console.log(lineStep);
    }
    if (props.barSpeed) {
      barStep = props.barSpeed;
      // console.log(barStep);
    }
    if (props.color) {
      color = props.color;
    }
    zoom = props.zoom;
    p5.loop(); // props가 업데이트되면 다시 시작
  };
  console.log(p5);

  p5.draw = () => {
    p5.loop();
    p5.scale;
    // console.log(darkMode);
    // p5.loop(); // props가 업데이트되면 다시 시작
    if (darkMode) p5.background(71, 72, 74);
    else p5.background(255);

    p5.stroke(color[0], color[1], color[2]);

    p5.strokeWeight(5);
    p5.fill(color[0], color[1], color[2], 50);
    p5.drawingContext.shadowBlur = 20;
    p5.drawingContext.shadowColor = `rgba(${color[0]},${color[1]},${color[2]}, 0.5)`;
    // 보조선 값 텍스트 표시
    p5.textSize(12);
    p5.noStroke();
    p5.fill(color[0], color[1], color[2]);
    p5.text("100", 15, 350 - 250);
    p5.text("75", 18, 350 - 187.5);
    p5.text("50", 18, 350 - 125);
    p5.text("25", 18, 350 - 62.5);

    if (auxLine4Length < 500) {
      auxLine1Length = 0.1 * 500 + 0.9 * auxLine1Length;
      auxLine2Length = 0.2 * auxLine1Length + 0.8 * auxLine2Length;
      auxLine3Length = 0.2 * auxLine2Length + 0.8 * auxLine3Length;
      auxLine4Length = 0.2 * auxLine3Length + 0.8 * auxLine4Length;
      // x축과 평행한 보조선 그리기
      p5.strokeWeight(1);
      p5.stroke(color[0], color[1], color[2], 50);

      for (let i = 1; i <= 4; i++) {
        const y = 350 - i * 62.5;

        if (i == 4) p5.line(40, y, width - 360 + auxLine1Length, y);
        else if (i == 3) {
          p5.line(40, y, width - 360 + auxLine2Length, y);
        } else if (i == 2) {
          p5.line(40, y, width - 360 + auxLine3Length, y);
        } else if (i == 1) {
          p5.line(40, y, width - 360 + auxLine4Length, y);
        }
      }
    }
    if (axisProgress < 1) {
      if (axisProgress < 1) axisProgress += axisStep;
      const xAxisLength = p5.lerp(0, 100 + width, axisProgress);
      const yAxisLength = p5.lerp(0, 300, axisProgress);
      p5.strokeWeight(4);
      p5.stroke(color[0], color[1], color[2]);
      // x축 그리기
      p5.line(30, 350, 50 + xAxisLength, 350);

      // y축 그리기
      p5.line(50, 370, 50, 350 - yAxisLength);
      // x축 화살표 그리기
      p5.fill(color[0], color[1], color[2]);
      p5.triangle(
        50 + xAxisLength,
        350,
        45 + xAxisLength,
        348,
        45 + xAxisLength,
        352
      );
      // y축 화살표 그리기
      p5.strokeWeight(1);
      p5.fill(color[0], color[1], color[2]);
      p5.triangle(
        50,
        345 - yAxisLength,
        45,
        355 - yAxisLength,
        55,
        355 - yAxisLength
      );
    } else if (data.length > 1 && isAnimating) {
      // x축과 평행한 보조선 그리기
      p5.strokeWeight(4);
      p5.stroke(color[0], color[1], color[2]);
      p5.fill(color[0], color[1], color[2]);
      p5.line(30, 350, width + 150, 350);
      p5.line(50, 370, 50, 50);
      p5.triangle(50, 45, 45, 53, 55, 53);
      p5.triangle(width + 155, 350, width + 147, 345, width + 147, 355);

      // 보조선 값 텍스트 표시
      p5.drawingContext.shadowBlur = 0;
      p5.textSize(12);
      p5.noStroke();
      p5.fill(color[0], color[1], color[2]);

      let barWidth;
      if ((450 - 50) / data.length < 50) {
        barWidth = (450 - 50) / data.length - 3;
      } else barWidth = 47;

      // 선 그래프 그리기
      p5.strokeWeight(5);
      p5.stroke(color[0], color[1], color[2]);

      for (let i = 0; i < drawnLines; i++) {
        const startX = p5.map(i, 0, data.length - 1, 100, width + 100);
        const startY = p5.map(data[i], 0, 100, 300, 50);
        const endX = p5.map(i + 1, 0, data.length - 1, 100, width + 100);
        const endY = p5.map(data[i + 1], 0, 100, 300, 50);
        p5.line(startX, startY, endX, endY);
      }

      if (drawnLines < data.length) {
        const startX = p5.map(drawnLines, 0, data.length - 1, 100, width + 100);
        const startY = p5.map(data[drawnLines], 0, 100, 300, 50);
        const endX = p5.map(
          drawnLines + 1,
          0,
          data.length - 1,
          100,
          width + 100
        );
        const endY = p5.map(data[drawnLines + 1], 0, 100, 300, 50);
        // console.log(drawnLines, lineProgress);
        if (lineProgress == 1) {
          lineProgress = 0;
        } else if (lineProgress + lineStep >= 1) {
          lineProgress = 1;
          drawnLines++;

          // console.log("asdf:", drawnLines);
        } else {
          lineProgress += lineStep;
        }

        //   console.log(lineProgress);
        const currentX = p5.lerp(startX, endX, lineProgress);
        const currentY = p5.lerp(startY, endY, lineProgress);

        p5.line(startX, startY, currentX, currentY);
      }

      // 막대 그래프 그리기
      for (let i = 0; i < data.length; i++) {
        const barHeight = p5.map(data[i], 0, Math.max(...data), 0, 250);
        currentBarHeight[i] = p5.lerp(0, barHeight, barProgress[i]);

        if (
          p5.mouseX >
            p5.map(i, 0, data.length - 1, 100, width + 100) - barWidth * 0.5 &&
          p5.mouseX <
            p5.map(i, 0, data.length - 1, 100, width + 100) + barWidth * 0.5 &&
          p5.mouseY > 350 - currentBarHeight[i] &&
          p5.mouseY < 350
        ) {
          p5.noStroke();
          if (darkMode) {
            p5.fill(71, 72, 74, 50);
          }
          p5.fill(255, 255, 255, 20);
          p5.rect(
            p5.map(i, 0, data.length - 1, 100, width + 100) - 35,
            350 - barHeight - 12 - 25,
            70,
            35,
            0
          );
          p5.fill(color[0], color[1], color[2], 100);
          p5.textSize(12);
          p5.fill(color[0], color[1], color[2], 255);

          if (data[i] == 100) {
            p5.text(
              data[i],
              p5.map(i, 0, data.length - 1, 100, width + 100) - 9,
              350 - barHeight - 18
            );
            if (darkMode) {
              p5.fill(200, 200, 200);
            }
            p5.text(
              date[i],
              p5.map(i, 0, data.length - 1, 100, width + 100) - 22,
              350 - barHeight - 8
            );
          } else {
            p5.text(
              data[i],
              p5.map(i, 0, data.length - 1, 100, width + 100) - 6,
              350 - barHeight - 21
            );
            p5.fill(100, 100, 100, 255);
            if (darkMode) {
              p5.fill(200, 200, 200);
            }
            p5.text(
              date[i],
              p5.map(i, 0, data.length - 1, 100, width + 100) - 22,
              350 - barHeight - 8
            );
          }
          p5.fill(color[0], color[1], color[2], 100);
        } else {
          p5.fill(color[0], color[1], color[2], 50);
        }
        p5.noStroke();
        p5.rect(
          p5.map(i, 0, data.length - 1, 100, width + 100) - barWidth * 0.5,
          350 - currentBarHeight[i],
          barWidth,
          currentBarHeight[i],
          5,
          5,
          0,
          0
        );
      }

      // 막대 애니메이션 업데이트
      if (barProgress[data.length - 1] < data.length) {
        for (let ii = 0; ii <= barIndex; ii++) {
          barProgress[ii] += barStep;
          if (barProgress[ii] >= 1) {
            barProgress[ii] = 1;
            if (barProgress[barIndex] > 0.4) {
              barIndex++;
            }
          }
        }
      }

      ///
      if (
        barIndex >= data.length &&
        drawnLines >= data.length - 1 &&
        p5.frameCount >= lineDelay
      ) {
        // isAnimating = false;
        p5.noLoop(); // 애니메이션이 끝나면 멈춤
      }
    } else {
      p5.strokeWeight(0);
      p5.fill(color[0], color[1], color[2], 100);

      if (
        p5.mouseX > p5.map(i, 0, data.length - 1, 100, 500) - barWidth * 0.5 &&
        p5.mouseX < p5.map(i, 0, data.length - 1, 100, 500) + barWidth * 0.5 &&
        p5.mouseY > 350 - currentBarHeight[i] &&
        p5.mouseY < 350
      ) {
        p5.fill(color[0], color[1], color[2], 100);
      } else {
        p5.fill(color[0], color[1], color[2], 50);
      }
      if (
        p5.mouseX > p5.map(i, 0, data.length - 1, 100, 500) - barWidth * 0.5 &&
        p5.mouseX < p5.map(i, 0, data.length - 1, 100, 500) + barWidth * 0.5 &&
        p5.mouseY > 350 - currentBarHeight[i] &&
        p5.mouseY < 350
      ) {
        p5.fill(color[0], color[1], color[2], 100);
      } else {
        p5.fill(color[0], color[1], color[2], 50);
      }

      p5.rect(
        p5.map(i, 0, data.length - 1, 100, 500),
        350 - currentBarHeight[i],
        barWidth - 5,
        currentBarHeight[i]
      );
      p5.text(
        data[i],
        p5.map(i, 0, data.length - 1, 100, 500) - 6,
        350 - barHeight - 21
      );
      p5.fill(100, 100, 100, 255);
      p5.text(
        date[i],
        p5.map(i, 0, data.length - 1, 100, 500) - 22,
        350 - barHeight - 21
      );
      p5.noLoop(); // 애니메이션이 끝나면 멈춤
    }

    // 그림자 효과 제거
    p5.drawingContext.shadowBlur = 0;
  };
};

const NormalGraph = ({
  data,
  date,
  lineSpeed,
  barSpeed,
  color,
  zoom,
  width,
  darkMode,
}) => {
  const p5Instance = useRef(null);
  useEffect(() => {
    // p5.js 스케치 초기화 및 캔버스 생성
    if (!p5Instance.current) {
      p5Instance.current = new window.p5(sketch);
    }

    // 속성 업데이트
    if (p5Instance.current) {
      p5Instance.current.updateWithProps({
        data,
        date,
        lineSpeed,
        barSpeed,
        color,
        zoom,
        width,
        darkMode,
      });
    }

    return () => {
      // 컴포넌트 언마운트 시 p5.js 인스턴스 제거
      if (p5Instance.current) {
        p5Instance.current.remove();
        p5Instance.current = null;
      }
    };
  }, [data, date, lineSpeed, barSpeed, color, zoom, width, darkMode]);
  return !data ? (
    <div
      style={{
        width: "500px",
        height: "400px",
        textAlign: "center",
        alignContent: "center",
      }}
    >
      아무것도 없다.
    </div>
  ) : (
    <ChartContainer>
      <ReactP5Wrapper
        sketch={(p5) => {
          p5Instance.current = p5;
          sketch(p5);
        }}
        data={data}
        date={date}
        lineSpeed={lineSpeed}
        barSpeed={barSpeed}
        color={color}
        zoom={zoom}
        width={width}
        darkMode={darkMode}
      />
    </ChartContainer>
  );
};

export default NormalGraph;
