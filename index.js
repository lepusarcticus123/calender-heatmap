class Heatmap {
  constructor(container, data, options) {
    this.container = container;
    this.data = data;
    this.options = options;
    const defaultOptions = {
      x: 20,
      y: 10,
      color: "green",
      cellSpacing: 2,
      tipMonth: {
        value: true,
        format: (month) => month + "月", // 默认直接返回月份
      },
      tooltip: {
        value: true,
        format: (value) =>
          `${value[1].toFixed(2)} 于 ${value[0].split()[0]}年 ${
            value[0].split()[1]
          }月 ${value[0].split()[2]}日`, // 默认显示值和日期
      },
    };
    // 合并默认选项和用户传入的选项
    this.options = { ...defaultOptions, ...options };
  }
  getColor(value, color) {
    switch (color) {
      case "green":
        const green = [
          { threshold: 0, color: "#ebedf0" }, // 最浅灰绿
          { threshold: 1, color: "#d4f5d0" }, // 浅灰绿
          { threshold: 10, color: "#9be9a8" }, // 浅绿色
          { threshold: 15, color: "#6dd785" }, // 中浅绿色
          { threshold: 20, color: "#40c463" }, // 中绿色
          { threshold: 25, color: "#30a14e" }, // 深绿色
          { threshold: 35, color: "#216e39" }, // 深灰绿色
          { threshold: 50, color: "#154823" }, // 最深绿色
        ];
        for (let i = green.length - 1; i >= 0; i--) {
          if (value >= green[i].threshold) return green[i].color;
        }
      case "purple":
        const purple = [
          { threshold: 0, color: "#f5eef8" }, // 最浅灰紫
          { threshold: 1, color: "#ebd7f1" }, // 浅灰紫
          { threshold: 10, color: "#d7bde2" }, // 浅紫色
          { threshold: 15, color: "#b887cd" }, // 中浅紫
          { threshold: 20, color: "#a569bd" }, // 中紫色
          { threshold: 25, color: "#8e44ad" }, // 深紫色
          { threshold: 35, color: "#6b3582" }, // 深灰紫
          { threshold: 50, color: "#5b2c6f" }, // 最深紫色
        ];
        for (let i = purple.length - 1; i >= 0; i--) {
          if (value >= purple[i].threshold) return purple[i].color;
        }
      case "blue":
        const blue = [
          { threshold: 0, color: "#ebedf0" }, // 最浅灰蓝
          { threshold: 1, color: "#d0e7f9" }, // 浅灰蓝
          { threshold: 10, color: "#c6e0f5" }, // 浅蓝色
          { threshold: 15, color: "#9bccf2" }, // 中浅蓝
          { threshold: 20, color: "#73b3e7" }, // 中蓝色
          { threshold: 25, color: "#3b82f6" }, // 深蓝色
          { threshold: 35, color: "#215bb7" }, // 深灰蓝
          { threshold: 50, color: "#174ea6" }, // 最深蓝色
        ];
        for (let i = blue.length - 1; i >= 0; i--) {
          if (value >= blue[i].threshold) return blue[i].color;
        }
      case "orange":
        const orange = [
          { threshold: 0, color: "#fef5e7" }, // 最浅灰橙
          { threshold: 1, color: "#fdebd0" }, // 浅灰橙
          { threshold: 10, color: "#fdd0a6" }, // 浅橙色
          { threshold: 15, color: "#f5b041" }, // 中浅橙
          { threshold: 20, color: "#f39c12" }, // 中橙色
          { threshold: 25, color: "#dc7633" }, // 深橙色
          { threshold: 35, color: "#b24d00" }, // 深灰橙
          { threshold: 50, color: "#a04000" }, // 最深橙色
        ];
        for (let i = orange.length - 1; i >= 0; i--) {
          if (value >= orange[i].threshold) return orange[i].color;
        }
      default:
        return `rgb(${value * 255}, ${value * 255}, ${value * 255})`;
    }
  }

  paint() {
    const tooltip = document.createElement("div"); // 创建一个 div 元素
    tooltip.setAttribute("id", "tooltip"); // 设置该 div 的 id 属性为 "tooltip"
    const parentElement = this.container.parentElement;
    tooltip.style.position = "absolute";
    tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    tooltip.style.color = "white";
    tooltip.style.padding = "6px";
    tooltip.style.borderRadius = "5px";
    tooltip.style.opacity = "0";
    tooltip.style.fontSize = "smaller";
    tooltip.style.transition = "opacity 0.5s";
    tooltip.style.pointerEvents = "none"; // 防止鼠标事件干扰
    parentElement.appendChild(tooltip);

    const scale = this.container.width.baseVal.value;
    const scaleY = this.container.height.baseVal.value;
    this.container.style.height = scaleY + 20;
    const rx = scale * 0.01; // SVG 宽度的 2%
    const ry = scaleY * 0.01; // SVG 高度的 2%

    this.data.forEach((value, index) => {
      let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute(
        "x",
        Math.floor(index / this.options.y) * (scale / this.options.x) // 列号
      );
      rect.setAttribute(
        "y",
        (index % this.options.y) * (scaleY / this.options.y) // 行号
      );

      rect.setAttribute(
        "width",
        scale / this.options.x - this.options.cellSpacing
      );
      rect.setAttribute(
        "height",
        scaleY / this.options.y - this.options.cellSpacing
      );
      rect.setAttribute("fill", this.getColor(value[1], this.options.color));
      rect.setAttribute("rx", rx); // 设置圆角x轴半径
      rect.setAttribute("ry", ry); // 设置圆角y轴半径
      this.container.appendChild(rect);
      //月份提示
      if (this.options.tipMonth.value) {
        const day = value[0].split("-")[2];
        const month = value[0].split("-")[1];
        if (day == "01") {
          const text = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
          );
          text.textContent = this.options.tipMonth.format(parseInt(month, 10)); // 格式化月份

          const textX =
            Math.floor(index / this.options.y) * (scale / this.options.x) + 10;
          let textY = scaleY + 17; // 计算文本的 Y 坐标
          text.setAttribute("x", textX);
          text.setAttribute("y", textY); // 设置文本的 Y 坐标
          text.setAttribute("fill", "rgb(174, 174, 174)");
          text.setAttribute("font-size", "14px");
          text.setAttribute("text-anchor", "middle");

          this.container.appendChild(text);
        }
      }

      //tooltip
      if (this.options.tooltip.value) {
        rect.addEventListener("mouseover", (event) => {
          tooltip.style.opacity = "1";
          tooltip.textContent = this.options.tooltip.format(value);
          const rectBox = rect.getBoundingClientRect();
          const left =
            rectBox.left + rectBox.width / 2 - tooltip.offsetWidth / 2;
          tooltip.style.left = `${left}px`;
          tooltip.style.top = `${rectBox.top - rectBox.height * 2}px`;
        });

        rect.addEventListener("mouseout", () => {
          tooltip.style.opacity = "0";
        });
      }
    });
  }
}
export { Heatmap };
