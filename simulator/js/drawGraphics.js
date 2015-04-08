
var GREEN = '#336600';
var LIGHTGREEN = '#99FF66';
var RED  = '#E31E1E';
var BLACK = 'black';

var clickedWireStrokeWidth = 6;
var defaultWireStrokeWidth = 4;
var hintX = -16;
var hintY = -12;
var activeWire;



//cpu backgroung image
var raster = new Raster('cpux');
raster.position = view.center;



//Register Unit Drawings
var registers = new boxList(73,275,70,100,4); registers.draw();
var R0 = new PointText();
    R0.fillColor = 'black';
    R0.fontWeight = 'bold';
    R0.fontSize = '14px';
    R0.content = '0x0000';
    R0.set({position:registers.boxList[0].position});
var R1 = R0.clone();
R1.set({position:registers.boxList[1].position});
var R2 = R0.clone();
R2.set({position:registers.boxList[2].position});
var R3 = R0.clone();
R3.set({position:registers.boxList[3].position});


//ADDRRESS UNIT DRAWINGS
var addressUnit = new boxList(70,123,70,50,2); addressUnit.draw();
var PC = new PointText();
PC.fillColor = 'black';
PC.fontWeight = 'bold';
PC.fontSize = '14px';
PC.content = '0x0000';
PC.set({position:addressUnit.boxList[1].position});
var AR = PC.clone();
AR.set({position:addressUnit.boxList[0].position});


// InstructionRegister Drawings
var InstructionRegister = new boxList(591,82,70,25,1); InstructionRegister.draw();
var IR = new PointText();
IR.fillColor = 'black';
IR.fontWeight = 'bold';
IR.fontSize = '14px';
IR.content = '0x0000';
IR.set({position:InstructionRegister.boxList[0].position});

/* Code template
var sig = new Path();
sig.strokeColor = BLACK;
sig.strokeWidth = 4;
*/


var sigARINC = new Path();
sigARINC.add(new Point (375,225));
sigARINC.add(new Point (365,225));
sigARINC.add(new Point (365,175));
sigARINC.add(new Point (155,175));
sigARINC.strokeColor = BLACK;
sigARINC.strokeWidth = 4;

sigARINC.onMouseEnter = function(event){
    $('html,body').css('cursor','pointer');
}
sigARINC.onMouseLeave = function(event) {
    this.strokeWidth = defaultWireStrokeWidth;
    $('html,body').css('cursor','default');
}
sigARINC.onClick = function(event) {
    this.strokeWidth = clickedWireStrokeWidth;
}

var sigARLD = new Path();
sigARLD.add(new Point (415,206));
sigARLD.add(new Point (415,155));
sigARLD.add(new Point (155,155));
sigARLD.strokeColor = BLACK;
sigARLD.strokeWidth = 4;

sigARLD.onMouseEnter = function(event){
    $('html,body').css('cursor','pointer');
}
sigARLD.onMouseLeave = function(event) {
    this.strokeWidth = defaultWireStrokeWidth;
    $('html,body').css('cursor','default');
}
sigARLD.onClick = function(event) {
    this.strokeWidth = clickedWireStrokeWidth;
}

var sigARMUX = new Path();
sigARMUX.add(new Point (466,206));
sigARMUX.add(new Point (466,136));
sigARMUX.add(new Point (155,136));
sigARMUX.strokeColor = BLACK;
sigARMUX.strokeWidth = 4;

sigARMUX.onMouseEnter = function(event){
    $('html,body').css('cursor','pointer');
}
sigARMUX.onMouseLeave = function(event) {
    this.strokeWidth = defaultWireStrokeWidth;
    $('html,body').css('cursor','default');
}
sigARMUX.onClick = function(event) {
    this.strokeWidth = clickedWireStrokeWidth;
}

var sigPCLD = new Path();
sigPCLD.add(new Point (375,245));
sigPCLD.add(new Point (355,245));
sigPCLD.add(new Point (355,196));
sigPCLD.add(new Point (155,196));
sigPCLD.strokeColor = BLACK;
sigPCLD.strokeWidth = 4;

sigPCLD.onMouseEnter = function(event){
    $('html,body').css('cursor','pointer');
}
sigPCLD.onMouseLeave = function(event) {
    this.strokeWidth = defaultWireStrokeWidth;
    $('html,body').css('cursor','default');
}
sigPCLD.onClick = function(event) {
    this.strokeWidth = clickedWireStrokeWidth;
}

var sigPCINC = new Path();
sigPCINC.add(new Point (375,265));
sigPCINC.add(new Point (346,265));
sigPCINC.add(new Point (346,215));
sigPCINC.add(new Point (155,215));
sigPCINC.strokeColor = BLACK;
sigPCINC.strokeWidth = 4;

sigPCINC.onMouseEnter = function(event){
    $('html,body').css('cursor','pointer');
}
sigPCINC.onMouseLeave = function(event) {
    this.strokeWidth = defaultWireStrokeWidth;
    $('html,body').css('cursor','default');
}
sigPCINC.onClick = function(event) {
    this.strokeWidth = clickedWireStrokeWidth;
}

