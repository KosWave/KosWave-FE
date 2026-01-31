import React, { useEffect } from "react";

function ErrorPage() {
  useEffect(() => {
    const hasRefreshed = localStorage.getItem("error");

    if (!hasRefreshed) {
      localStorage.setItem("error", "true");
      window.location.reload();
    }
  }, []);

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
        <div style={{ fontSize: "10em", color: "#bbbbbb" }}>ERROR</div>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div style={{ fontSize: "1.5em" }}>
              <h1>알 수 없는 에러에요!</h1>
              해당 페이지에 오류가 발생했어요!
              <br />
              나중에 다시 시도해주세요.
            </div>

            <img src="/assets/images/error-icon.png"></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
