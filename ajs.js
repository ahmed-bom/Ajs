console.log("Abb: ({  Hi what are you doing here ?  })");
// ==================================
const log = console.log;
const js_to_css = (style) => {
  let css = "";
  for (const [key, val] of Object.entries(style)) {
    const property = key.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
    css += `${property}:${val};\n`;
  }
  return "{ " + css + " }";
};

// ==================================

const _mask = function (func) {
  func(this);
  return this;
};

const _set = function (obj) {
  Object.assign(this, obj);
  return this;
};

// ==============
const _attribute = function (attrs = {}) {
  for (const [key, val] of Object.entries(attrs)) this.setAttribute(key, val);
  return this;
};

const _textcontent = function (text) {
  if (typeof text === "string") this.textContent = text;
  return this;
};

// ==============

const _append = function (...nodes) {
  for (const n of nodes) {
    if (!n) continue;
    const node = typeof n === "string" ? document.createTextNode(n) : n;
    this.appendChild(node);
  }
  return this;
};

const _appendlist = function (nodes) {
  for (const n of nodes) {
    if (!n) continue;
    const node = typeof n === "string" ? document.createTextNode(n) : n;
    this.appendChild(node);
  }
  return this;
};

// ==============
const _style = function (style) {
  Object.assign(this.style, style);
  return this;
};

const _animate = function (keyframes, options) {
  const def = { duration: 100, easing: "ease-in-out" };
  Object.assign(def, options);
  this.animate(keyframes, def);
  return this;
};

// ==============
const _eventListener = function (ev, func, capture = false) {
  this.addEventListener(ev, func, capture);
  return this;
};

const _onclick = function (func) {
  if (func) this.onclick = () => func(this);
  return this;
};

const _click = function (func) {
  this.addEventListener("click", () => func(this));
  return this;
};

const _hover = function (keyframes, options) {
  const def = { fill: "forwards", duration: 100, easing: "ease-in-out" };
  Object.assign(def, options);
  // ==============
  if (this.hover) this.hover.cancel();
  this.hover = this.animate(keyframes, def);
  this.hover.pause();
  // ==============
  this.addEventListener("mouseenter", () => {
    this.hover.currentTime = 0;
    this.hover.playbackRate = 1;
    this.hover.play();
  });

  this.addEventListener("mouseleave", () => {
    this.hover.playbackRate = -1;
    this.hover.play();
  });

  return this;
};

// ==================================
const tag_count = {};

// colors_palette
const bc = "#0b0a0f"; // background
const fc = "#f5e6cc"; // forground
const c1 = "#ffba08"; // color 1
const c2 = "#1a1a2e"; // color 2

// ==================================

const tag = (name) => {
  if (name === "html" || name === "head" || name === "body") return;
  // ==============
  const element = document.createElement(name);
  const tagc = (tag_count[name] || 0) + 1;
  tag_count[name] = tagc;
  // ==============
  element.id = "_" + name + tagc;
  element.is_ajs = true;
  // ==============
  element._mask = _mask;
  element._set = _set;

  element._attribute = _attribute;
  element._textcontent = _textcontent;

  element._append = _append;
  element._appendlist = _appendlist;

  element._style = _style;
  element._animate = _animate;

  element._eventListener = _eventListener;
  element._onclick = _onclick;
  element._click = _click;
  element._hover = _hover;
  // ==============
  return element;
};

const html = () => {
  return document;
};

const head = () => {
  const h = document.head;
  if (h.is_ajs) return h;
  h.is_ajs = true;
  // ==============
  const h_style = document.createElement("style");
  h.appendChild(h_style);
  h.global_style = {};
  // ==============
  h._mask = _mask;
  h._set = _set;
  h._append = _append;

  h._style = function (style) {
    Object.assign(this.global_style, style);
    h_style.textContent = "* " + js_to_css(this.global_style);
    return this;
  };
  // ==============
  return h;
};

const body = () => {
  const b = document.body;
  if (b.is_ajs) return b;
  b.is_ajs = true;
  // ==============
  b._mask = _mask;
  b._set = _set;
  b._append = _append;
  b._style = _style;
  b._animate = _animate;
  // ==============
  return b;
};