var sigREGWT = new Path();
sigREGWT.add(new Point (375,285));
sigREGWT.add(new Point (335,285));
sigREGWT.add(new Point (335,255));
sigREGWT.add(new Point (126,255));
sigREGWT.add(new Point (126,266));
sigREGWT.strokeColor = BLACK;
sigREGWT.strokeWidth = 4;

sigREGWT.onMouseEnter = function(event){
    $('html,body').css('cursor','pointer');
}
sigREGWT.onMouseLeave = function(event) {
    this.strokeWidth = defaultWireStrokeWidth;
    $('html,body').css('cursor','default');
}
sigREGWT.onClick = function(event) {
    this.strokeWidth = clickedWireStrokeWidth;
}

var sigMEMWT = new Path();
sigMEMWT.add(new Point (506,235));
sigMEMWT.add(new Point (516,235));
sigMEMWT.add(new Point (516,125));
sigMEMWT.add(new Point (345,125));
sigMEMWT.add(new Point (366,125));
sigMEMWT.add(new Point (366,35));
sigMEMWT.add(new Point (381,35));
sigMEMWT.strokeColor = BLACK;
sigMEMWT.strokeWidth = 4;

sigMEMWT.onMouseEnter = function(event){
    $('html,body').css('cursor','pointer');
}
sigMEMWT.onMouseLeave = function(event) {
    this.strokeWidth = defaultWireStrokeWidth;
    $('html,body').css('cursor','default');
}
sigMEMWT.onClick = function(event) {
    this.strokeWidth = clickedWireStrokeWidth;
}

var sigMEMREAD = new Path();
sigMEMREAD.add(new Point (325,125));
sigMEMREAD.add(new Point (305,125));
sigMEMREAD.add(new Point (305,95));
sigMEMREAD.strokeColor = BLACK;
sigMEMREAD.strokeWidth = 4;

sigMEMREAD.onMouseEnter = function(event){
    $('html,body').css('cursor','pointer');
}
sigMEMREAD.onMouseLeave = function(event) {
    this.strokeWidth = defaultWireStrokeWidth;
    $('html,body').css('cursor','default');
}
sigMEMREAD.onClick = function(event) {
    this.strokeWidth = clickedWireStrokeWidth;
}



var sigIRLD = new Path();
sigIRLD.add(new Point (506,255));
sigIRLD.add(new Point (556,255));
sigIRLD.add(new Point (556,126));
sigIRLD.strokeColor = BLACK;
sigIRLD.strokeWidth = 4;

sigIRLD.onMouseEnter = function(event){
    $('html,body').css('cursor','pointer');
}
sigIRLD.onMouseLeave = function(event) {
    this.strokeWidth = defaultWireStrokeWidth;
    $('html,body').css('cursor','default');
}
sigIRLD.onClick = function(event) {
    this.strokeWidth = clickedWireStrokeWidth;
}

var sigFLAGWT = new Path();
sigFLAGWT.add(new Point (436,336));
sigFLAGWT.add(new Point (436,435));
sigFLAGWT.strokeColor = BLACK;
sigFLAGWT.strokeWidth = 4;

sigFLAGWT.onMouseEnter = function(event){
    $('html,body').css('cursor','pointer');
}
sigFLAGWT.onMouseLeave = function(event) {
    this.strokeWidth = defaultWireStrokeWidth;
    $('html,body').css('cursor','default');
}
sigFLAGWT.onClick = function(event) {
    this.strokeWidth = clickedWireStrokeWidth;
}

var sigMUX1 = new Path();
sigMUX1.add(new Point (506,306));
sigMUX1.add(new Point (516,306));
sigMUX1.add(new Point (516,536));
sigMUX1.add(new Point (85,536));
sigMUX1.add(new Point (85,520));
sigMUX1.strokeColor = BLACK;
sigMUX1.strokeWidth = 4;

sigMUX1.onMouseEnter = function(event){
    $('html,body').css('cursor','pointer');
}
sigMUX1.onMouseLeave = function(event) {
    this.strokeWidth = defaultWireStrokeWidth;
    $('html,body').css('cursor','default');
}
sigMUX1.onClick = function(event) {
    this.strokeWidth = clickedWireStrokeWidth;
}

var sigMUX0 = new Path();
sigMUX0.add(new Point (476,336));
sigMUX0.add(new Point (476,525));
sigMUX0.add(new Point (96,525));
sigMUX0.add(new Point (96,519));
sigMUX0.strokeColor = BLACK;
sigMUX0.strokeWidth = 4;

sigMUX0.onMouseEnter = function(event){
    $('html,body').css('cursor','pointer');
}
sigMUX0.onMouseLeave = function(event) {
    this.strokeWidth = defaultWireStrokeWidth;
    $('html,body').css('cursor','default');
}
sigMUX0.onClick = function(event) {
    this.strokeWidth = clickedWireStrokeWidth;
}

