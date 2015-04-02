
window.globals = {
    signal:{
        ARMUX:0,
        ARLD:0,
        ARINC:0,
        PCINC:0,
        PCLD:0,
        REGWT:0,
        MEMWT:0,
        IRWT:0,
        FLAGWT:0
    },
    regs:{
        R0:'0x0000',
        R1:'0x0000',
        R2:'0x0000',
        R3:'0x0000',
        AR:'0x0000',
        PC:'0x0000',
        IR:'0x0000',
        FLAGS:'0x0000'
    },
    selectedReg:NaN,
    wireZF:0,
    wireClock:0
};

var GREEN = '#336600';
var LIGHTGREEN = '#99FF66';



//cpu backgroung image
var raster = new Raster('cpux');
raster.position = view.center;

//Register Unit Drawings
var registers = new boxList(95,278,70,100,4); registers.draw();
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
var addressUnit = new boxList(95,140,70,50,2); addressUnit.draw();
var PC = new PointText();
PC.fillColor = 'black';
PC.fontWeight = 'bold';
PC.fontSize = '14px';
PC.content = '0x0000';
PC.set({position:addressUnit.boxList[1].position});
var AR = PC.clone();
AR.set({position:addressUnit.boxList[0].position});


// InstructionRegister Drawings
var InstructionRegister = new boxList(710,82,70,25,1); InstructionRegister.draw();
var IR = new PointText();
IR.fillColor = 'black';
IR.fontWeight = 'bold';
IR.fontSize = '14px';
IR.content = '0x0000';
IR.set({position:InstructionRegister.boxList[0].position});

//Control unit wires drawings
var sigARMUX = new Path();
sigARMUX.add(new Point (171,126));
sigARMUX.add(new Point (253,126));
sigARMUX.add(new Point (253,136));
sigARMUX.add(new Point(553,136));
sigARMUX.add(new Point (553,267));
sigARMUX.strokeColor = 'black';
sigARMUX.strokeWidth = 4;

var sigARLD = new Path();
sigARLD.add(new Point (171,146));
sigARLD.add(new Point (463,146));
sigARLD.add(new Point (463,286));
sigARLD.add(new Point (483,286));
sigARLD.strokeColor = 'black';
sigARLD.strokeWidth = 4;


var sigARINC = new Path();
sigARINC.add(new Point (171,166));
sigARINC.add(new Point (513,166));
sigARINC.add(new Point (513,267));
sigARINC.strokeColor = 'black';
sigARINC.strokeWidth = 4;

var sigPCINC = new Path();
sigPCINC.add(new Point (171,206));
sigPCINC.add(new Point (453,206));
sigPCINC.add(new Point (453,316));
sigPCINC.add(new Point (483,316));
sigPCINC.strokeColor = 'black';
sigPCINC.strokeWidth = 4;

var sigPCLD = new Path();
sigPCLD.add(new Point (172,186));
sigPCLD.add(new Point (443,186));
sigPCLD.add(new Point (443,346));
sigPCLD.add(new Point (482,346));
sigPCLD.strokeColor = 'black';
sigPCLD.strokeWidth = 4;

var sigREGWT = new Path();
sigREGWT.add(new Point (103,385));
sigREGWT.add(new Point (103,397));
sigREGWT.add(new Point (63,397));
sigREGWT.add(new Point (63,246));
sigREGWT.add(new Point (623,246));
sigREGWT.add(new Point (623,376));
sigREGWT.add(new Point (613,376));
sigREGWT.strokeColor = 'black';
sigREGWT.strokeWidth = 4;

var sigMEMWT = new Path();
sigMEMWT.add(new Point (613,316));
sigMEMWT.add(new Point (633,316));
sigMEMWT.add(new Point (633,126));
sigMEMWT.add(new Point (452,126));
sigMEMWT.add(new Point (473,126));
sigMEMWT.add(new Point (473,36));
sigMEMWT.add(new Point (489,36));
sigMEMWT.strokeColor = 'black';
sigMEMWT.strokeWidth = 4;

var sigIRWT = new Path();
sigIRWT.add(new Point (483,376));
sigIRWT.add(new Point (473,376));
sigIRWT.add(new Point (473,406));
sigIRWT.add(new Point (673,406));
sigIRWT.add(new Point (673,127));
sigIRWT.strokeColor = 'black';
sigIRWT.strokeWidth = 4;

var sigFLAGWT = new Path();
sigFLAGWT.add(new Point (613,346));
sigFLAGWT.add(new Point (643,346));
sigFLAGWT.add(new Point (643,536));
sigFLAGWT.add(new Point (383,536));
sigFLAGWT.add(new Point (383,526));
sigFLAGWT.strokeColor = 'black';
sigFLAGWT.strokeWidth = 4;

var wireZF = new Path();
wireZF.add(new Point (553,395));
wireZF.add(new Point (553,506));
wireZF.add(new Point (402,506));
wireZF.strokeColor = 'black';
wireZF.strokeWidth = 4;



onFrame = function (event) {
    //Signals
    sigARMUX.strokeColor = window.globals.signal.ARMUX == 0 ? GREEN : LIGHTGREEN;
    sigARLD.strokeColor = window.globals.signal.ARLD == 0 ? GREEN : LIGHTGREEN;
    sigARINC.strokeColor = window.globals.signal.ARINC == 0 ? GREEN : LIGHTGREEN;
    sigPCINC.strokeColor = window.globals.signal.PCINC == 0 ? GREEN : LIGHTGREEN;
    sigPCLD.strokeColor = window.globals.signal.PCLD == 0 ? GREEN : LIGHTGREEN;
    sigREGWT.strokeColor = window.globals.signal.REGWT == 0 ? GREEN : LIGHTGREEN;
    sigMEMWT.strokeColor = window.globals.signal.MEMWT == 0 ? GREEN : LIGHTGREEN;
    sigIRWT.strokeColor = window.globals.signal.IRWT == 0 ? GREEN : LIGHTGREEN;
    sigFLAGWT.strokeColor = window.globals.signal.FLAGWT == 0 ? GREEN : LIGHTGREEN;

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
