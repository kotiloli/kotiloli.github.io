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
        ZFWT:0,
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
    wireFLAGOUT: 0,
    selectedReg:NaN,
    wireZF:0,
    wireClock:0,
    clockState:0,
    elem : $("#memory")[0],
    codeIndex:null
};

var emulator = new Emulator();
emulator.initialize();

var simulationId;
var running = false;
var clockStateRisingEdge = true;

$(document).ready(function(){

    $("#step").click(nextStep);
    $("#run").click(runSimulation);
    $("#stop").click(stopSimulation);
    $("#reset").click(resetSimulation);
    $("#assemble").click(assembleCode);
    updateRom();
    $('#sourceCode').val(readCookie('sourceCode'));

   $("#sourceCode").on('change keyup paste', function() {
       //eraseCookie('sourceCode');
        createCookie('sourceCode',$('#sourceCode').val(),365);
    });
    $('#clockFreq').on('change',function(){
        var reRun = false;
        if(running == true) {
            stopSimulation();
            reRun = true;
        }
        var value = $('#clockFreq').val();
        emulator.clockFrequency = parseInt(value);
        if(reRun == true){
            runSimulation();
        }

    });
    jQuery('#fib').click(function(e){
        $.get( "fib.txt", function( data ) {
            $( "#sourceCode" ).val(data);
        });
        e.preventDefault();
    });

});



function assembleCode() {
    var input = $("#sourceCode").val();
    var bincodeArr = assembler(input);
    var hexCodeOutput = '';
    for(var i in bincodeArr){
        var num = parseInt(bincodeArr[i],2).toString(16);
        hexCodeOutput += charPreceding(num,'0',4) + '\n';
    }
    $("#hexCode").val(hexCodeOutput);
    //initialize emulators ram
    for(var i=0;i<bincodeArr.length;i++){
        emulator.ram[i] = bincodeArr[i];
    }
    //$("#memory").val(emulator.ram.join('\n'));
    updateMemory();
    debug();
    makeCanvasUpdates();
    $('#sourceCode').highlightTextarea('enable');
    $('#memory').highlightTextarea('enable');
    $('#rom').highlightTextarea('enable');
}

function updateMemory(){
    var output = '';
    console.time('Update');
    for(var i=0;i<200;i++){
        output += charPreceding(parseInt(i).toString(16),'0',3) + '  ' + emulator.ram[i] + '\n';
        //output +=  emulator.ram[i] + '\n';
        console.log('.');
    }
    output += '...\n..\n.';
    //output = emulator.ram.join('\n');
    $("#memory").val(output);
    console.timeEnd('Update');
}
function updateRom(){
    var output = '';
    for(var i=0;i<emulator.rom.length;i++){
        output += charPreceding(parseInt(i).toString(16),'0',3) + '  ' + emulator.rom[i] + '\n';
    }
    $("#rom").val(output);

}
function resetSimulation(){
    stopSimulation();
    $('#run').prop('disabled', false);
    var oldClockFreq = emulator.clockFrequency;
    emulator = new Emulator();
    emulator.initialize();
    emulator.clockFrequency = oldClockFreq;
    window.globals.clockState = 0;
    $('#memory').val('');
    makeCanvasUpdates();
    $('#sourceCode').highlightTextarea('disable');
    $('#memory').highlightTextarea('disable');
    $('#rom').highlightTextarea('disable');
    debug();

}
function runSimulation(){
    running = true;
    $('#run').prop('disabled', true);
    $('#step').prop('disabled', true);
    simulationId = window.setInterval(nextStep,(1/emulator.clockFrequency)*1000 );
    console.log('FREQ:' + (1/emulator.clockFrequency)*1000);
}

function stopSimulation(){
    running = false;
    $('#run').prop('disabled', false);
    $('#step').prop('disabled', false);
    clearInterval(simulationId);
}


