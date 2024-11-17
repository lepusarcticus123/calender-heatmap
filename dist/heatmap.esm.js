class p {
  constructor(t, h, e) {
    this.container = t, this.data = h, this.options = e;
    const c = {
      x: 20,
      y: 10,
      color: "green",
      cellSpacing: 2,
      tipMonth: {
        value: !0,
        format: (s) => s
        // 默认直接返回月份
      },
      tooltip: {
        value: !0,
        format: (s) => `${s[1].toFixed(2)} on ${s[0]}`
        // 默认显示值和日期
      }
    };
    this.options = { ...c, ...e };
  }
  getColor(t, h) {
    switch (h) {
      case "green":
        const e = [
          { threshold: 0, color: "#ebedf0" },
          // 最浅灰绿
          { threshold: 1, color: "#d4f5d0" },
          // 浅灰绿
          { threshold: 10, color: "#9be9a8" },
          // 浅绿色
          { threshold: 15, color: "#6dd785" },
          // 中浅绿色
          { threshold: 20, color: "#40c463" },
          // 中绿色
          { threshold: 25, color: "#30a14e" },
          // 深绿色
          { threshold: 35, color: "#216e39" },
          // 深灰绿色
          { threshold: 50, color: "#154823" }
          // 最深绿色
        ];
        for (let o = e.length - 1; o >= 0; o--)
          if (t >= e[o].threshold) return e[o].color;
      case "purple":
        const c = [
          { threshold: 0, color: "#f5eef8" },
          // 最浅灰紫
          { threshold: 1, color: "#ebd7f1" },
          // 浅灰紫
          { threshold: 10, color: "#d7bde2" },
          // 浅紫色
          { threshold: 15, color: "#b887cd" },
          // 中浅紫
          { threshold: 20, color: "#a569bd" },
          // 中紫色
          { threshold: 25, color: "#8e44ad" },
          // 深紫色
          { threshold: 35, color: "#6b3582" },
          // 深灰紫
          { threshold: 50, color: "#5b2c6f" }
          // 最深紫色
        ];
        for (let o = c.length - 1; o >= 0; o--)
          if (t >= c[o].threshold) return c[o].color;
      case "blue":
        const s = [
          { threshold: 0, color: "#ebedf0" },
          // 最浅灰蓝
          { threshold: 1, color: "#d0e7f9" },
          // 浅灰蓝
          { threshold: 10, color: "#c6e0f5" },
          // 浅蓝色
          { threshold: 15, color: "#9bccf2" },
          // 中浅蓝
          { threshold: 20, color: "#73b3e7" },
          // 中蓝色
          { threshold: 25, color: "#3b82f6" },
          // 深蓝色
          { threshold: 35, color: "#215bb7" },
          // 深灰蓝
          { threshold: 50, color: "#174ea6" }
          // 最深蓝色
        ];
        for (let o = s.length - 1; o >= 0; o--)
          if (t >= s[o].threshold) return s[o].color;
      case "orange":
        const i = [
          { threshold: 0, color: "#fef5e7" },
          // 最浅灰橙
          { threshold: 1, color: "#fdebd0" },
          // 浅灰橙
          { threshold: 10, color: "#fdd0a6" },
          // 浅橙色
          { threshold: 15, color: "#f5b041" },
          // 中浅橙
          { threshold: 20, color: "#f39c12" },
          // 中橙色
          { threshold: 25, color: "#dc7633" },
          // 深橙色
          { threshold: 35, color: "#b24d00" },
          // 深灰橙
          { threshold: 50, color: "#a04000" }
          // 最深橙色
        ];
        for (let o = i.length - 1; o >= 0; o--)
          if (t >= i[o].threshold) return i[o].color;
      default:
        return `rgb(${t * 255}, ${t * 255}, ${t * 255})`;
    }
  }
  paint() {
    const t = document.createElement("div");
    t.style.position = "absolute", t.style.backgroundColor = "rgba(0, 0, 0, 0.9)", t.style.color = "white", t.style.padding = "6px", t.style.borderRadius = "5px", t.style.opacity = "0", t.style.fontSize = "smaller", t.style.transition = "opacity 0.5s", t.style.pointerEvents = "none", document.body.appendChild(t);
    const h = this.container.width.baseVal.value, e = this.container.height.baseVal.value, c = h * 0.01, s = e * 0.01;
    this.data.forEach((i, o) => {
      let r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      if (r.setAttribute(
        "x",
        Math.floor(o / this.options.y) * (h / this.options.x)
        // 列号
      ), r.setAttribute(
        "y",
        o % this.options.y * (e / this.options.y)
        // 行号
      ), r.setAttribute(
        "width",
        h / this.options.x - this.options.cellSpacing
      ), r.setAttribute(
        "height",
        e / this.options.y - this.options.cellSpacing
      ), r.setAttribute("fill", this.getColor(i[1], this.options.color)), r.setAttribute("rx", c), r.setAttribute("ry", s), this.container.appendChild(r), this.options.tipMonth.value) {
        console.log(this.options.tipMonth.format);
        const d = i[0].split("-")[2], n = i[0].split("-")[1];
        if (d == "01") {
          const l = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
          );
          l.textContent = this.options.tipMonth.format(
            n.replace(/^0/, "")
          ), l.setAttribute(
            "x",
            Math.floor(o / this.options.y) * (h / this.options.x) + 10
          ), l.setAttribute("y", e + 20), l.setAttribute("fill", "rgb(174, 174, 174)"), l.setAttribute("font-size", "14px"), l.setAttribute("text-anchor", "middle"), this.container.appendChild(l);
        }
      }
      this.options.tooltip.value && (r.addEventListener("mouseover", (d) => {
        t.style.opacity = "1", t.textContent = this.options.tooltip.format(i);
        const n = r.getBoundingClientRect(), l = n.left + n.width / 2 - t.offsetWidth / 2;
        t.style.left = `${l}px`, t.style.top = `${n.top - n.height * 2}px`;
      }), r.addEventListener("mouseout", () => {
        t.style.opacity = "0";
      }));
    });
  }
}
export {
  p as Heatmap
};
//# sourceMappingURL=heatmap.esm.js.map
