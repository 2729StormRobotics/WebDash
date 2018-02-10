// Define UI elements
let ui = {
    timer: document.getElementById('timer'),
    robotState: document.getElementById('robot-state').firstChild,
    robotDiagram: {
        arm: document.getElementById('robot-arm')
    },
    example: {
        button: document.getElementById('example-button'),
        readout: document.getElementById('example-readout').firstChild
    },
    autoSelect: document.getElementById('auto-select'),
    armPosition: document.getElementById('arm-position'),
    fieldInfo: document.getElementById('storm-field-info'),
    alliance: document.getElementById('storm-alliance'),
    gear: document.getElementById('storm-gear'),
    pto: document.getElementById('storm-pto'),
    acceleration: document.getElementById('storm-acceleration'),
    arm: document.getElementById('storm-arm'),
    fieldImg: document.getElementById('img-field'),
    scaleImg: document.getElementById('img-scale'),
    closeSwitchImg: document.getElementById('img-switch-close'),
    farSwitchImg: document.getElementById('img-switch-far')


};

// Key Listeners

let testIfRed;
let gameData;

// Constants for field Elements
let DEF_FIELD_X = 0;
let DEF_SCALE_X = 475;
let DEF_CLOSE_SWITCH_X = 470;
let DEF_FAR_SWITCH_X = 470;

let DEF_FIELD_Y = 60;
let DEF_SCALE_Y = 165;
let DEF_CLOSE_SWITCH_Y = 352;
let DEF_FAR_SWITCH_Y = 4;


// Offsets position all field elements as a whole
let OFFSET_X = 220;
let OFFSET_Y = 2;

ui.gear.innerHTML = "NOT A TEST";

//ui.closeSwitchImg.style.transform = `rotate(-90deg)`;
ui.fieldImg.style.left = (OFFSET_X + DEF_FIELD_X) + "px"
ui.scaleImg.style.left = (OFFSET_X + DEF_SCALE_X) + "px"
ui.closeSwitchImg.style.left = (OFFSET_X + DEF_CLOSE_SWITCH_X) + "px"
ui.farSwitchImg.style.left = (OFFSET_X + DEF_FAR_SWITCH_X) + "px"

ui.fieldImg.style.top = (OFFSET_Y + DEF_FIELD_Y) + "px"
ui.scaleImg.style.top = (OFFSET_Y + DEF_SCALE_Y) + "px"
ui.closeSwitchImg.style.top = (OFFSET_Y + DEF_CLOSE_SWITCH_Y) + "px"
ui.farSwitchImg.style.top = (OFFSET_Y + DEF_FAR_SWITCH_Y) + "px"

function drawPowerUpField() {


  if (testIfRed == false) {
    ui.fieldImg.style.transform = `rotate(90deg)`
    if (gameData.slice(0, 1) == "L") {
      ui.closeSwitchImg.style.transform = `rotate(90deg)`
    } else {
      ui.closeSwitchImg.style.transform = `rotate(-90deg)`
    }
    if (gameData.slice(1, 2) == "L") {
      ui.scaleImg.style.transform = `rotate(90deg)`
    } else {
      ui.scaleImg.style.transform = `rotate(-90deg)`
    }
    if (gameData.slice(2) == "L") {
      ui.farSwitchImg.style.transform = `rotate(90deg)`
    } else {
      ui.farSwitchImg.style.transform = `rotate(-90deg)`
    }
  } else {
    ui.fieldImg.style.transform = `rotate(-90deg)`
    if (gameData.slice(0, 1) == "L") {
      ui.closeSwitchImg.style.transform = `rotate(-90deg)`
    } else {
      ui.closeSwitchImg.style.transform = `rotate(90deg)`
    }
    if (gameData.slice(1, 2) == "L") {
      ui.scaleImg.style.transform = `rotate(-90deg)`
    } else {
      ui.scaleImg.style.transform = `rotate(90deg)`
    }
    if (gameData.slice(2) == "L") {
      ui.farSwitchImg.style.transform = `rotate(-90deg)`
    } else {
      ui.farSwitchImg.style.transform = `rotate(90deg)`
    }
  }

};


// TODO Get alliance (boolean)
NetworkTables.addKeyListener('/FMSInfo/IsRedAlliance', (key, value) => {
    // Set class active if value is true and unset it if it is false
    ui.alliance.innerHTML = 'Is Red Alliance: ' + value;
    testIfRed = value;

    drawPowerUpField();

});




// TODO Get field information (string)
NetworkTables.addKeyListener('/FMSInfo/GameSpecificMessage', (key, value) => {
    // Set class active if value is true and unset it if it is false
    ui.fieldInfo.innerHTML = 'Field Data: ' + value;
    gameData = value;

    drawPowerUpField();

});




// TODO Get Gear status (boolean)
NetworkTables.addKeyListener('/StormDashboard/Gear', (key, value) => {
    // Set class active if value is true and unset it if it is false
    ui.gear.innerHTML = 'Gear setting: ' + value;
});
// TODO Get PTO status (boolean)
NetworkTables.addKeyListener('/StormDashboard/PTO', (key, value) => {
    // Set class active if value is true and unset it if it is false
    ui.pto.innerHTML = 'Power Take Off: ' + value;
});
// TODO Get Accel toggle (boolean)
NetworkTables.addKeyListener('/StormDashboard/Acceleration', (key, value) => {
    // Set class active if value is true and unset it if it is false
    ui.acceleration.innerHTML = 'Acceleration: ' + value;
});
// TODO Get Arm position (boooooolean)
NetworkTables.addKeyListener('/StormDashboard/Arm', (key, value) => {
    // Set class active if value is true and unset it if it is false
    ui.arm.innerHTML = 'Arm Position: ' + value;
});

// Error catcher
addEventListener('error',(ev)=>{
    ipc.send('windowError',ev)
})
