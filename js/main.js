const firebaseConfig = {
  apiKey: "AIzaSyCHy5OBg92DQry1jEOhoefpIQQXsvQwVm8",
  authDomain: "bms-fcu-final.firebaseapp.com",
  databaseURL: "https://bms-fcu-final-default-rtdb.firebaseio.com",
  projectId: "bms-fcu-final",
  storageBucket: "bms-fcu-final.appspot.com",
  messagingSenderId: "984749584972",
  appId: "1:984749584972:web:54c8986056c52289ca3ae9",
  measurementId: "G-CM4XVQ42XL",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const dbRefTemp = firebase.database().ref("TF228WNM");
const dbRefMonitor = firebase.database().ref("Monitor");
const dbRefCtrl = firebase.database().ref("Control");

function triggerColor(selector, val, mess) {
  if (val != document.querySelector(selector).innerHTML) {
    document.querySelector(selector).innerHTML = `${mess}: ${val}`;
    document.querySelector(selector).parentNode.style.background = "blue";
  }
  setTimeout(() => {
    document.querySelector(selector).parentNode.style.background = "#4CAF50";
  }, 2000);
}


document.querySelector(".stop").addEventListener("click", () => {
    dbRefCtrl.child("Run com").set(1);
    window.alert("Lệnh dừng khẩn cấp đã được thực thi")
});