var wireZF = new Path();
wireZF.add(new Point (406,336));
wireZF.add(new Point (406,434));
wireZF.strokeColor = BLACK;
wireZF.strokeWidth = 4;

wireZF.onMouseEnter = function(event){
    $('html,body').css('cursor','pointer');
}
wireZF.onMouseLeave = function(event) {
    this.strokeWidth = defaultWireStrokeWidth;
    $('html,body').css('cursor','default');
}
wireZF.onClick = function(event) {
    this.strokeWidth = clickedWireStrokeWidth;
}

var clockPulsePosEdge = new Path();
clockPulsePosEdge.add(new Point (41,74));
clockPulsePosEdge.add(new Point (41,79));
clockPulsePosEdge.add(new Point (35,79));
clockPulsePosEdge.add(new Point (35,71));
clockPulsePosEdge.add(new Point (29,71));
clockPulsePosEdge.add(new Point (29,76));
clockPulsePosEdge.strokeColor = GREEN;
clockPulsePosEdge.strokeWidth = 2;

var clockPulseNegEdge = clockPulsePosEdge.clone();
clockPulsePosEdge.strokeColor = LIGHTGREEN;
clockPulseNegEdge.scale(-1,1);
clockPulseNegEdge.visible = false;



//Clock Wires
var wireCLOCK_CONTAINER = [];
var wireCLOCK = new Path();
wireCLOCK.strokeColor = LIGHTGREEN;
wireCLOCK.strokeWidth = 4;

var temp = wireCLOCK.clone();
temp.add(new Point (35,46));
temp.add(new Point (35,65));
wireCLOCK_CONTAINER.push(temp);

temp = wireCLOCK.clone();
temp.add(new Point (356,305));
temp.add(new Point (376,305));
wireCLOCK_CONTAINER.push(temp);

temp = wireCLOCK.clone();
temp.add(new Point (36,205));
temp.add(new Point (66,205));
wireCLOCK_CONTAINER.push(temp);

temp = wireCLOCK.clone();
temp.add(new Point (56,345));
temp.add(new Point (66,345));
wireCLOCK_CONTAINER.push(temp);

temp = wireCLOCK.clone();
temp.add(new Point (516,105));
temp.add(new Point (536,105));
wireCLOCK_CONTAINER.push(temp);

temp = wireCLOCK.clone();
temp.add(new Point (285,105));
temp.add(new Point (285,95));
wireCLOCK_CONTAINER.push(temp);

temp = wireCLOCK.clone();
temp.add(new Point (385,475));
temp.add(new Point (396,475));
temp.add(new Point (396,457));
wireCLOCK_CONTAINER.push(temp);

//OTHER WIRES
//OTHER WIRES
//OTHER WIRES
//OTHER WIRES
//OTHER WIRES

var wireOPCODE = new Path();
wireOPCODE.add(new Point (586,126));
wireOPCODE.add(new Point (586,285));
wireOPCODE.add(new Point (506,285));
wireOPCODE.strokeColor = BLACK;
wireOPCODE.strokeWidth = 4;

wireOPCODE.onMouseEnter = function(event){
    $('html,body').css('cursor','pointer');
}
wireOPCODE.onMouseLeave = function(event) {
    this.strokeWidth = defaultWireStrokeWidth;
    $('html,body').css('cursor','default');
}
wireOPCODE.onClick = function(event) {
    this.strokeWidth = clickedWireStrokeWidth;
    //hint.content = baseConvert(emulator.IR.substr(0,4),2,16,1);wireOPCODE
    activeWire = 'wireOPCODE';
    hint.visible = true;
    hint.position = event.point;
    hint.translate(hintX,hintY);
    hintBackground.visible = true;
    hintBackground.position = event.point;
    hintBackground.translate(hintX,hintY);
}


var wireALUCODE = new Path();
wireALUCODE.add(new Point (606,126));
wireALUCODE.add(new Point (606,426));
wireALUCODE.add(new Point (306,426));
wireALUCODE.add(new Point (306,466));
wireALUCODE.add(new Point (294,466));
wireALUCODE.strokeColor = BLACK;
wireALUCODE.strokeWidth = 4;

wireALUCODE.onMouseEnter = function(event){
    $('html,body').css('cursor','pointer');
}
wireALUCODE.onMouseLeave = function(event) {
    this.strokeWidth = defaultWireStrokeWidth;
    $('html,body').css('cursor','default');
}
wireALUCODE.onClick = function(event) {
    this.strokeWidth = clickedWireStrokeWidth;
    //hint.content = baseConvert(emulator.IR.substr(4,4),2,16,1);wireALUCODE
    activeWire = 'wireALUCODE';
    hint.visible = true;
    hint.position = event.point;
    hint.translate(hintX,hintY);
    hintBackground.visible = true;
    hintBackground.position = event.point;
    hintBackground.translate(hintX,hintY);
}

var wireR2 = new Path();
wireR2.add(new Point (626,126));
wireR2.add(new Point (626,406));
wireR2.add(new Point (236,406));
wireR2.add(new Point (236,376));
wireR2.add(new Point (225,376));
wireR2.strokeColor = BLACK;
wireR2.strokeWidth = 4;

