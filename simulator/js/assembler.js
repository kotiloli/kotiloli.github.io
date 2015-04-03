
// .code | .data reges
var regexScope = /^\s*(\.code|\.data)\s*$/i;

//variable decleration regex
var regexVariable = /^\s*[_A-Za-z]\w*\s*:\s*(.space\s+)?(\d+|0x[0-9a-fA-F]+)\s*$/i;

var regexVariableDec = /^\s*([_A-Za-z]\w*)\s*:\s*(\d+|0x[0-9a-fA-F]+)\s*$/i;
var regexArrayDec = /^\s*([_A-Za-z]\w*)\s*:\s*(?:.space\s+)(\d+)\s*$/i;

var regexLabel = /^\s*([_A-Za-z]\w*\s+)?/i;

/**
    General Instractions Format
    [?label] + [instruction mnemonic] + [,operands]
    Note that [label] is optional
*/

//ALU instructions ADD,SUB,AND,OR,XOR  -->  [?label] + [instruction mnemonic] + [r1] + [r2] + [r3]
var instructionType0 = /^\s*(?:[_A-Za-z]\w*\s+)?(add|sub|and|or|xor)\s+([0-3])\s+([0-3])\s+([0-3])\s*$/i;
//MOV, NOT, LD, ST
var instructionType1 = /^\s*(?:[_A-Za-z]\w*\s+)?(mov|not|ld|st)\s+([0-3])\s+([0-3])\s*$/i;
//INC, DEC
var instructionType2 = /^\s*(?:[_A-Za-z]\w*\s+)?(inc|dec)\s+([0-3])\s*$/i;
//LDI
var instructionType3 = /^\s*(?:[_A-Za-z]\w*\s+)?(ldi)\s+([0-3])\s+([_A-Za-z]\w*|\d+|0x[0-9a-fA-F]+)\s*$/i;
//JMP, JZ
var instructionType4 = /^\s*(?:[_A-Za-z]\w*\s+)?(jz|jmp)\s+([_A-Za-z]\w*)\s*$/i;

function isValidCode(str){
    return regexVariable.test(str) |
        regexScope.test(str) |
        instructionType0.test((str)) |
        instructionType1.test((str)) |
        instructionType2.test((str)) |
        instructionType3.test((str)) |
        instructionType4.test((str)) ;
}
function isValidInstruction(str){
    return instructionType0.test((str)) |
        instructionType1.test((str)) |
        instructionType2.test((str)) |
        instructionType3.test((str)) |
        instructionType4.test((str)) ;
}

function splitInstruction(str){
    if(instructionType0.test(str))
        return instructionType0.exec(str);
    else if(instructionType1.test(str))
        return instructionType1.exec(str);
    else if(instructionType2.test(str))
        return instructionType2.exec(str);
    else if(instructionType3.test(str))
        return instructionType3.exec(str);
    else if(instructionType4.test(str))
        return instructionType4.exec(str);
    else return null;
}

function instFormat(instArr){
    // ADD r1 r2 r3
    if(instArr[1].toLowerCase() == 'add'){
        return  '0111' + '0000' + binary(instArr[3]) + '0' + binary(instArr[4]) + '0' + binary(instArr[2]);
    }
    else if(instArr[1].toLowerCase() == 'sub'){
        return  '0111' + '0001' + binary(instArr[3]) + '0' + binary(instArr[4]) + '0' + binary(instArr[2]);
    }
    else if(instArr[1].toLowerCase() == 'and'){
        return  '0111' + '0010' + binary(instArr[3]) + '0' + binary(instArr[4]) + '0' + binary(instArr[2]);
    }
    else if(instArr[1].toLowerCase() == 'or'){
        return  '0111' + '0011' + binary(instArr[3]) + '0' + binary(instArr[4]) + '0' + binary(instArr[2]);
    }
    else if(instArr[1].toLowerCase() == 'xor'){
        return  '0111' + '0100' + binary(instArr[3]) + '0' + binary(instArr[4]) + '0' + binary(instArr[2]);
    }

    //MOV r1 r2
    else if(instArr[1].toLowerCase() == 'mov'){
        return  '0111' + '0110' + '000' + binary(instArr[3]) + '0' + binary(instArr[2]);
    }
    //NOT r1 r2
    else if(instArr[1].toLowerCase() == 'not'){
        return  '0111' + '0101' + '000' + binary(instArr[3]) + '0' + binary(instArr[2]);
    }

    //INC r1
    else if(instArr[1].toLowerCase() == 'inc'){
        return  '0111' + '0111' + '000' + binary(instArr[2]) + '0' + binary(instArr[2]);
    }

    //DEC r1
    else if(instArr[1].toLowerCase() == 'dec'){
        return  '0111' + '1000' + '000' + binary(instArr[2]) + '0' + binary(instArr[2]);
    }
    //LDI r1 labelname
    else if(instArr[1].toLowerCase() == 'ldi'){
        return  '0001' + '0000000000' + binary(instArr[2]) + '\n' + '????????????????';
    }
    //LD r1 r2
    else if(instArr[1].toLowerCase() == 'ld'){
        return  '0010' + '0000000' + binary(instArr[3]) + '0' + binary(instArr[2]);
    }
    //ST r1 r2
    else if(instArr[1].toLowerCase() == 'st') {
        return '0011' + '0000' + binary(instArr[3]) + '0' + binary(instArr[2]) + '000';
    }
    //JMP label
    else if(instArr[1].toLowerCase() == 'jmp'){
            return  '0101' + '????????????';
    }
    //JZ label
    else if(instArr[1].toLowerCase() == 'jz'){
        return  '0100' + '????????????';
    }
    else return 'XXXXXXXXXXXXXXXX';
}

function binary(num){
    if(typeof (num) == 'string')
        return zeroPreceding((parseInt(num)).toString(2),2);
    else if(typeof (num) == 'number')
        return zeroPreceding(num.toString(2),2);
    else
        return NaN;
}

function zeroPreceding(str, size) {
    var s = "00000000000000000000" + str;
    return s.substr(s.length-size);
};


function assembler(inputText){
    var codeLines = inputText.split("\n");
    var codeArr = [];
    var instParts = [];
    var instArr = [];
    var lineCounter = 0;
    var labelArr = [];

    //Remove Blank Lines
    for(i in codeLines){
        //if  it's not a blank line add to code Array
        if(!(/^\s*$/.test(codeLines[i]))){
            codeArr.push(codeLines[i]);
        }
    }
    //first PASS calculate total lines of code, label & var addresses, ...
    for(i in codeArr){
        if(regexVariableDec.test(codeArr[i])){
            var parts = regexVariable.exec(codeArr[i]);
            labelArr.push(labelObject('variable',parts[1],parts[2],1,0));
        }
        else if(regexArrayDec.test(codeArr[i])){
            var parts = regexArrayDec.exec(codeArr[i]);
            labelArr.push(labelObject('variable',parts[1],0,parts[2],0));
        }
        else if(isValidInstruction(codeArr[i])){

        }

    }

    //second PASS
    for(i in codeArr){
        var inst = codeArr[i];
        if(regexVariable.test(inst) | regexScope.test(inst)){
            continue;
        }

        if(isValidCode(inst)){
            instParts = splitInstruction(inst);
            assembled += instFormat(instParts) + '\n';
            instArr.push(instFormat(instParts));
        }
        else
            assembled += '\t\tNOT valid\n';
    }
    return instArr;
};

var labelObject = function(type,name,value,size,addr){
    return {
        type: + type,
        name: + name,
        value: + value,
        size: + size,
        addr:+addr
    }
};



