import { Heatmap } from "./index.js";
const svg = document.querySelector("#svg");
// 生成一个数组，里面是二维数组，[日期，数字]并且是从今天开始之前的一百天
function generateDateNumberArray(days) {
  const result = [];
  const today = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const randomNumber = Math.floor(Math.random() * 60); // 生成一个0到1之间的随机数
    result.push([date.toISOString().split("T")[0], randomNumber]);
  }

  return result;
}

// 生成从今天开始之前的一百天的数组
const data = generateDateNumberArray(200).reverse();
console.log(data);

const heatmap = new Heatmap(svg, data, {
  x: 20,
  y: 10,
  color: "green",
  tipMonth: {
    value: true,
    format: (value) => value + "月",
  },
  cellSpacing: 5,
  tooltip: {
    value: true,
    format: (value) => {
      return `${value[1]} on ${value[0]}`;
    },
  },
});
heatmap.paint();