wireR2.onMouseEnter = function(event){
    $('html,body').css('cursor','pointer');
}
wireR2.onMouseLeave = function(event) {
    this.strokeWidth = defaultWireStrokeWidth;
    $('html,body').css('cursor','default');
}
wireR2.onClick = function(event) {
    this.strokeWidth = clickedWireStrokeWidth;
    //hint.content = baseConvert(emulator.IR.substr(8,2),2,16,1);wireR2
    activeWire = 'wireR2';
    hint.visible = true;
    hint.position = event.point;
    hint.translate(hintX,hintY);
    hintBackground.visible = true;
    hintBackground.position = event.point;
    hintBackground.translate(hintX,hintY);
}


var wireR3 = new Path();
wireR3.add(new Point (646,126));
wireR3.add(new Point (646,375));
wireR3.add(new Point (306,375));
wireR3.strokeColor = BLACK;
wireR3.strokeWidth = 4;

wireR3.onMouseEnter = function(event){
    $('html,body').css('cursor','pointer');
}
wireR3.onMouseLeave = function(event) {
    this.strokeWidth = defaultWireStrokeWidth;
    $('html,body').css('cursor','default');
}
wireR3.onClick = function(event) {
    this.strokeWidth = clickedWireStrokeWidth;
    //hint.content = baseConvert(emulator.IR.substr(11,2),2,16,1);
    activeWire = 'wireR3';
    hint.visible = true;
    hint.position = event.point;
    hint.translate(hintX,hintY);
    hintBackground.visible = true;
    hintBackground.position = event.point;
    hintBackground.translate(hintX,hintY);
}

var wireR1 = new Path();
wireR1.add(new Point (666,126));
wireR1.add(new Point (666,415));
wireR1.add(new Point (116,415));
wireR1.add(new Point (116,376));
wireR1.strokeColor = BLACK;
wireR1.strokeWidth = 4;

wireR1.onMouseEnter = function(event){
    $('html,body').css('cursor','pointer');
}
wireR1.onMouseLeave = function(event) {
    this.strokeWidth = defaultWireStrokeWidth;
    $('html,body').css('cursor','default');
}
wireR1.onClick = function(event) {
    this.strokeWidth = clickedWireStrokeWidth;
    //hint.content = baseConvert(emulator.IR.substr(14,2),2,16,1);wireR1
    activeWire = 'wireR1';
    hint.visible = true;
    hint.position = event.point;
    hint.translate(hintX,hintY);
    hintBackground.visible = true;
    hintBackground.position = event.point;
    hintBackground.translate(hintX,hintY);
}

var wireJUMP_ADDR = new Path();
wireJUMP_ADDR.add(new Point (686,126));
wireJUMP_ADDR.add(new Point (686,166));
wireJUMP_ADDR.add(new Point (326,166));
wireJUMP_ADDR.add(new Point (326,245));
wireJUMP_ADDR.add(new Point (56,245));
wireJUMP_ADDR.add(new Point (56,176));
wireJUMP_ADDR.add(new Point (66,176));
wireJUMP_ADDR.strokeColor = BLACK;
wireJUMP_ADDR.strokeWidth = 4;


wireJUMP_ADDR.onMouseEnter = function(event){
    $('html,body').css('cursor','pointer');
}
wireJUMP_ADDR.onMouseLeave = function(event) {
    this.strokeWidth = defaultWireStrokeWidth;
    $('html,body').css('cursor','default');
}
wireJUMP_ADDR.onClick = function(event) {
    this.strokeWidth = clickedWireStrokeWidth;
    //hint.content = baseConvert(emulator.IR.substr(4,12),2,16,3);wireJUMP_ADDR
    activeWire = 'wireJUMP_ADDR';
    hint.visible = true;
    hint.position = event.point;
    hint.translate(hintX,hintY);
    hintBackground.visible = true;
    hintBackground.position = event.point;
    hintBackground.translate(hintX,hintY);
}

var wireADDR_BUS= new Path();
wireADDR_BUS.add(new Point (215,55));
wireADDR_BUS.add(new Point (125,55));
wireADDR_BUS.add(new Point (125,116));
wireADDR_BUS.strokeColor = BLACK;
wireADDR_BUS.strokeWidth = 4;

wireADDR_BUS.onMouseEnter = function(event){
    $('html,body').css('cursor','pointer');
}
wireADDR_BUS.onMouseLeave = function(event) {
    this.strokeWidth = defaultWireStrokeWidth;
    $('html,body').css('cursor','default');
}
wireADDR_BUS.onClick = function(event) {
    this.strokeWidth = clickedWireStrokeWidth;
    //hint.content = baseConvert(emulator.AR,2,16,3);wireADDR_BUS
    activeWire = 'wireADDR_BUS';
    hint.visible = true;
    hint.position = event.point;
    hint.translate(hintX,hintY);
    hintBackground.visible = true;
    hintBackground.position = event.point;
    hintBackground.translate(hintX,hintY);
}