function nextStep(){
    if(clockStateRisingEdge){
        var romAddr = emulator.romAddr;
        lineHighLight('#rom',romAddr+1);
        if(isSet(emulator.sigs,'IRLD')){
            var memoryAddress = parseInt(emulator.AR,2);
            var sourceCodeLineNum = window.globals.codeIndex[memoryAddress];
            lineHighLight('#sourceCode',sourceCodeLineNum);
            lineHighLight('#memory',memoryAddress+1);

        }

        emulator.nextState();
        makeCanvasUpdates();
        //$("#memory").val(emulator.ram.join('\n'));
        updateMemory();
        debug();
        clockStateRisingEdge = false;
        window.globals.clockState = 1;
    }else{
        clockStateRisingEdge = true;
        window.globals.clockState = 0;
    }
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
    debugInfo += '   ZFWT  :' + sig(emulator.sigs,'ZFWT')  + '\n';
    debugInfo += '   aluout  :Ox' + parseInt(emulator.aluOut,2).toString(16);
    debugInfo += '   bigMuxOut  :Ox' + parseInt(emulator.bigMuxOut,2).toString(16);

    $("#regs").val(debugInfo);
};


function makeCanvasUpdates(){
    window.globals.signal.ARMUX  = isSet(emulator.sigs, 'ARMUX') ?  1:0;
    window.globals.signal.ARLD   = isSet(emulator.sigs, 'ARLD') ?  1:0;
    window.globals.signal.ARINC  = isSet(emulator.sigs, 'ARINC') ?  1:0;
    window.globals.signal.PCINC  = isSet(emulator.sigs, 'PCINC') ?  1:0;
    window.globals.signal.PCLD   = isSet(emulator.sigs, 'PCLD') ?  1:0;
    window.globals.signal.REGWT  = isSet(emulator.sigs, 'REGWT') ?  1:0;
    window.globals.signal.MEMWT  = isSet(emulator.sigs, 'MEMWT') ?  1:0;
    window.globals.signal.IRLD   = isSet(emulator.sigs, 'IRLD') ?  1:0;
    window.globals.signal.ZFWT = isSet(emulator.sigs, 'ZFWT') ?  1:0;
    window.globals.signal.MUX0   = isSet(emulator.sigs, 'MUX0') ?  1:0;
    window.globals.signal.MUX1   = isSet(emulator.sigs, 'MUX1') ?  1:0;

    //window.globals.selectedReg = randomInt(4); //TODO
    window.globals.wireZF = emulator.ZF;
    window.globals.wireFLAGOUT = parseInt(emulator.getAluOut(),2) == 0 ? 1:0 ;

    window.globals.regs.R0 = '0x' + parseInt(emulator.regfile[0],2).toString(16);
    window.globals.regs.R1 = '0x' + parseInt(emulator.regfile[1],2).toString(16);
    window.globals.regs.R2 = '0x' + parseInt(emulator.regfile[2],2).toString(16);
    window.globals.regs.R3 = '0x' + parseInt(emulator.regfile[3],2).toString(16);
    window.globals.regs.AR = '0x' + parseInt(emulator.AR,2).toString(16);
    window.globals.regs.PC = '0x' + parseInt(emulator.PC,2).toString(16);
    window.globals.regs.IR = '0x' + parseInt(emulator.IR,2).toString(16);

};
function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    value = value.replace(/\n/g,'linefeedplaceholder7352437546356236');
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) {
            var value = c.substring(nameEQ.length,c.length);
            return value.replace(/linefeedplaceholder7352437546356236/g,'\n');
        }
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}
function charPreceding(str,char,length){
    //for(var i=0;i<20;i++)
    //    char += char;
    char = char+char+char+char;
    char = char+char+char+char;
    //char = '00000000000000000000000';
    var output = char + str;
    return output.substr(-1*length);
}

function lineHighLight(query,lineNum){
    var text = $(query).val();
    var start;
    var end  =0;
    var lineCounter = 1;
    while(true){
        start = end;
        end = text.indexOf('\n',start+1);
        if(end == -1){
            end = text.length;
            break;
        }
        if( lineCounter == lineNum)
            break;
        lineCounter++;
    }
    $(query).highlightTextarea('setRanges',[[start,end]]);
    ScrollToLine(query,lineNum);
}

function ScrollToLine(query,lineNum){
    var elem = $(query)[0];
    console.log('scrollTop:' + elem.scrollTop);
    console.log('elem.clientHeight:' + elem.clientHeight);
    var lineHeight = elem.clientHeight / elem.rows;
    console.log('Line Height :' + lineHeight );
    var jump = (lineNum) * lineHeight / 1.05 - (lineHeight * elem.rows/2);///1.2175
    elem.scrollTop = jump;
}