const init = () => {
  head()._style({
    color: fc,
    margin: "5px",
    padding: "5px",
    borderColor: c1,
    borderRadius: "5px",
    boxSizing: "border-box",
    backgroundColor: "transparent",
  });
  return body()._style({
    margin: 0,
    padding: 0,
    width: "100%",
    backgroundColor: bc,
  });
};

// ==================================

const div = (id) => {
  const r_div = tag("div");
  if (id) r_div.id = id;
  return r_div;
};

const a = (text, href = "") => {
  return tag("a")
    ._style({ color: c1 })
    ._attribute({ href: href })
    ._textcontent(text);
};

const p = (text) => {
  return tag("p")._textcontent(text);
};

const hr = (w = "100px", h = "1px") => {
  return tag("hr")
    ._style({ padding: "0", margin: "10px" })
    ._style({ width: w, borderWidth: h });
};

const button = (text) => {
  return tag("button")
    ._textcontent(text)
    ._style({ borderStyle: "solid", cursor: "pointer" })
    ._hover({ backgroundColor: c1, color: bc })
    ._click((b) => b.hover.play());
};

const input = (type = "text") => {
  return tag("input")
    ._attribute({ type: type })
    ._hover({ backgroundColor: c2 })
    ._style({ outline: "none" });
};

const label = (text) => {
  return tag("label")._style({ color: c1 })._textcontent(text);
};

const canvas = (w = 800, h = 600) => {
  return tag("canvas")
    ._style({ borderStyle: "solid" })
    ._attribute({ width: w, height: h });
};

// ==============
const th = (node) => {
  return tag("th")
    ._style({ backgroundColor: c1, color: bc })
    ._style({ borderRadius: "0px" })
    ._append(node);
};

const td = (node) => {
  return tag("td")._style({ borderRadius: "0" })._append(node);
};

const trh = (data) => {
  const ths = [];
  for (const h of data) ths.push(th(h));
  return tag("tr")._appendlist(ths);
};

const trd = (data, is_mode_2 = false) => {
  const tds = [];
  // ==============
  if (is_mode_2)
    for (const c of data) tds.push(td(c)._style({ backgroundColor: c2 }));
  else for (const c of data) tds.push(td(c));
  // ==============
  return tag("tr")._style({ borderBottomStyle: "solid" })._appendlist(tds);
};

const table = (data = []) => {
  const trs = [];
  if (data[0]) trs.push(trh(data[0]));
  for (let i = 1; i < data.length; i++) trs.push(trd(data[i], i % 2 == 0));
  return tag("table")._style({ borderCollapse: "collapse" })._appendlist(trs);
};

// ==============

// ==================================

const flex = (id) => {
  return div(id)._style({ display: "flex", alignItems: "center" });
};

const copy = (get_val) => {
  return button("copy")._onclick(() =>
    navigator.clipboard.writeText(get_val()),
  );
};

const spinner = (size = 40) => {
  return div("_spinner")
    ._style({
      width: size + "px",
      height: size + "px",
      borderStyle: "solid dashed ",
      borderWidth: size / 10 + "px",
      borderRadius: "50%",
      willChange: "transform",
    })
    ._animate(
      [
        { transform: "rotate(0deg)" },
        { transform: "rotate(240deg)" },
        { transform: "rotate(360deg)" },
      ],
      { duration: 1000, iterations: "Infinity" },
    )
    ._hover({ borderColor: fc });
};

const textinp = (Label = "Input") => {
  // ==============
  const lab = label(Label)._style({ position: "absolute", margin: "0px" });
  const inp = input()
    ._style({ margin: "0px", borderStyle: "none" })
    ._eventListener("focus", () => {
      lab._animate({ transform: "translateY(-20px)" }, { fill: "forwards" });
    })
    ._eventListener("blur", function (e) {
      if (this.value == "" && e.relatedTarget !== x)
        lab._animate({ transform: "translateY(0px)" }, { fill: "forwards" });
    });

  const x = button("X")
    ._style({ margin: "0", borderStyle: "none" })
    ._click((b) => {
      inp.value = "";
      inp.focus();
    });

  return flex("_text_input")
    ._style({ width: "fit-content", borderBottomStyle: "solid" })
    ._style({ borderRadius: "0" })
    ._append(lab, inp, x)
    ._set({ val: () => inp.value });
};

