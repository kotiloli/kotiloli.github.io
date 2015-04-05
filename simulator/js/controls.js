/**
 * Created by KO on 01.04.2015.
 */

window.globals = {
    signal:{
        ARMUX:0,
        ARLD:0,
        ARINC:0,
        PCINC:0,
        PCLD:0,
        REGWT:0,
        MEMWT:0,
        IRLD:0,
        FLAGWT:0,
        MUX0:0,
        MUX1:0
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
    //elem : $("#memory")
};

var emulator = new Emulator();
emulator.initialize();

var simulationId;

$(document).ready(function(){

    $("#step").click(nextStep);
    $("#run").click(runSimulation);
    $("#stop").click(stopSimulation);
    $("#reset").click(resetSimulation);
    $("#assemble").click(assembleCode);
    $("#rom").val(emulator.rom.join('\n'));
   /* $("#sourceCode").on('change keyup paste', function() {
        assembleCode();
    });*/
    //window.setInterval(run,800);
});

function assembleCode() {
    var input = $("#sourceCode").val();
    var hexcodeArr = assembler(input);
    $("#hexCode").val(hexcodeArr.join('\n'));
    //initialize emulators ram
    for(var i=0;i<hexcodeArr.length;i++){
        emulator.ram[i] = hexcodeArr[i];
    }
    $("#memory").val(emulator.ram.join('\n'));
    debug();
}
function resetSimulation(){
    stopSimulation();
    $('#run').prop('disabled', false);
    emulator = new Emulator();
    emulator.initialize();
    $('#memory').val('');
    makeCanvasUpdates();
    debug();

}
function runSimulation(){
    emulator.clockFrequency = 10;
    $('#run').prop('disabled', true);
    $('#step').prop('disabled', true);
    simulationId = window.setInterval(nextStep,(1/emulator.clockFrequency)*1000 );
}

function stopSimulation(){
    $('#run').prop('disabled', false);
    $('#step').prop('disabled', false);
    clearInterval(simulationId);
}


function nextStep(){
    emulator.nextState();
    makeCanvasUpdates();
    $("#memory").val(emulator.ram.join('\n'));
    debug();
}

function debug(){

    var debugInfo = "";
    debugInfo += 'CLOCK : ' + emulator.clock + '\t'; debugInfo += 'ZF    : ' + emulator.ZF + '\n';
    debugInfo += 'REG0  : ' + emulator.regfile[0] + '\t';debugInfo += 'IR    : ' + emulator.IR + '\n';
    debugInfo += 'REG1  : ' + emulator.regfile[1] + '\t';debugInfo += 'PC    : ' + emulator.PC + '\n';
    debugInfo += 'REG2  : ' + emulator.regfile[2] + '\t';debugInfo += 'AR    : ' + emulator.AR + '\n';
    debugInfo += 'REG3  : ' + emulator.regfile[3] + '\n';


    debugInfo += 'romAdr: ' + emulator.romAddr + '\t';debugInfo += 'sigs  : ' + emulator.sigs; + '\n';
    debugInfo += '\n';
    debugInfo += '   IRLD  :' + sig(emulator.sigs,'IRLD');
    debugInfo += '   PCLD  :' + sig(emulator.sigs,'PCLD');
    debugInfo += '   ARLD  :' + sig(emulator.sigs,'ARLD');
    debugInfo += '   PCINC :' + sig(emulator.sigs,'PCINC');
    debugInfo += '   ARINC :' + sig(emulator.sigs,'ARINC')  + '\n';
    debugInfo += '   ARMUX :' + sig(emulator.sigs,'ARMUX');
    debugInfo += '   REGWT :' + sig(emulator.sigs,'REGWT');
    debugInfo += '   MEMWT :' + sig(emulator.sigs,'MEMWT');
    debugInfo += '   MUX1  :' + sig(emulator.sigs,'MUX1');
    debugInfo += '   MUX0  :' + sig(emulator.sigs,'MUX0');
    debugInfo += '   ZFWT  :' + sig(emulator.sigs,'ZFWT');

    $("#regs").val(debugInfo);
};

/*
var signalIndex = {
    IRLD:31,PCLD:30,PCINC:29,ARLD:28,
    ARINC:27,ARDEC:26,INTMUX:25,ARMUX:24,
    SPINC:23,SPDEC:22,SPLD:21,MUX2:20,
    MUX1:19,MUX0:18,REGWT:17,MEMWT:16,
    FLAGWT:15,ZFWT:14,IFSET:13,IFRESET:12,
    NOTDEFINED1:11,NOTDEFINED2:10,NOTDEFINED3:9,INTACK:8,
    PCWTDIRECT:7
};
*/

function makeCanvasUpdates(){
    window.globals.signal.ARMUX  = isSet(emulator.sigs, 'ARMUX') ?  1:0;
    window.globals.signal.ARLD   = isSet(emulator.sigs, 'ARLD') ?  1:0;
    window.globals.signal.ARINC  = isSet(emulator.sigs, 'ARINC') ?  1:0;
    window.globals.signal.PCINC  = isSet(emulator.sigs, 'PCINC') ?  1:0;
    window.globals.signal.PCLD   = isSet(emulator.sigs, 'PCLD') ?  1:0;
    window.globals.signal.REGWT  = isSet(emulator.sigs, 'REGWT') ?  1:0;
    window.globals.signal.MEMWT  = isSet(emulator.sigs, 'MEMWT') ?  1:0;
    window.globals.signal.IRLD   = isSet(emulator.sigs, 'IRLD') ?  1:0;
    window.globals.signal.FLAGWT = isSet(emulator.sigs, 'FLAGWT') ?  1:0;
    window.globals.signal.MUX0   = isSet(emulator.sigs, 'MUX0') ?  1:0;
    window.globals.signal.MUX1   = isSet(emulator.sigs, 'MUX1') ?  1:0;

    //window.globals.selectedReg = randomInt(4); //TODO
    window.globals.wireZF = emulator.ZF;

    window.globals.regs.R0 = '0x' + parseInt(emulator.regfile[0],2).toString(16);
    window.globals.regs.R1 = '0x' + parseInt(emulator.regfile[1],2).toString(16);
    window.globals.regs.R2 = '0x' + parseInt(emulator.regfile[2],2).toString(16);
    window.globals.regs.R3 = '0x' + parseInt(emulator.regfile[3],2).toString(16);
    window.globals.regs.AR = '0x' + parseInt(emulator.AR,2).toString(16);
    window.globals.regs.PC = '0x' + parseInt(emulator.PC,2).toString(16);
    window.globals.regs.IR = '0x' + parseInt(emulator.IR,2).toString(16);

};
