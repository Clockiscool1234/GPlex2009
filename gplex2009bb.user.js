// ==UserScript==
// @name        GPlex 2009 Basic Buttons
// @namespace   Violentmonkey Scripts
// @match       https://www.google.com/*
// @icon        data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGnRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xMDD0cqEAAAM5SURBVDhPTZN9TNVVGMefey62ZCTwh21NLdbKTGOtzeLlSqQtFqymzdRoU7cs/8le/urFbi3BS2GpmEaCvbJ2E3MGFOidhZVa5BioCytI3rIk7xW4F3b1+rvcT8/vWFt/PHvOOTvft+d3fgKIk4TOvmFy1gZJe+gTqvafIpVKkoiOcbS4kB6PcMUYpkS0DHHdj+raxUrSQS/DsspDyKoQZl0nM574mt//ilmS+M89nM9I/xfstd0liEgag0YQF+w4DrdsaEPWdSDru5Hy76j84rQlVg4GS0pIiIekV2wfV6KwkgwombgX3PL52zGrf8Cs78A8foxV27rUoWNJzi5fxqQq/udiQsF/6rrXeJWAKdyqaDyNLA+R9uQJzGPfUF7TwZSLvgw/3j6P72+4hua52bTlZNOZNc3ad2cjfUMXrcpINM68Da3Io4eZsTpEqPucPa9r3sOc53OQd/Pw1hYh7/iYXn0PhU/lsmVBJnLbmo/Y334GlWMsluDjI/30Dl+06oFDdUjFHXjrfXh3FyK1eXhqC/Ds0PXOYjxvLEFmrtxL1tL3WfJckM0N7XbybvYjvT9hXrwJ2XM3UpeH1Ct41yJbsj0fz5YiJbhXHZQ3MHvFp1xb9iHZD+5mYCRq1Yci55hb/wiyK9eqmvd8us63EWS7gpVAqnV/c+k28td8wMrXWni25lu6e0ctgTvYcCxMyd6n8WzNVfuq7IL/T7BZK3j4JOFR/RI6sCvjPYycbaK/u5ZLExeunulLKw0+oyTzNbcq1vgwbxUgbyphQMuNPPH3Sbqa8hloSuePVmH4gOFM43yikd/sTH4ZGeS6qmIFF+B9exGmWpUDmn+T1mVnks5gHmNfCanjBudoOvH26VzYJ/Q1lV2NoyK37lihmRciWzVCVRHTNt2PvKoEsUg/vzbM4lIoi2gog1hrJuMtmUx+OYvzn98JiQniToo5gTIF6jADi7Wri9fvQ15RJ04yxcDBtUQ+y2C8+XqiLTMtOLrvRkaP+e0cGk8cxPvCXXgq9T1UaBRXeaPWy+rC/s6TEcLH/Yy1LSXa/ID2h4l37SThxDk11M/sl0oVsBDjV7DfVdbhbVysUOQfPFOSQg11AUoAAAAASUVORK5CYII=
// @grant       none
// @version     1.0
// @author      -
// @description 3/16/2026, 7:36:09 PM
// ==/UserScript==

function waitForElement(selector, callback) {
    const interval = setInterval(() => {
        const element = document.querySelector(selector);
        if (element) {
            clearInterval(interval);
            callback(element);
        }
    }, 100); // Check every 100ms
}

const cssStyle = `button.searchbtn {
	all: revert;
	font-size: 15px;
	height: 1.85em !important;
	margin: .2em;
}
button.searchbtn-small {
	all: revert;
	font-size: 13px;
  margin-top: -5px;
  margin-left: 11px;
}
#ugf-hp-buttons-row {
	margin-top: 0 !important;
}
#ugf-hp-buttons {
	height: 38px;
}
#ugf-search-btn, #ugf-search-btn-2, #ugf-lucky-btn {
	display: none !important;
}
#ugf-top #ugf-searchbar::after {
  left: 375px;
}`;
waitForElement("head", function(){
  const styleElem = document.createElement("style");
  styleElem.innerText = cssStyle;
  document.head.appendChild(styleElem);
});

if (window.location.pathname === "/search") {
  waitForElement("#ugf-search", function(){
    const searchBar = document.querySelector("#ugf-search");
    const sBtn = document.createElement("button");
    sBtn.classList.add("searchbtn-small");
    sBtn.addEventListener("click", ()=>{document.querySelector("#ugf-search-btn").click()});
    sBtn.innerText = "Search";
    searchBar.appendChild(sBtn);
  });
} else {
  waitForElement("#ugf-hp-buttons", function(){
    const btnRow = document.querySelector("#ugf-hp-buttons");

    const gsBtn = document.createElement("button");
    gsBtn.classList.add("searchbtn");
    gsBtn.addEventListener("click", ()=>{document.querySelector("#ugf-search-btn-2").click()});
    gsBtn.innerText = "Google Search";

    const iflBtn = document.createElement("button");
    iflBtn.classList.add("searchbtn");
    iflBtn.addEventListener("click", ()=>{document.querySelector("#ugf-lucky-btn").click()});
    iflBtn.innerText = "I'm Feeling Lucky";

    btnRow.appendChild(gsBtn);
    btnRow.appendChild(iflBtn);
  });
};
