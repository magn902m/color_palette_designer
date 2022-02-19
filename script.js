`use strict`;

// Info about hsl: https://en.wikipedia.org/wiki/HSL_and_HSV

window.addEventListener("DOMContentLoaded", setup);

const HTML = {};

function setup() {
  console.log("setup");
  HTML.input = document.querySelector("#colorwheel");
  HTML.harmony = document.querySelector("#harmony");
  HTML.hexValue = document.querySelector(".hex");
  HTML.rgbValue = document.querySelector(".rgb");
  HTML.cssValue = document.querySelector(".css");
  HTML.hslValue = document.querySelector(".hsl");
  HTML.colorBox = document.querySelector(".color_box");
  HTML.colorBody = document.querySelector("body");
  HTML.color1 = document.querySelector(".color_1 div");
  HTML.color2 = document.querySelector(".color_2 div");
  HTML.color3 = document.querySelector(".color_3 div");
  HTML.color4 = document.querySelector(".color_4 div");
  HTML.color5 = document.querySelector(".color_5 div");

  HTML.hexValue.textContent = `hex: ${HTML.input.value}`;
  HTML.rgbValue.textContent = "rgb: 255, 255, 255";
  HTML.cssValue.textContent = "css: rgb(255, 255, 255)";
  HTML.hslValue.textContent = "hsl: 0, 0, 100";
  HTML.colorBox.style.backgroundColor = `${HTML.input.value}`;

  getColor();
  // console.log(HTML);
}

// ***** Model *****
function getColor() {
  setRandomColor();
  HTML.input.addEventListener("input", (elm) => {
    let inputColorValue = HTML.input.value;
    let harmonyValue = HTML.harmony.value;
    let hexColorValue, rgbColorValue, cssColorValue, hslColorValue;

    // HEX
    hexColorValue = `${inputColorValue}`;
    // console.log(hexColorValue);

    // RGB
    rgbColorValue = hexToRGB(hexColorValue);
    // console.log(rgbColorValue);

    // CSS
    cssColorValue = rgbToCSS(rgbColorValue);
    // console.log(cssColorValue);

    // HSL
    hslColorValue = rgbToHSL(rgbColorValue);
    // console.log(hslColorValue);

    // RGB to HEX
    // rgbToHex(rgbColorValue);

    displayColors(hexColorValue, rgbColorValue, cssColorValue, hslColorValue, harmonyValue);
  });
}

// ***** View *****
function displayColors(hexV, rgbV, cssV, hslV, harmonyValue) {
  // console.log("displayColors");
  // console.log(hexV, rgbV, cssV, hslV);
  displayColorBox(hexV);
  displayHEX(hexV);
  displayRGB(rgbV);
  displayCSS(cssV);
  displayHSL(hslV);

  if (harmonyValue === "0") {
    displayAnalogous(hslV);
  } else if (harmonyValue === "1") {
    displayMonochromatic(hslV);
  } else if (harmonyValue === "2") {
    displayTriad(hslV);
  } else if (harmonyValue === "3") {
    displayComplementary(hslV);
  } else if (harmonyValue === "4") {
    displayCompound(hslV);
  } else if (harmonyValue === "5") {
    displayShades(hslV);
  }
}

// ***** Controller *****
// --- Create random color ---
function setRandomColor() {
  const newColor = randomColor();
  HTML.colorBox.style.setProperty("background-color", newColor);
  HTML.input.style.setProperty("value", newColor);
}

function calcRandom(min, max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

function randomColor() {
  return "rgb(" + calcRandom(0, 255) + ", " + calcRandom(0, 255) + ", " + calcRandom(0, 255) + ")";
}

function hexToRGB(hexCode) {
  // console.log("hexToRGB");
  let r = parseInt(hexCode.substring(1, 3), 16);
  let g = parseInt(hexCode.substring(3, 5), 16);
  let b = parseInt(hexCode.substring(5, 7), 16);

  let rgbObj = { r, g, b };
  return rgbObj;
}

function rgbToCSS(rgbObj) {
  let r = rgbObj.r;
  let g = rgbObj.g;
  let b = rgbObj.b;
  let rgbCSS = { r, g, b };

  return rgbCSS;
}

function rgbToHex(rgbObj) {
  // console.log("rgbToHex");
  let r = rgbObj.r;
  let g = rgbObj.g;
  let b = rgbObj.b;
  let hexCode =
    ("0" + r.toString(16)).slice(-2) +
    ("0" + g.toString(16)).slice(-2) +
    ("0" + b.toString(16)).slice(-2);
  // console.log(`#${hexCode}`);
  return hexCode;
}

function rgbToHSL(rgbObj) {
  // console.log("rgbToHSL");

  let r = rgbObj.r;
  let g = rgbObj.g;
  let b = rgbObj.b;

  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  // let hslObj = { h, s, l };
  let hslObj = { h: Math.floor(h), s: Math.floor(s), l: Math.floor(l) };
  return hslObj;
}

function hslToRGB(hslObj) {
  let h = hslObj.h,
    s = hslObj.s,
    l = hslObj.l;
  //   let h = hslObj.h;
  //   let s = hslObj.s;
  //   let l = hslObj.l;

  h = h;
  s = s / 100;
  l = l / 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b };
}

function displayColorBox(hexV) {
  HTML.colorBox.style.backgroundColor = `${hexV}`;
  //   HTML.colorBody.style.backgroundColor = `${hexV}`;
}

function displayHEX(hexV) {
  HTML.hexValue.textContent = `hex: ${hexV}`;
}

function displayRGB(rgbV) {
  HTML.rgbValue.textContent = `rgb: ${rgbV.r}, ${rgbV.g}, ${rgbV.b}`;
}

