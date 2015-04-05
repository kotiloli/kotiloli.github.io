
var GREEN = '#336600';
var LIGHTGREEN = '#99FF66';
var RED  = '#E31E1E';
var BLACK = 'black';


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

var sig = new Path();
sig.strokeColor = BLACK;
sig.strokeWidth = 4;

var sigARINC = new Path();
sigARINC.add(new Point (375,225));
sigARINC.add(new Point (365,225));
sigARINC.add(new Point (365,175));
sigARINC.add(new Point (155,175));
sigARINC.strokeColor = BLACK;
sigARINC.strokeWidth = 4;

var sigARLD = new Path();
sigARLD.add(new Point (415,206));
sigARLD.add(new Point (415,155));
sigARLD.add(new Point (155,155));
sigARLD.strokeColor = BLACK;
sigARLD.strokeWidth = 4;

var sigARMUX = new Path();
sigARMUX.add(new Point (466,206));
sigARMUX.add(new Point (466,136));
sigARMUX.add(new Point (155,136));
sigARMUX.strokeColor = BLACK;
sigARMUX.strokeWidth = 4;

var sigPCLD = new Path();
sigPCLD.add(new Point (375,245));
sigPCLD.add(new Point (355,245));
sigPCLD.add(new Point (355,196));
sigPCLD.add(new Point (155,196));
sigPCLD.strokeColor = BLACK;
sigPCLD.strokeWidth = 4;

var sigPCINC = new Path();
sigPCINC.add(new Point (375,265));
sigPCINC.add(new Point (346,265));
sigPCINC.add(new Point (346,215));
sigPCINC.add(new Point (155,215));
sigPCINC.strokeColor = BLACK;
sigPCINC.strokeWidth = 4;

var sigREGWT = new Path();
sigREGWT.add(new Point (375,285));
sigREGWT.add(new Point (335,285));
sigREGWT.add(new Point (335,255));
sigREGWT.add(new Point (126,255));
sigREGWT.add(new Point (126,266));
sigREGWT.strokeColor = BLACK;
sigREGWT.strokeWidth = 4;

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

var sigIRLD = new Path();
sigIRLD.add(new Point (506,255));
sigIRLD.add(new Point (556,255));
sigIRLD.add(new Point (556,126));
sigIRLD.strokeColor = BLACK;
sigIRLD.strokeWidth = 4;

var sigFLAGWT = new Path();
sigFLAGWT.add(new Point (436,336));
sigFLAGWT.add(new Point (436,435));
sigFLAGWT.strokeColor = BLACK;
sigFLAGWT.strokeWidth = 4;

var sigMUX1 = new Path();
sigMUX1.add(new Point (506,306));
sigMUX1.add(new Point (516,306));
sigMUX1.add(new Point (516,536));
sigMUX1.add(new Point (85,536));
sigMUX1.add(new Point (85,520));
sigMUX1.strokeColor = BLACK;
sigMUX1.strokeWidth = 4;


var sigMUX0 = new Path();
sigMUX0.add(new Point (476,336));
sigMUX0.add(new Point (476,525));
sigMUX0.add(new Point (96,525));
sigMUX0.add(new Point (96,519));
sigMUX0.strokeColor = BLACK;
sigMUX0.strokeWidth = 4;


var wireZF = new Path();
wireZF.add(new Point (406,336));
wireZF.add(new Point (406,434));
wireZF.strokeColor = BLACK;
wireZF.strokeWidth = 4;


//CLOCk WIRES
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

var wireOPCODE = new Path();
wireOPCODE.add(new Point (586,126));
wireOPCODE.add(new Point (586,285));
wireOPCODE.add(new Point (506,285));
wireOPCODE.strokeColor = BLACK;
wireOPCODE.strokeWidth = 4;

var wireALUCODE = new Path();
wireALUCODE.add(new Point (606,126));
wireALUCODE.add(new Point (606,426));
wireALUCODE.add(new Point (306,426));
wireALUCODE.add(new Point (306,466));
wireALUCODE.add(new Point (294,466));
wireALUCODE.strokeColor = BLACK;
wireALUCODE.strokeWidth = 4;

var wireR2 = new Path();
wireR2.add(new Point (626,126));
wireR2.add(new Point (626,406));
wireR2.add(new Point (236,406));
wireR2.add(new Point (236,376));
wireR2.add(new Point (225,376));
wireR2.strokeColor = BLACK;
wireR2.strokeWidth = 4;


var wireR3 = new Path();
wireR3.add(new Point (646,126));
wireR3.add(new Point (646,375));
wireR3.add(new Point (306,375));
wireR3.strokeColor = BLACK;
wireR3.strokeWidth = 4;

