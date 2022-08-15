import React from "react";

const Color = ({ color }) => {
  let backgroundImg;
  switch (color[0]) {
    case "Trắng":
      backgroundImg = "https://pubcdn2.ivymoda.com/images/color/001.png";
      break;
    case "Đen":
      backgroundImg = "https://pubcdn2.ivymoda.com/images/color/049.png";
      break;
    case "Hồng":
      backgroundImg = "https://pubcdn2.ivymoda.com/images/color/050.png";
      break;
    case "Xanh ngọc":
      backgroundImg = "https://pubcdn2.ivymoda.com/images/color/006.png";
      break;
    case "Nâu đỏ":
      backgroundImg = "https://pubcdn2.ivymoda.com/images/color/044.png";
      break;
    case "Màu be":
      backgroundImg = "https://pubcdn2.ivymoda.com/images/color/004.png";
      break;
    case "Xanh Lơ":
      backgroundImg = "https://pubcdn2.ivymoda.com/images/color/017.png";
      break;
    case "Vàng":
      backgroundImg = "https://pubcdn2.ivymoda.com/images/color/009.png";
      break;
    case "Họa tiết hồng":
      backgroundImg = "https://pubcdn2.ivymoda.com/images/color/h13.png";
      break;
    case "Họa tiết Đỏ Mận":
      backgroundImg = "https://pubcdn2.ivymoda.com/images/color/h12.png";
      break;
    case "Kẻ Xanh Tím Than":
      backgroundImg = "https://pubcdn2.ivymoda.com/images/color/k48.png";
      break;
    case "Xanh Bạc Hà":
      backgroundImg = "https://pubcdn2.ivymoda.com/images/color/018.png";
      break;
    case "Họa tiết Cam":
      backgroundImg = "https://pubcdn2.ivymoda.com/images/color/h10.png";
      break;
    case "Vàng Đậm":
      backgroundImg = "https://pubcdn2.ivymoda.com/images/color/010.png";
      break;
    case "Hồng thẫm":
      backgroundImg = "https://pubcdn2.ivymoda.com/images/color/033.png";
      break;
    case "Họa tiết Đen":
      backgroundImg = "https://pubcdn2.ivymoda.com/images/color/h49.png";
      break;
    case "Xanh Lime":
      backgroundImg = "https://pubcdn2.ivymoda.com/images/color/006.png";
      break;
    case "Họa tiết Xanh Lá":
      backgroundImg = "https://pubcdn2.ivymoda.com/images/color/h07.png";
      break;
    case "Kẻ Xanh Lá Đậm":
      backgroundImg = "https://pubcdn2.ivymoda.com/images/color/h35.png";
      break;
    case "Kẻ Nude":
      backgroundImg = "https://pubcdn2.ivymoda.com/images/color/k04.png";
      break;
    case "Hồng san hô":
      backgroundImg = "https://pubcdn2.ivymoda.com/images/color/050.png";
      break;
    case "Màu Be":
      backgroundImg = "https://pubcdn2.ivymoda.com/images/color/004.png";
      break;
    case "Đỏ":
      backgroundImg = "https://pubcdn2.ivymoda.com/images/color/031.png";
      break;
    case "Đỏ Ruby":
      backgroundImg = "https://pubcdn2.ivymoda.com/images/color/032.png";
      break;
    case "Họa tiết Nude":
      backgroundImg = "https://pubcdn2.ivymoda.com/images/color/h04.png";
      break;
    case "Xanh Ngọc":
      backgroundImg = "https://pubcdn2.ivymoda.com/images/color/035.png";
      break;
    case "Xanh Cổ Vịt Nhạt":
      backgroundImg = "https://pubcdn2.ivymoda.com/images/color/019.png";
      break;
    case "Vàng hoa cúc":
      backgroundImg = "https://pubcdn2.ivymoda.com/images/color/009.png";
      break;
    case "Họa tiết Hồng":
      backgroundImg = "https://pubcdn2.ivymoda.com/images/color/h13.png";
      break;
    default:
  }
  return (
    <div
      style={{
        width: "18px",
        height: "18px",
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "contain",
        borderRadius: "50%",
      }}
    ></div>
  );
};

export default Color;
