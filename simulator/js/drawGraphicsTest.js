/**
 * Created by KO on 26.03.2015.
 */
function run(){
    window.globals.signal.ARMUX = randomInt(2);
    window.globals.signal.ARLD = randomInt(2);
    window.globals.signal.ARINC = randomInt(2);
    window.globals.signal.PCINC = randomInt(2);
    window.globals.signal.PCLD = randomInt(2);
    window.globals.signal.REGWT = randomInt(2);
    window.globals.signal.MEMWT = randomInt(2);
    window.globals.signal.IRLD = randomInt(2);
    window.globals.signal.FLAGWT = randomInt(2);
    window.globals.signal.MUX0 = randomInt(2);
    window.globals.signal.MUX1 = randomInt(2);

    window.globals.selectedReg = randomInt(4);
    window.globals.wireZF = randomInt(2);

    window.globals.regs.R0 = '0x' + randomString(4,'0123456789ABCDEF');
    window.globals.regs.R1 = '0x' + randomString(4,'0123456789ABCDEF');
    window.globals.regs.R2 = '0x' + randomString(4,'0123456789ABCDEF');
    window.globals.regs.R3 = '0x' + randomString(4,'0123456789ABCDEF');
    window.globals.regs.AR = '0x' + randomString(4,'0123456789ABCDEF');
    window.globals.regs.PC = '0x' + randomString(4,'0123456789ABCDEF');
    window.globals.regs.IR = '0x' + randomString(4,'0123456789ABCDEF');

};

var randomInt = function(top){
    var num =  Math.floor((Math.random() * 1000) + 1) % top;
    return num;
};
function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}
