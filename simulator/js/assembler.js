
// .code | .data reges
var regexScope = /^\s*(\.code|\.data)\s*$/i;

//data decleration regex
var regexDataDec = /^\s*[_A-Za-z]\w*\s*:\s*(.space\s+)?(\d+|0x[0-9a-fA-F]+)\s*$/i;


var regexVariableDec = /^\s*([_A-Za-z]\w*)\s*:\s*(\d+|0x[0-9a-fA-F]+)\s*$/i;
var regexArrayDec = /^\s*([_A-Za-z]\w*)\s*:\s*(?:.space\s+)(\d+)\s*$/i;


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
var regexInstWithLabel = /^\s*([_A-Za-z]\w*)\s+([_A-Za-z]\w*)/i;

function isValidCode(str){
    return regexDataDec.test(str) |
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

function isInstKeyword(keyword){
    keyword = keyword.toLowerCase();
    return keyword === 'add' |
        keyword === 'sub' |
        keyword === 'and' |
        keyword === 'or' |
        keyword === 'xor' |
        keyword === 'ldi' |
        keyword === 'not' |
        keyword === 'mov' |
        keyword === 'inc' |
        keyword === 'dec' |
        keyword === 'ld' |
        keyword === 'st' |
        keyword === 'jmp' |
        keyword === 'jz';
};
function isReservedKeyword(keyword){
    keyword = keyword.toLowerCase();
    return keyword === '.data' |
        keyword === '.space' |
        keyword === '.code' |
        isInstKeyword(keyword);
};

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

function instFormat(instArr,labelArr,variableArr,lineNum){
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
        console.log(instArr[0]);
        console.log(instArr[1]);
        console.log(instArr[2]);
        console.log(instArr[3]);
        var output = [];
        output.push('0001' + '0000000000' + binary(instArr[2]));
        if(getNode(variableArr,instArr[3]) != null)
            output.push(signPreceding(parseInt(getNode(variableArr,instArr[3]).addr),16));
        else
            output.push('----------------');
        return  output;
    }
    //LD r1 r2
    else if(instArr[1].toLowerCase() == 'ld'){
        return [ '0010' + '0000000' + binary(instArr[3]) + '0' + binary(instArr[2])];
    }
    //ST r1 r2
    else if(instArr[1].toLowerCase() == 'st') {
        return '0011' + '0000' + binary(instArr[3]) + '0' + binary(instArr[2]) + '000';
    }
    //JMP label
    else if(instArr[1].toLowerCase() == 'jmp'){
        if (getNode(labelArr,instArr[2]) != null)
            //return  '0101' + signPreceding(20,12);
            return  '0101' + signPreceding((parseInt(getNode(labelArr,instArr[2]).lineNum)-lineNum-1),12);
        else
            return '0101' + '------------';
    }
    //JZ label
    else if(instArr[1].toLowerCase() == 'jz'){
        if (getNode(labelArr,instArr[2]) != null)
            return  '0100' + signPreceding((parseInt(getNode(labelArr,instArr[2]).lineNum)-lineNum-1),12);
        else
            return '0100' + '------------';
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


function assembler(inputText){
    var codeLines = inputText.split("\n");
    var codeArr = [];
    var instParts = [];
    var instArr = [];
    var lineCounter = 0;
    var labelArr = [];
    var variableArr = [];
    var debugStr = '';

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
            var parts = regexVariableDec.exec(codeArr[i]);
            variableArr.push(variableObject(parts[1],parts[2],'1','0'));
        }
        else if(regexArrayDec.test(codeArr[i])){
            var parts = regexArrayDec.exec(codeArr[i]);
            variableArr.push(variableObject(parts[1],'0',parts[2],'0'));
        }
        //Get Label information
        else if(isValidInstruction(codeArr[i])){
            var parts = regexInstWithLabel.exec(codeArr[i]);
            if(parts != null){
                if( !isReservedKeyword(parts[1]) && isInstKeyword(parts[2])){
                    if(isNodeExist(labelArr,parts[1])){
                        debugStr += 'Repeated label name: <' + parts[1]  +'> at line ' + (lineCounter+1) +'\n';
                    }
                    else
                        labelArr.push(labelObject(parts[1],lineCounter+''));
                }
                else if(!(parts[1] ==='jmp' || parts[1] === 'jz') ){
                    debugStr += 'Invalid label name: <' + parts[1]  +'> at line ' + (lineCounter+1) +'\n';
                }
            }
            lineCounter += (instructionType3.test((codeArr[i]))) ? 2 : 1;
        }else if(isValidCode(codeArr[i])){
            //console.log('not counted: ' + codeArr[i]);
        }
        else ;//console.log('not valid: ' + codeArr[i]);
    }

    //modify  variable addresss
    if(variableArr[0] != null)
    variableArr[0].addr = lineCounter;
    for(var i =1;i<variableArr.length;i++){
        lineCounter += parseInt(variableArr[i-1].size);
        variableArr[i].addr = lineCounter;
    }



    //second PASS
    lineCounter = 0;
    for(i in codeArr){
        var inst = codeArr[i];
        if(regexDataDec.test(inst) | regexScope.test(inst)){
            continue;
        }

        if(isValidInstruction(inst)){
            instParts = splitInstruction(inst);
            instArr = instArr.concat(instFormat(instParts,labelArr,variableArr,lineCounter));

        }else{
            instArr.push('????????????????');
        }
        lineCounter += (instructionType3.test((codeArr[i]))) ? 2 : 1;
    }

    for(var i=0;i<variableArr.length;i++){
        for(var j=0;j < parseInt(variableArr[i].size);j++ ){
            var num;
            if((variableArr[i].value).substr(0,2) == '0x' || (variableArr[i].value).substr(0,2) == '0X')
                num = parseInt(variableArr[i].value,16);
            else
                num = parseInt(variableArr[i].value);
            instArr.push(signPreceding(num,16));
        }
    }

    console.log(labelArr);
    console.log(variableArr);
    if(debugStr != '')console.error(debugStr);
    return instArr;
};

var labelObject = function(name,lineNum){
    return {
        name: name.toLowerCase(), //label name
        lineNum:lineNum            //label line address
    }
};

var variableObject = function(name,value,size,addr){
    if(value.substr(0,2) === '0x' || value.substr(0,2) === '0X'){
        value = parseInt(value,16).toString(10);
    }
    return {
        name:  name.toLowerCase(), //variable name
        value:  value,             //can be variable value
        size:  size,               //can be [0,*] for  array, only 1 for simple variables
        addr: addr                  //memory  addres of array or variable,
    }
};

function getNode(nodeArr,name){
    for(i in nodeArr){
        if(nodeArr[i].name === name.toLowerCase())
            return nodeArr[i];
    }
    return null;
};
function isNodeExist(nodeArr,name){
    for(i in nodeArr){
        if(nodeArr[i].name === name.toLowerCase())
            return true;
    }
    return false;
};