var wireMEMORY_BUS= new Path();
wireMEMORY_BUS.add(new Point (356,55));
wireMEMORY_BUS.add(new Point (385,55));
wireMEMORY_BUS.add(new Point (385,43));
wireMEMORY_BUS.add(new Point (385,55));
wireMEMORY_BUS.add(new Point (726,55));
wireMEMORY_BUS.add(new Point (726,545));
wireMEMORY_BUS.add(new Point (146,545));
wireMEMORY_BUS.add(new Point (146,455));
wireMEMORY_BUS.add(new Point (96,455));
wireMEMORY_BUS.strokeColor = BLACK;
wireMEMORY_BUS.strokeWidth = 4;

wireMEMORY_BUS.onMouseEnter = function(event){
    $('html,body').css('cursor','pointer');
}
wireMEMORY_BUS.onMouseLeave = function(event) {
    this.strokeWidth = defaultWireStrokeWidth;
    $('html,body').css('cursor','default');
}
wireMEMORY_BUS.onClick = function(event) {
    this.strokeWidth = clickedWireStrokeWidth;
   /* if(isSet(emulator.sigs,'MEMWT'))
        hint.content = baseConvert(emulator.bigMuxOut,2,16,4);
    else
        hint.content = baseConvert(emulator.ram[parseInt(emulator.AR,2)],2,16,4);wireMEMORY_BUS*/
    activeWire = 'wireMEMORY_BUS';
    hint.visible = true;
    hint.position = event.point;
    hint.translate(hintX,hintY);
    hintBackground.visible = true;
    hintBackground.position = event.point;
    hintBackground.translate(hintX,hintY);
}

var wireALUOUT= new Path();
wireALUOUT.add(new Point (245,506));
wireALUOUT.add(new Point (245,515));
wireALUOUT.add(new Point (116,515));
wireALUOUT.add(new Point (116,466));
wireALUOUT.add(new Point (96,466));
wireALUOUT.strokeColor = BLACK;
wireALUOUT.strokeWidth = 4;

wireALUOUT.onMouseEnter = function(event){
    $('html,body').css('cursor','pointer');
}
wireALUOUT.onMouseLeave = function(event) {
    this.strokeWidth = defaultWireStrokeWidth;
    $('html,body').css('cursor','default');
}
wireALUOUT.onClick = function(event) {
    this.strokeWidth = clickedWireStrokeWidth;
    //hint.content = baseConvert(emulator.getAluOut(),2,16,4);wireALUOUT
    activeWire = 'wireALUOUT';
    hint.visible = true;
    hint.position = event.point;
    hint.translate(hintX,hintY);
    hintBackground.visible = true;
    hintBackground.position = event.point;
    hintBackground.translate(hintX,hintY);
}

var wireFLAGOUT = new Path();
wireFLAGOUT.add(new Point (284,495));
wireFLAGOUT.add(new Point (316,495));
wireFLAGOUT.add(new Point (316,446));
wireFLAGOUT.add(new Point (386,446));
wireFLAGOUT.strokeColor = BLACK;
wireFLAGOUT.strokeWidth = 4;

wireFLAGOUT.onMouseEnter = function(event){
    $('html,body').css('cursor','pointer');
}
wireFLAGOUT.onMouseLeave = function(event) {
    this.strokeWidth = defaultWireStrokeWidth;
    $('html,body').css('cursor','default');
}
wireFLAGOUT.onClick = function(event) {
    this.strokeWidth = clickedWireStrokeWidth;
}

var wireMUX1OUT = new Path();
wireMUX1OUT.add(new Point (206,395));
wireMUX1OUT.add(new Point (206,446));
wireMUX1OUT.add(new Point (206,425));
wireMUX1OUT.add(new Point (165,425));
wireMUX1OUT.add(new Point (165,475));
wireMUX1OUT.add(new Point (96,475));
wireMUX1OUT.strokeColor = BLACK;
wireMUX1OUT.strokeWidth = 4;

wireMUX1OUT.onMouseEnter = function(event){
    $('html,body').css('cursor','pointer');
}
wireMUX1OUT.onMouseLeave = function(event) {
    this.strokeWidth = defaultWireStrokeWidth;
    $('html,body').css('cursor','default');
}
wireMUX1OUT.onClick = function(event) {
    this.strokeWidth = clickedWireStrokeWidth;
    //hint.content = baseConvert(emulator.regfile[parseInt(emulator.IR.substr(8,2),2)],2,16,4);wireMUX1OUT
    activeWire = 'wireMUX1OUT';
    hint.visible = true;
    hint.position = event.point;
    hint.translate(hintX,hintY);
    hintBackground.visible = true;
    hintBackground.position = event.point;
    hintBackground.translate(hintX,hintY);
}

var wireMUX2OUT = new Path();
wireMUX2OUT.add(new Point (286,395));
wireMUX2OUT.add(new Point (286,446));
wireMUX2OUT.add(new Point (286,435));
wireMUX2OUT.add(new Point (176,435));
wireMUX2OUT.add(new Point (176,485));
wireMUX2OUT.add(new Point (94,485));
wireMUX2OUT.strokeColor = BLACK;
wireMUX2OUT.strokeWidth = 4;

