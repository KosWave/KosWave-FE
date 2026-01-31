import React from "react";

export default function NotFoundPage() {
  return (
    <div
      style={{
        backgroundColor: "#fafcff",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "85%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ fontSize: "10em", color: "#bbbbbb" }}>404</div>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div style={{ fontSize: "1.5em" }}>
              <h1>404 Not Found</h1>
              아직 개발이 안 된 페이지에요!
              <br />
              정상적인 경로로 다시 접속해주세요.
            </div>

            <img src="/assets/images/not-found-icon.png"></img>
          </div>
        </div>
      </div>
    </div>
  );
}
