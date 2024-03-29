const dbRefTemp = firebase.database().ref("TF228WNM");
const dbRefMonitor = firebase.database().ref("Monitor");
const dbRefCtrl = firebase.database().ref("Control");

let sensorItv;

function triggerColor(selector, val, mess) {
  if (val != document.querySelector(selector).innerHTML) {
    document.querySelector(selector).innerHTML = `${mess}`;
    document.querySelector(selector).parentNode.style.background = "blue";
  }
  setTimeout(() => {
    document.querySelector(selector).parentNode.style.background = "#4CAF50";
  }, 2000);
}

dbRefMonitor.child("Current").on("value", (snap) => {
  const val = snap.node_.children_.root_.left.value.value_;
  triggerColor("#current", val, `Dòng điện ${val} A`);
});

dbRefMonitor.child("Power").on("value", (snap) => {
  const val = snap.node_.children_.root_.left.value.value_;
  triggerColor("#power", val, `Công suất ${val} kW`);
});

dbRefMonitor.child("frequency").on("value", (snap) => {
  const val = snap.node_.children_.root_.left.value.value_;
  triggerColor("#frequency", val, `Tần số ${val} Hz`);
});

dbRefMonitor.child("Speed").on("value", (snap) => {
  const val = snap.node_.children_.root_.left.value.value_;
  triggerColor("#speed", val, `Tốc độ ${val} RPM`);
});

dbRefMonitor.child("Voltage").on("value", (snap) => {
  const val = snap.node_.children_.root_.left.value.value_;
  triggerColor("#voltage", val, `Điện áp ${val} V`);
});

dbRefMonitor.child("ACC").on("value", (snap) => {
  const val = snap.node_.children_.root_.left.value.value_;
  triggerColor("#accu", val, `ACC   ${val} S`);
});

dbRefMonitor.child("DEC").on("value", (snap) => {
  const val = snap.node_.children_.root_.left.value.value_;
  triggerColor("#decr", val, `DEC ${val} S`);
});

dbRefMonitor.child("Fre ref").on("value", (snap) => {
  const val = snap.node_.children_.root_.left.value.value_;
  triggerColor("#freref", val, `Fre ref ${val} HZ`);
});

dbRefMonitor.child("Para lock").on("value", (snap) => {
  const val = snap.node_.children_.root_.left.value.value_;
  triggerColor("#paralock", val, `Para lock ${val}`);
});

dbRefMonitor.child("Run com").on("value", (snap) => {
  const val = snap.node_.children_.root_.left.value.value_;
  triggerColor("#runcom", val, `Run com ${val}`);
  console.log(val == "1");
  if (val == "1") {
    clearInterval(sensorItv);
  }
});

const styleCSS = document.querySelector("link[href='triangleCSS/style.css']");

dbRefMonitor.child("UI01").on("value", (snap) => {
  const val = snap.node_.children_.root_.left.value.value_;
  document.querySelector(".warning h1").innerHTML = val;

  dbRefMonitor.child("Run com").on("value", (snap) => {
    const runComVal = snap.node_.children_.root_.left.value.value_;
    if (parseFloat(val) == 0 && runComVal != "1") {
      let tg = true;
      sensorItv = setInterval(() => {
        if (tg) {
          document.querySelector("link[href='triangleCSS/style.css']").href =
            "triangleCSS/style2.css";
          tg = false;
        } else {
          document.querySelector("link[href='triangleCSS/style2.css']").href =
            "triangleCSS/style.css";
          tg = true;
        }
      }, 500);
    } else {
      clearInterval(sensorItv);
      if (document.querySelector("link[href='triangleCSS/style2.css']")) {
        document.querySelector("link[href='triangleCSS/style2.css']").href =
          "triangleCSS/style.css";
      }
    }
  });
});