wireMUX2OUT.onMouseEnter = function(event){
    $('html,body').css('cursor','pointer');
}
wireMUX2OUT.onMouseLeave = function(event) {
    this.strokeWidth = defaultWireStrokeWidth;
    $('html,body').css('cursor','default');
}
wireMUX2OUT.onClick = function(event) {
    this.strokeWidth = clickedWireStrokeWidth;
    //hint.content = baseConvert(emulator.regfile[parseInt(emulator.IR.substr(11,2),2)],2,16,4);wireMUX2OUT
    activeWire = 'wireMUX2OUT';
    hint.visible = true;
    hint.position = event.point;
    hint.translate(hintX,hintY);
    hintBackground.visible = true;
    hintBackground.position = event.point;
    hintBackground.translate(hintX,hintY);
}

var wireMUX3OUT = new Path();
wireMUX3OUT.add(new Point (54,475));
wireMUX3OUT.add(new Point (5,475));
wireMUX3OUT.add(new Point (5,285));
wireMUX3OUT.add(new Point (66,285));
wireMUX3OUT.add(new Point (5,285));
wireMUX3OUT.add(new Point (5,145));
wireMUX3OUT.add(new Point (66,145));
wireMUX3OUT.add(new Point (5,145));
wireMUX3OUT.add(new Point (5,5));
wireMUX3OUT.add(new Point (386,5));
wireMUX3OUT.add(new Point (386,25));
wireMUX3OUT.strokeColor = BLACK;
wireMUX3OUT.strokeWidth = 4;

wireMUX3OUT.onMouseEnter = function(event){
    $('html,body').css('cursor','pointer');
}
wireMUX3OUT.onMouseLeave = function(event) {
    this.strokeWidth = defaultWireStrokeWidth;
    $('html,body').css('cursor','default');
}
wireMUX3OUT.onClick = function(event) {
    this.strokeWidth = clickedWireStrokeWidth;
    //hint.content = baseConvert(emulator.getBigMuxOut(),2,16,4);wireMUX3OUT
    activeWire = 'wireMUX3OUT';
    hint.visible = true;
    hint.position = event.point;
    hint.translate(hintX,hintY);
    hintBackground.visible = true;
    hintBackground.position = event.point;
    hintBackground.translate(hintX,hintY);
}

var wireREG0OUT = new Path();
wireREG0OUT.add(new Point (155,285));
wireREG0OUT.add(new Point (185,285));
wireREG0OUT.add(new Point (185,355));
wireREG0OUT.add(new Point (185,285));
wireREG0OUT.add(new Point (265,285));
wireREG0OUT.add(new Point (265,355));
wireREG0OUT.strokeColor = BLACK;
wireREG0OUT.strokeWidth = 4;

wireREG0OUT.onMouseEnter = function(event){
    $('html,body').css('cursor','pointer');
}
wireREG0OUT.onMouseLeave = function(event) {
    this.strokeWidth = defaultWireStrokeWidth;
    $('html,body').css('cursor','default');
}
wireREG0OUT.onClick = function(event) {
    this.strokeWidth = clickedWireStrokeWidth;
    activeWire = 'wireREG0OUT';
    hint.visible = true;
    hint.position = event.point;
    hint.translate(hintX,hintY);
    hintBackground.visible = true;
    hintBackground.position = event.point;
    hintBackground.translate(hintX,hintY);
}

var wireREG1OUT = new Path();
wireREG1OUT.add(new Point (155,305));
wireREG1OUT.add(new Point (195,305));
wireREG1OUT.add(new Point (195,355));
wireREG1OUT.add(new Point (195,305));
wireREG1OUT.add(new Point (275,305));
wireREG1OUT.add(new Point (275,355));
wireREG1OUT.strokeColor = BLACK;
wireREG1OUT.strokeWidth = 4;

wireREG1OUT.onMouseEnter = function(event){
    $('html,body').css('cursor','pointer');
}
wireREG1OUT.onMouseLeave = function(event) {
    this.strokeWidth = defaultWireStrokeWidth;
    $('html,body').css('cursor','default');
}
wireREG1OUT.onClick = function(event) {
    this.strokeWidth = clickedWireStrokeWidth;
    activeWire = 'wireREG1OUT';
    hint.visible = true;
    hint.position = event.point;
    hint.translate(hintX,hintY);
    hintBackground.visible = true;
    hintBackground.position = event.point;
    hintBackground.translate(hintX,hintY);
}

var wireREG2OUT = new Path();
wireREG2OUT.add(new Point (155,325));
wireREG2OUT.add(new Point (205,325));
wireREG2OUT.add(new Point (205,355));
wireREG2OUT.add(new Point (205,325));
wireREG2OUT.add(new Point (285,325));
wireREG2OUT.add(new Point (285,355));
wireREG2OUT.strokeColor = BLACK;
wireREG2OUT.strokeWidth = 4;