function displayCSS(cssV) {
  //   console.log(cssV);
  HTML.cssValue.textContent = `css: rgb(${cssV.r}, ${cssV.g}, ${cssV.b})`;
}

function displayHSL(hslV) {
  // HTML.hslValue.textContent =
  //   "hsl: " + hslV.h.toFixed(0) + "%. " + hslV.s.toFixed(0) + "%. " + hslV.l.toFixed(0) + "%";
  HTML.hslValue.textContent = `hsl: ${hslV.h}, ${hslV.s}, ${hslV.l}`;
}

// *** Harmonies ***

function displayAnalogous(hslObj) {
  //   console.log("displayAnalogous");
  let newHSLObj = calcAnalogous(hslObj);
  HTML.color1.style.setProperty(
    "background-color",
    `hsl(${newHSLObj[0].h}, ${newHSLObj[0].s}%, ${newHSLObj[0].l}%)`
  );
  HTML.color2.style.setProperty(
    "background-color",
    `hsl(${newHSLObj[1].h}, ${newHSLObj[1].s}%, ${newHSLObj[1].l}%)`
  );
  HTML.color3.style.setProperty("background-color", `hsl(${hslObj.h}, ${hslObj.s}%, ${hslObj.l}%)`);
  HTML.color4.style.setProperty(
    "background-color",
    `hsl(${newHSLObj[2].h}, ${newHSLObj[2].s}%, ${newHSLObj[2].l}%)`
  );
  HTML.color5.style.setProperty(
    "background-color",
    `hsl(${newHSLObj[3].h}, ${newHSLObj[3].s}%, ${newHSLObj[3].l}%)`
  );
  calcAllColorValueText(hslObj, newHSLObj);
}

function calcAnalogous(hslObj) {
  let hslArr = [];
  hslArr.push({ h: hslObj.h / 2, s: hslObj.s, l: hslObj.l });
  hslArr.push({ h: hslObj.h / 4, s: hslObj.s, l: hslObj.l });
  hslArr.push({ h: hslObj.h / 6, s: hslObj.s, l: hslObj.l });
  hslArr.push({ h: hslObj.h / 8, s: hslObj.s, l: hslObj.l });
  //   console.log(hslArr);
  return hslArr;
}

function displayMonochromatic() {
  console.log("displayMonochromatic");
}

function displayTriad() {
  console.log("displayTriad");
}

function displayComplementary() {
  console.log("displayComplementary");
}

function displayCompound() {
  console.log("displayCompound");
}

function displayShades() {
  console.log("displayShades");
}

// *** Harmonies value in text ***
function calcAllColorValueText(hslObj, newHSLObj) {
  //   console.log(hslObj);
  //   console.log(newHSLObj);

  //   color1Text(newHSLObj);
  displayText(hslObj, newHSLObj);
}

function displayText(hslObj, newHSLObj) {
  let hexV, rgbV, cssV, hslV;
  //   let hslObj;
  console.log(newHSLObj);

  let colorVTxt = document.querySelectorAll(`#color_harmonies [class*="color_txt"] > div > p`);

  colorVTxt.forEach((elm) => {
    // console.log(newHSLObj);
    // console.log(elm);
    for (let i = 1; i <= 5; i++) {
      if (i === 1 || i === 2) {
        hslV = newHSLObj[i - 1];
        console.log(`Color_${i}: `, newHSLObj[i - 1]);
        rgbV = hslToRGB(hslV);
        hexV = rgbToHex(rgbV);
        cssV = rgbToCSS(rgbV);
      } else if (i === 3) {
        console.log(`Color_3 "User":`, hslObj);
        hslV = hslObj;
        rgbV = hslToRGB(hslV);
        hexV = rgbToHex(rgbV);
        cssV = rgbToCSS(rgbV);
      } else if (i === 4 || i === 5) {
        hslV = newHSLObj[i - 2];
        console.log(`Color_${i}: `, newHSLObj[i - 2]);
        rgbV = hslToRGB(hslV);
        hexV = rgbToHex(rgbV);
        cssV = rgbToCSS(rgbV);
      }

      document.querySelector(`.color_${i} p`).textContent = `hex: #${hexV}`;
      document.querySelector(
        `.color_${i} p:nth-child(2)`
      ).textContent = `rgb: ${rgbV.r}, ${rgbV.g}, ${rgbV.b}`;
      document.querySelector(
        `.color_${i} p:nth-child(3)`
      ).textContent = `css: rgb(${cssV.r},${cssV.g},${cssV.b})`;
      document.querySelector(`.color_${i} p:last-child`).textContent = `hsl: ${Math.floor(
        hslV.h
      )}, ${Math.floor(hslV.s)}, ${Math.floor(hslV.l)}`;
    }
  });
}

function color1Text(newHSLObj) {
  let hexV, rgbV, cssV, hslV;
  // HSL
  hslV = newHSLObj[0];
  // RGB
  rgbV = hslToRGB(hslV);
  // HEX
  hexV = rgbToHex(rgbV);
  // console.log(hexV);
  // CSS
  cssV = rgbToCSS(rgbV);

  document.querySelector(`.color_1 p`).textContent = `hex: ${hexV}`;
  document.querySelector(
    ".color_1 p:nth-child(2)"
  ).textContent = `rgb: ${rgbV.r}, ${rgbV.g}, ${rgbV.b}`;
  document.querySelector(
    ".color_1 p:nth-child(3)"
  ).textContent = `css: rgb(${cssV.r},${cssV.g},${cssV.b})`;
  document.querySelector(
    ".color_1 p:last-child"
  ).textContent = `hsl: ${hslV.h}, ${hslV.s}, ${hslV.l}`;
}
