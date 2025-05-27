import in5Img from "./asset/in5.png";
import in2Imge from "./asset/in2.png";
import in3Image from "./asset/in3-dang-dac-biet.png";

export const dataExcel = [
  {
    id: 1,
    name: "In 5 hàng - khỏ giấy 5",
    img: in5Img,
    description: "Chiều dài 90mm , chiều rộng 15 mm, mỗi tem 20mm",
  },
  {
    id: 2,
    name: "In 2 hàng - khổ giấy 2",
    img: in2Imge,
    description: "Chiều dài 70mm , chiều rộng 22 mm, mỗi tem 35mm",
  },
  {
    id: 3,
    name: "In 3 hàng - dạng đặc biệt - khổ giấy 3",
    img: in3Image,
        description: "Chiều dài 84mm , chiều rộng 59 mm, mỗi tem 28mm",
  },
] as const;
