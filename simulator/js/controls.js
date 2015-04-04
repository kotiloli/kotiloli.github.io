/**
 * Created by KO on 01.04.2015.
 */

var emulator = new emulator();
emulator.initialize();

$(document).ready(function(){

    $("#step").click(nextStep);
    $("#assemble").click(assembleCode);
    $("#rom").val(emulator.rom.join('\n'));
    window.setInterval(run,800);
});



function assembleCode() {
    var input = $("#sourceCode").val();
    var hexcodeArr = assembler(input);
    $("#hexCode").val(hexcodeArr.join('\n'));
    for(var i=0;i<hexcodeArr.length;i++){
        emulator.ram[i] = hexcodeArr[i];
    }
    debug();
}
function nextStep(){
    emulator.nextState();
    debug();
}

function debug(){

    var debugInfo = "";
    debugInfo += 'CLOCK : ' + emulator.clock + '\n';
    debugInfo += 'IR    : ' + emulator.IR + '\n';
    debugInfo += 'PC    : ' + emulator.PC + '\n';
    debugInfo += 'AR    : ' + emulator.AR + '\n';
    debugInfo += '\n';
    debugInfo += 'REG0  : ' + emulator.regfile[0] + '\n';
    debugInfo += 'REG1  : ' + emulator.regfile[1] + '\n';
    debugInfo += 'REG2  : ' + emulator.regfile[2] + '\n';
    debugInfo += 'REG3  : ' + emulator.regfile[3] + '\n';
    debugInfo += 'ZF    : ' + emulator.ZF + '\n';
    debugInfo += '\n';

    debugInfo += 'romAdr: ' + emulator.romAddr + '\n';
    debugInfo += 'sigs  : ' + emulator.sigs; + '\n';
    debugInfo += '\nIRLD  :' + sig(emulator.sigs,'IRLD');
    debugInfo += '   PCLD :' + sig(emulator.sigs,'PCLD');
    debugInfo += '   ARLD :' + sig(emulator.sigs,'ARLD');
    debugInfo += '   PCINC:' + sig(emulator.sigs,'PCINC');+ '\n';
    debugInfo += '\nARINC :' + sig(emulator.sigs,'ARINC');
    debugInfo += '   ARMUX:' + sig(emulator.sigs,'ARMUX');
    debugInfo += '   REGWT:' + sig(emulator.sigs,'REGWT');+ '\n';
    debugInfo += '\nMEMWT :' + sig(emulator.sigs,'MEMWT');
    debugInfo += '   MUX1 :' + sig(emulator.sigs,'MUX1');
    debugInfo += '   MUX0 :' + sig(emulator.sigs,'MUX0');+ '\n';
    debugInfo += '\nZFWT  :' + sig(emulator.sigs,'ZFWT');

    $("#regs").val(debugInfo);
    $("#memory").val(emulator.ram.join('\n'));
};