const jtable = (data = [{}]) => {
  const keys = Object.keys(data[0]);
  const d = [keys];
  // ==============
  for (let i = 0; i < data.length; i++) {
    const arr = [];
    for (const k of keys) arr.push(String(data[i][k] ?? ""));
    d[i + 1] = arr;
  }
  return table(d);
};

// ==================================

const colorp = (hue = 0, lit = 50, on_change = () => {}, size_f = 15) => {
  // ==============
  const c_style = {
    flex: 1,
    height: size_f + "px",
    margin: "0px",
    padding: "0px",
    borderRadius: "0",
  };

  const cir_style = {
    height: size_f * 1.5 + "px",
    width: size_f * 1.5 + "px",
    borderRadius: "50%",
    borderStyle: "solid",
    position: "absolute",
  };

  const col_style = {
    width: size_f * 2.5 + "px",
    height: size_f * 2.5 + "px",
  };

  const picker_style = { borderStyle: "none solid", width: size_f * 36 + "px" };
  const selec_style = { margin: "0px", flex: 1 };

  // ==============
  const cir_hue = div("selec hue")._style(cir_style);
  const cir_lit = div("selec light")._style(cir_style);
  const sel_hue = flex("hue")._append(cir_hue);
  const sel_lit = flex("light")._append(cir_lit);

  const select = div("selected")._style(selec_style)._append(sel_hue, sel_lit);
  const color = div("color")._style(col_style);

  // ==============
  const set_cir = (cir, to) => {
    cir.style.left = to.offsetLeft - (size_f - to.style.width) + "px";
    cir.style.backgroundColor = to.style.backgroundColor;
  };

  // ==============
  const picker = flex("color_picker")
    ._style(picker_style)
    ._set({ hue: hue, lit: lit })
    ._set({ hue_click: false, lit_click: false })
    ._append(color, select);

  window.addEventListener("mouseup", () => {
    picker.hue_click = false;
    picker.lit_click = false;
  });

  const hues = [];
  const lits = [];

  // ==============
  picker.on_change = on_change;
  picker._change = function (hue, lit) {
    if (hue || hue == 0) {
      set_cir(cir_hue, hues[hue]);
      this.hue = hue;
      for (let i = 0; i < 100; i++)
        lits[i].style.backgroundColor = `hsl(${hue},100%,${i}%)`;
    }
    if (lit || lit == 0) {
      set_cir(cir_lit, lits[lit]);
      this.lit = lit;
    }
    this.on_change(this.hue, this.lit);
    color.style.backgroundColor = `hsl(${this.hue},100%,${this.lit}%)`;
  };

  // ==============
  for (let i = 0; i < 361; i++) {
    const c = div()
      ._style(c_style)
      ._style({ backgroundColor: `hsl(${i},100%,50%)` })
      ._click(() => picker._change(i))
      ._eventListener("mousedown", () => (picker.hue_click = true))
      ._eventListener("mouseenter", () => {
        if (picker.hue_click) picker._change(i);
      });
    hues.push(c);
  }

  for (let i = 0; i < 101; i++) {
    const c = div()
      ._style(c_style)
      ._style({ backgroundColor: `hsl(${hue},100%,${i}%)` })
      ._click(() => picker._change(null, i))
      ._eventListener("mousedown", () => (picker.lit_click = true))
      ._eventListener("mouseenter", () => {
        if (picker.lit_click) picker._change(null, i);
      });
    lits.push(c);
  }

  requestAnimationFrame(() => picker._change(hue));
  requestAnimationFrame(() => picker._change(null, lit));

  sel_hue._appendlist(hues);
  sel_lit._appendlist(lits);

  // ==============
  return picker;
};
