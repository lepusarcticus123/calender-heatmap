class u {
  constructor(t, n, e) {
    this.container = t, this.data = n, this.options = e;
    const r = {
      x: 20,
      y: 10,
      color: "green",
      cellSpacing: 2,
      tipMonth: {
        value: !0,
        format: (l) => l
        // 默认直接返回月份
      },
      tooltip: {
        value: !0,
        format: (l) => `${l[1].toFixed(2)} on ${l[0]}`
        // 默认显示值和日期
      }
    };
    this.options = { ...r, ...e };
  }
  getColor(t, n) {
    switch (n) {
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
        const r = [
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
        for (let o = r.length - 1; o >= 0; o--)
          if (t >= r[o].threshold) return r[o].color;
      case "blue":
        const l = [
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
        for (let o = l.length - 1; o >= 0; o--)
          if (t >= l[o].threshold) return l[o].color;
      case "orange":
        const c = [
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
        for (let o = c.length - 1; o >= 0; o--)
          if (t >= c[o].threshold) return c[o].color;
      default:
        return `rgb(${t * 255}, ${t * 255}, ${t * 255})`;
    }
  }
  paint() {
    const t = document.createElement("div");
    t.setAttribute("id", "tooltip");
    const n = this.container.parentElement;
    t.style.position = "absolute", t.style.backgroundColor = "rgba(0, 0, 0, 0.9)", t.style.color = "white", t.style.padding = "6px", t.style.borderRadius = "5px", t.style.opacity = "0", t.style.fontSize = "smaller", t.style.transition = "opacity 0.5s", t.style.pointerEvents = "none", n.appendChild(t);
    const e = this.container.width.baseVal.value, r = this.container.height.baseVal.value;
    this.container.style.height = r + 20;
    const l = e * 0.01, c = r * 0.01;
    this.data.forEach((o, d) => {
      let s = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      if (s.setAttribute(
        "x",
        Math.floor(d / this.options.y) * (e / this.options.x)
        // 列号
      ), s.setAttribute(
        "y",
        d % this.options.y * (r / this.options.y)
        // 行号
      ), s.setAttribute(
        "width",
        e / this.options.x - this.options.cellSpacing
      ), s.setAttribute(
        "height",
        r / this.options.y - this.options.cellSpacing
      ), s.setAttribute("fill", this.getColor(o[1], this.options.color)), s.setAttribute("rx", l), s.setAttribute("ry", c), this.container.appendChild(s), this.options.tipMonth.value) {
        const a = o[0].split("-")[2], i = o[0].split("-")[1];
        if (a == "01") {
          const h = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
          );
          h.textContent = this.options.tipMonth.format(parseInt(i, 10));
          const p = Math.floor(d / this.options.y) * (e / this.options.x) + 10;
          let f = r + 17;
          h.setAttribute("x", p), h.setAttribute("y", f), h.setAttribute("fill", "rgb(174, 174, 174)"), h.setAttribute("font-size", "14px"), h.setAttribute("text-anchor", "middle"), this.container.appendChild(h);
        }
      }
      this.options.tooltip.value && (s.addEventListener("mouseover", (a) => {
        t.style.opacity = "1", t.textContent = this.options.tooltip.format(o);
        const i = s.getBoundingClientRect(), h = i.left + i.width / 2 - t.offsetWidth / 2;
        t.style.left = `${h}px`, t.style.top = `${i.top - i.height * 2}px`;
      }), s.addEventListener("mouseout", () => {
        t.style.opacity = "0";
      }));
    });
  }
}
export {
  u as Heatmap
};
//# sourceMappingURL=heatmap.esm.js.map
