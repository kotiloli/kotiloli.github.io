

var zeros = '0000000000000000';
var signalIndex = {
    IRLD:31,PCLD:30,PCINC:29,ARLD:28,
    ARINC:27,ARDEC:26,INTMUX:25,ARMUX:24,
    SPINC:23,SPDEC:22,SPLD:21,MUX2:20,
    MUX1:19,MUX0:18,REGWT:17,MEMWT:16,
    FLAGWT:15,ZFWT:14,IFSET:13,IFRESET:12,
    NOTDEFINED1:11,NOTDEFINED2:10,NOTDEFINED3:9,INTACK:8,
    PCWTDIRECT:7
};
var emulator = function(){

    this.ram = [];
    this.rom = [];
    this.regfile = [];
    this.IR  = zeros;
    this.PC  = zeros;
    this.AR  = zeros;
    this.ZF  = 0;
    this.clock = 0;
    this.romAddr = 0; //6 bit rom address register
    this.sigs = "";
    this.clockFrequency = 1; // in HERTZ

    this.initialize = function(){
        this.IR = '0111000000000000';
        this.regfile.push(zeros);
        this.regfile.push(zeros);
        this.regfile.push(zeros);
        this.regfile.push(zeros);
        this.rom.push('10101000000000000000000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00101000000000100000000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00010000000011000000000000001001');
        this.rom.push('00010001000000100000000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00010000000011000000000000001101');
        this.rom.push('00010001000010010000000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('01010000000000000000010000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00000000000001100100000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00010000000100000000000000100001');
        this.rom.push('00010001010010010000000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00000000100000000000000000100101');
        this.rom.push('00010000000011000000000000100110');
        this.rom.push('00010001000000100000000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00010000000100000000000000101001');
        this.rom.push('00000000000110010000000000101010');
        this.rom.push('01010000010000000000011000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00000000100000000000000000101101');
        this.rom.push('00010000000100000000000000101110');
        this.rom.push('01010000000000000000000010000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00000000100000000000000000110001');
        this.rom.push('00010000000100000000000000110010');
        this.rom.push('01001000100000000000000010110011');
        this.rom.push('00010001000101001001000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00000000000000000000000000000000');
        this.rom.push('00010000000100000000000001000001');
        this.rom.push('00000100010101010000000001000010');
        this.rom.push('00000100010110010010000001000011');
        this.rom.push('00010010000000000000000101000100');
        this.rom.push('01010000000000000000000010000000');
        for(var i=0;i<100;i++)
            this.ram.push('0000000000000000');
        };


    this.nextState = function(){
        this.clock += 1;
        var sigs = this.getControlSignals(this.IR.substr(0,4),this.ZF);
        this.sigs = sigs;
        var opcode = this.IR.substr(0,4);
        var alucode = this.IR.substr(4,4);
        var r2 = this.IR.substr(8,2);
        var r3 = this.IR.substr(11,2);
        var r1 = this.IR.substr(14,2);
        var jump_addr =  this.IR.substr(4,12);
        var bigmuxout;
        var aluout;
        var ARtemp = this.AR;

        //ALU OPERATIONS
        var sreg1 = this.regfile[parseInt(r2,2)];
        var sreg2 = this.regfile[parseInt(r3,2)];
        switch( parseInt(alucode,2) ){
            case 0:
                aluout = signPreceding((parseInt(sreg1,2) + parseInt(sreg2,2)),16);
                break;
            case 1:
                aluout = signPreceding((parseInt(sreg1,2) - parseInt(sreg2,2)),16);
                break;
            case 2:
                aluout = signPreceding((parseInt(sreg1,2) & parseInt(sreg2,2)),16);
                break;
            case 3:
                aluout = signPreceding(~(parseInt(sreg1,2)),16);
                break;
            case 4:
                aluout = zeroPreceding((parseInt(sreg1,2) - parseInt(sreg2,2)).toString(2),16);
                break;
            case 5:
                aluout = zeroPreceding( (parseInt(sreg1,2)).toString(2),16);
        }

        //Big MUX
        switch(parseInt((sig(this.sigs,'MUX1')+sig( this.sigs,'MUX0' )),2)) {
            case 0:
                bigmuxout = this.ram[parseInt(this.AR,2)];
                break;
            case 1:
                bigmuxout = aluout;
                break;
            case 2:
                bigmuxout = this.regfile[parseInt(r2,2)];
                break;
            case 3:
                bigmuxout = this.regfile[parseInt(r3,2)];
                break;
            default:
                bigmuxout = this.ram[parseInt(this.AR,2)];
        }

        if(isSet(sigs,'REGWT')){
            console.warn('regwt');
            this.regfile[parseInt(r1,2)] = bigmuxout;
        }

        if(isSet(sigs,'ZFWT')){
            console.warn('flagwt');
            this.ZF = (aluout == zeros) ? 1:0;
        }


        if(isSet(sigs,'MEMWT')){
            console.warn('MEMWT');
            this.ram[parseInt(this.AR,2)] = bigmuxout;
        }
        if(isSet(sigs,'ARLD')){
            console.warn('ARLD');
            if( !isSet(sigs,'PCLD') && !isSet(sigs,'ARMUX')){
                this.AR = bigmuxout.substr(4);
            }
            else if( !isSet(sigs,'PCLD') && isSet(sigs,'ARMUX')){
                this.AR = this.PC;
                console.warn('ARMUX');
            }
            else if( isSet(sigs,'PCLD') && !isSet(sigs,'ARMUX')){
                this.AR = signPreceding(parseInt(jump_addr,2) + parseInt(this.PC,2),12);
            }

            else{
                this.AR = 'errorerrorer';
                console.warn('ERROR ARLD');
            }
        }
        if(isSet(sigs,'ARINC')){
            console.warn('ARINC');
            this.AR = signPreceding(parseInt(this.AR,2)+1,12);
        }
        if(isSet(sigs,'PCLD')){
            console.warn('PCLD');
            this.PC = signPreceding(parseInt(jump_addr,2) + parseInt(this.PC,2),12);
        }
        if(isSet(sigs,'PCINC')){
            console.warn('PCINC');
            this.PC = signPreceding(parseInt(this.PC,2)+1,12);
        }

        if(isSet(sigs,'IRLD')){
            console.warn('IRLD');
            this.IR = this.ram[parseInt(ARtemp,2)];
        }
    };

};

emulator.prototype.getControlSignals = function(opcode,zflag){
    //console.log('this.romAddr: ' + this.romAddr);
    var sigs =  this.rom[this.romAddr];
    console.log('SIGNAL : ' +  sigs);
    console.log('ROMADDR: >    ' + this.romAddr);
    if( sigs.charAt(sigIndex('IRLD')) == '1' ){
        console.error('getControlSignals');
        if(zflag == 1 && opcode == '0100'){
            this.romAddr = 20; //(JMP opcode)*4
            console.error('JMP');
        }

        else{
            this.romAddr = parseInt(opcode,2)*4;
            console.debug('opcode:' + opcode);
            console.error('NORMAL INST');
        }

    }
    else{
        this.romAddr = parseInt(sigs.substr(26,6),2);
    }
    console.log('ROMADDR = ' + this.romAddr);
    console.log('----------------');
    return sigs;
};

function sigIndex(signame){
    if(typeof(signalIndex[signame]) == 'undefined')
        console.error('Function sigIndex(arg:signame) >>  Wrong signal index: ' + signame);
    return 31 - signalIndex[signame];
}
function isSet(signals,sigName){
    return (signals.charAt(sigIndex(sigName)) == '1');
}
function sig(signals,sigName){
    return signals.charAt(sigIndex(sigName));
}

function zeroPreceding(str, size) {
    var s = "0000000000000000000000000000000000000000000000" + str;
    return s.substr(s.length-size);
}
function signPreceding(num, size) {
    var s;
    if(num >= 0){
        s = "0000000000000000000000000000000000000000000000" + num.toString(2);
        return s.substr(s.length-size);
    }else{
        s = (num >>> 0).toString(2);
        s = "1111111111111111111111111111111111111111111111" + s;
        return s.substr(s.length-size);
    }
}