wireREG2OUT.onMouseEnter = function(event){
    $('html,body').css('cursor','pointer');
}
wireREG2OUT.onMouseLeave = function(event) {
    this.strokeWidth = defaultWireStrokeWidth;
    $('html,body').css('cursor','default');
}
wireREG2OUT.onClick = function(event) {
    this.strokeWidth = clickedWireStrokeWidth;
    activeWire = 'wireREG2OUT';
    hint.visible = true;
    hint.position = event.point;
    hint.translate(hintX,hintY);
    hintBackground.visible = true;
    hintBackground.position = event.point;
    hintBackground.translate(hintX,hintY);
}

var wireREG3OUT = new Path();
wireREG3OUT.add(new Point (155,345));
wireREG3OUT.add(new Point (215,345));
wireREG3OUT.add(new Point (215,355));
wireREG3OUT.add(new Point (215,345));
wireREG3OUT.add(new Point (295,345));
wireREG3OUT.add(new Point (295,355));
wireREG3OUT.strokeColor = BLACK;
wireREG3OUT.strokeWidth = 4;

wireREG3OUT.onMouseEnter = function(event){
    $('html,body').css('cursor','pointer');
}
wireREG3OUT.onMouseLeave = function(event) {
    this.strokeWidth = defaultWireStrokeWidth;
    $('html,body').css('cursor','default');
}
wireREG3OUT.onClick = function(event) {
    this.strokeWidth = clickedWireStrokeWidth;
    activeWire = 'wireREG3OUT';
    hint.visible = true;
    hint.position = event.point;
    hint.translate(hintX,hintY);
    hintBackground.visible = true;
    hintBackground.position = event.point;
    hintBackground.translate(hintX,hintY);
}





//When user clicks to a wire, this will be used to show the wire state
var hintBackground = new Path.Rectangle(0,0,34,12);
hintBackground.fillColor = 'yellow';
hintBackground.visible = false;
hintBackground.strokeColor = 'red';
hintBackground.strokeWidth = 1;

var hint = new PointText(new Point(50, 50));
hint.justification = 'center';
hint.fillColor = 'black';
hint.content = '???';
hint.visible = false;
hint.fontWeight = 'bold';
hint.fontSize = 9;


var spinner = new Path();
spinner.add(new Point(5,545));
spinner.add(new Point(10,550));
spinner.strokeColor = BLACK;
spinner.strokeWidth = 1;

onFrame = function (event) {
    /*Paper JS refreshes the paintings  60 times per second. Reduce refresh ratio not to waste your device recources   */
    var refreshRate = 10 // refresh rate
    var mod = 60/refreshRate;

    updateHint(activeWire);

    if( (event.count%mod )== 0 ){
        spinner.rotate(10);


    //Signals
    sigARMUX.strokeColor = window.globals.signal.ARMUX == 0 ? GREEN : LIGHTGREEN;
    sigARLD.strokeColor = window.globals.signal.ARLD == 0 ? GREEN : LIGHTGREEN;
    sigARINC.strokeColor = window.globals.signal.ARINC == 0 ? GREEN : LIGHTGREEN;
    sigPCINC.strokeColor = window.globals.signal.PCINC == 0 ? GREEN : LIGHTGREEN;
    sigPCLD.strokeColor = window.globals.signal.PCLD == 0 ? GREEN : LIGHTGREEN;
    sigREGWT.strokeColor = window.globals.signal.REGWT == 0 ? GREEN : LIGHTGREEN;
    sigMEMWT.strokeColor = window.globals.signal.MEMWT == 0 ? GREEN : LIGHTGREEN;
    sigMEMREAD.strokeColor = window.globals.signal.MEMWT == 1 ? GREEN : LIGHTGREEN;
    sigIRLD.strokeColor = window.globals.signal.IRLD == 0 ? GREEN : LIGHTGREEN;
    sigFLAGWT.strokeColor = window.globals.signal.ZFWT == 0 ? GREEN : LIGHTGREEN;
    sigMUX0.strokeColor = window.globals.signal.MUX0 == 0 ? GREEN : LIGHTGREEN;
    sigMUX1.strokeColor = window.globals.signal.MUX1 == 0 ? GREEN : LIGHTGREEN;

    wireZF.strokeColor = window.globals.wireZF == 0 ? GREEN : LIGHTGREEN;
    wireFLAGOUT.strokeColor = window.globals.wireFLAGOUT == 0 ? GREEN : LIGHTGREEN;

    R0.set({content:window.globals.regs.R0});
    R1.set({content:window.globals.regs.R1});
    R2.set({content:window.globals.regs.R2});
    R3.set({content:window.globals.regs.R3});
    AR.set({content:window.globals.regs.AR});
    PC.set({content:window.globals.regs.PC});
    IR.set({content:window.globals.regs.IR});
    //FLAGS.set({content:window.globals.regs.FLAGS});
        if(window.globals.clockState == 1){
            clockPulsePosEdge.visible = true;
            clockPulseNegEdge.visible = false;
            for(var i in wireCLOCK_CONTAINER){
                wireCLOCK_CONTAINER[i].strokeColor = LIGHTGREEN;
            }
        }
        else {
            clockPulsePosEdge.visible = false;
            clockPulseNegEdge.visible = true;
            for(var i in wireCLOCK_CONTAINER){
                wireCLOCK_CONTAINER[i].strokeColor = GREEN;
            }
        }
    }
};