var wireR1 = new Path();
wireR1.add(new Point (666,126));
wireR1.add(new Point (666,415));
wireR1.add(new Point (116,415));
wireR1.add(new Point (116,376));
wireR1.strokeColor = BLACK;
wireR1.strokeWidth = 4;

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

var wireADDR_BUS= new Path();
wireADDR_BUS.add(new Point (215,55));
wireADDR_BUS.add(new Point (125,55));
wireADDR_BUS.add(new Point (125,116));
wireADDR_BUS.strokeColor = BLACK;
wireADDR_BUS.strokeWidth = 4;


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

var wireALUOUT= new Path();
wireALUOUT.add(new Point (245,506));
wireALUOUT.add(new Point (245,515));
wireALUOUT.add(new Point (116,515));
wireALUOUT.add(new Point (116,466));
wireALUOUT.add(new Point (96,466));
wireALUOUT.strokeColor = BLACK;
wireALUOUT.strokeWidth = 4;

var wireFLAGOUT = new Path();
wireFLAGOUT.add(new Point (284,495));
wireFLAGOUT.add(new Point (316,495));
wireFLAGOUT.add(new Point (316,446));
wireFLAGOUT.add(new Point (386,446));
wireFLAGOUT.strokeColor = BLACK;
wireFLAGOUT.strokeWidth = 4;

var wireMUX1OUT = new Path();
wireMUX1OUT.add(new Point (206,395));
wireMUX1OUT.add(new Point (206,446));
wireMUX1OUT.add(new Point (206,425));
wireMUX1OUT.add(new Point (165,425));
wireMUX1OUT.add(new Point (165,475));
wireMUX1OUT.add(new Point (96,475));
wireMUX1OUT.strokeColor = BLACK;
wireMUX1OUT.strokeWidth = 4;

var wireMUX2OUT = new Path();
wireMUX2OUT.add(new Point (286,395));
wireMUX2OUT.add(new Point (286,446));
wireMUX2OUT.add(new Point (286,435));
wireMUX2OUT.add(new Point (176,435));
wireMUX2OUT.add(new Point (176,485));
wireMUX2OUT.add(new Point (94,485));
wireMUX2OUT.strokeColor = BLACK;
wireMUX2OUT.strokeWidth = 4;

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


onFrame = function (event) {
    //Signals
    sigARMUX.strokeColor = window.globals.signal.ARMUX == 0 ? GREEN : LIGHTGREEN;
    sigARLD.strokeColor = window.globals.signal.ARLD == 0 ? GREEN : LIGHTGREEN;
    sigARINC.strokeColor = window.globals.signal.ARINC == 0 ? GREEN : LIGHTGREEN;
    sigPCINC.strokeColor = window.globals.signal.PCINC == 0 ? GREEN : LIGHTGREEN;
    sigPCLD.strokeColor = window.globals.signal.PCLD == 0 ? GREEN : LIGHTGREEN;
    sigREGWT.strokeColor = window.globals.signal.REGWT == 0 ? GREEN : LIGHTGREEN;
    sigMEMWT.strokeColor = window.globals.signal.MEMWT == 0 ? GREEN : LIGHTGREEN;
    sigIRLD.strokeColor = window.globals.signal.IRLD == 0 ? GREEN : LIGHTGREEN;
    sigFLAGWT.strokeColor = window.globals.signal.FLAGWT == 0 ? GREEN : LIGHTGREEN;
    sigMUX0.strokeColor = window.globals.signal.MUX0 == 0 ? GREEN : LIGHTGREEN;
    sigMUX1.strokeColor = window.globals.signal.MUX1 == 0 ? GREEN : LIGHTGREEN;

    wireZF.strokeColor = window.globals.wireZF == 0 ? GREEN : LIGHTGREEN;

    R0.set({content:window.globals.regs.R0});
    R1.set({content:window.globals.regs.R1});
    R2.set({content:window.globals.regs.R2});
    R3.set({content:window.globals.regs.R3});
    AR.set({content:window.globals.regs.AR});
    PC.set({content:window.globals.regs.PC});
    IR.set({content:window.globals.regs.IR});
    //FLAGS.set({content:window.globals.regs.FLAGS});

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

/*
var myPath = new Path();
myPath.strokeColor = 'green';
myPath.strokeWidth = 4;

function onMouseDown(event) {
    myPath.add(event.point);
    console.log(event.point);
    var str = window.globals.elem.val();
    str += '\n' + 'sig.add(new Point (' + Math.round(event.point.x) + ',' + Math.round(event.point.y) + '));';
    window.globals.elem.val(str);
}*/