function boxList(ix,iy,w,h,hg){
    this.pos = new Point(ix,iy);
    this.width = w;
    this.height = h;
    this.horizontalGrids = hg;
    this.cellWidth = this.width;
    this.cellHeight = this.height / this.horizontalGrids;
    this.boxList = [];
    this.activeBox = null;
    this.draw = function(){
        var temp = new Path.Rectangle(this.pos.x,this.pos.y,this.cellWidth,this.cellHeight);
        temp.strokeColor = 'black';
        temp.fillColor = 'white';
        temp.strokeWidth = 1;
        for(var i=0;i<this.horizontalGrids;i++){
            var box = temp.clone();
            this.boxList.push(box);
            temp.position += new Point(0,this.cellHeight);
        }
        temp.remove();
    };
    this.selectActiveBox = function(index) {
        if (this.activeBox != null) {
            this.activeBox.position = this.boxList[0].position + new Point(0,index*this.cellHeight);
        } else {
            this.activeBox = new Path.Rectangle(this.pos.x, (index) * this.cellHeight + this.pos.y, this.cellWidth, this.cellHeight);
            this.activeBox.strokeColor = 'red';
            this.activeBox.strokeWidth = 2;
        }
    }
};



/*var myPath = new Path();
myPath.strokeColor = 'green';
myPath.strokeWidth = 2;

function onMouseDown(event) {
    myPath.add(event.point);
    //var str = window.globals.elem.val();
    var str = 'sig.add(new Point (' + Math.round(event.point.x) + ',' + Math.round(event.point.y) + '));';
    console.log(str);
    //window.globals.elem.val(str);
}*/


function onMouseDown(event){
    if(hint.visible == true){
        hint.visible = false;
        hintBackground.visible = false;
    }
}

function baseConvert(numStr,from,to,length){
    if(to == 16)
        return '0x' + charPreceding(parseInt(numStr,from).toString(to),'0',length);
    else if(to == 2)
        return '0b' + parseInt(numStr,from).toString(to);
    else if(to == 8)
        return '0o' + parseInt(numStr,from).toString(to);
    else
        return parseInt(numStr,from).toString(to);
}
function charPreceding(str,char,length){
    for(var i=0;i<20;i++)
        char += char;
    var output = char + str;
    return output.substr(-1*length);
}
function updateHint(wirename){
    switch (wirename){
        case 'wireOPCODE':
            hint.content = baseConvert(emulator.IR.substr(0,4),2,16,1);
            break;
        case 'wireALUCODE':
            hint.content = baseConvert(emulator.IR.substr(4,4),2,16,1);
            break;
        case 'wireR2':
            hint.content = baseConvert(emulator.IR.substr(8,2),2,16,1);
            break;
        case 'wireR3':
            hint.content = baseConvert(emulator.IR.substr(11,2),2,16,1);
            break;

        case 'wireR1':
            hint.content = baseConvert(emulator.IR.substr(14,2),2,16,1);
            break;
        case 'wireJUMP_ADDR':
            hint.content = baseConvert(emulator.IR.substr(4,12),2,16,3);
            break;
        case 'wireADDR_BUS':
            hint.content = baseConvert(emulator.AR,2,16,3);
            break;
        case 'wireMEMORY_BUS':
            if(isSet(emulator.sigs,'MEMWT'))
                hint.content = baseConvert(emulator.bigMuxOut,2,16,4);
            else
                hint.content = baseConvert(emulator.ram[parseInt(emulator.AR,2)],2,16,4);
            break;
        case 'wireALUOUT':
            hint.content = baseConvert(emulator.getAluOut(),2,16,4);
            break;
        case 'wireMUX1OUT':
            hint.content = baseConvert(emulator.regfile[parseInt(emulator.IR.substr(8,2),2)],2,16,4);
            break;
        case 'wireMUX2OUT':
            hint.content = baseConvert(emulator.regfile[parseInt(emulator.IR.substr(11,2),2)],2,16,4);
            break;
        case 'wireMUX3OUT':
            hint.content = baseConvert(emulator.getBigMuxOut(),2,16,4);
            break;
        case 'wireREG0OUT':
            hint.content = baseConvert(emulator.regfile[0],2,16,4);
            break;
        case 'wireREG1OUT':
            hint.content = baseConvert(emulator.regfile[1],2,16,4);
            break;
        case 'wireREG2OUT':
            hint.content = baseConvert(emulator.regfile[2],2,16,4);
            break;
        case 'wireREG3OUT':
            hint.content = baseConvert(emulator.regfile[3],2,16,4);
            break;

        default :
            hint.content = 'none';

    }
}
