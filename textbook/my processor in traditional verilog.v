module cpu(
input clk,
input [15:0] datain,
output [15:0] dataout,
output [15:0] addr,
output WRITEMEM;
) 





module alu(
input [15:0] aluinl,
input [15:0] aluinr,
output [15:0] aluout,
output outputiszero;
)
always @*
begin
	case( aluop[11:9] )
		4'h0:  aluout = aluinl + aluinr;
		4'h1:  aluout = aluinl - aluinr;
		4'h2:  aluout = aluinl & aluinr;
		4'h3:  aluout = aluinl | aluinr;
		4'h4:  aluout = aluinl ^ aluinr;
		4'h7:  case ( aluop[8:6] )
		       		4'h0:  aluout = ~aluinr;
		       		4'h1:  aluout =  aluinr;
		       		4'h2:  aluout = aluinr + 1;
				4'h2:  aluout = aluinr - 1;
				default: aluout = 0;
			endcase
		default: aluout = 0
	endcase;
end;
assign aluiszero = ~(| aluout);
endmodule;




module registerbank(
input [15:0] din;
input [3:0] whichregtowrite;
input REGLOAD,ZFSET, aluiszero, SP+, SP-
output [15:0] r0,r1.r2.r3.r4.r5.r6.r7;
)
reg [15:0] r0,r1,r2,r3,r4,r5,r,r7;

always @(posedge clk) //we assume that only one of REGLOAD, SP+, SP-, ZFSET 
begin                  //can be active at a given clock cycle.
	if (REGLOAD)
		case (whichregtowrite)
			3'h0: ro <= din;
			3'h1: r1 <= din;
			3'h2: r2 <= din;
			3'h3: r3 <= din;
			3'h4: r4 <= din;
			3'h5: r4 <= din;
			3'h6: r6 <= din;
			3'h7: r7 <= din;
		endcase;
	else if (SP+)
		r7 <= r7+1;
	else if (SP-)
		r7 <= r7-1;
	else if (ZFSET)
		r6[0] <= aluiszero;
end;






module addressing_unit(
input [11:0] fromir, frommux;
output [11:0] pc, ar;
input MUX1, MUX2, PCINC, PCLOAD, ARINC, ARLOAD;
)
reg [11:0] pc, ar;
		
always @(posedge clk)
begin
	if (PCINC)
		pc <= pc+1;
	else if (PCLOAD)
		if (PCMUX)
			pc<=frommux;
		else
			pc<=pc+fromir	
end

always @(posedge clk)
begin
	if (ARINC)
		ar <= ar+1;
	else if (ARLOAD)
		case({mux1,mux0}) 
			2'b00 ar <= frommux;
			2'b01 ar <= pc + fromir;
			2'b10 ar <= pc;  //no default needed in sequential logic
		endcase      
end;



module control_unit(
input [3:0] opcode;
input zeroflag;
output [15:0] controlsignals;
)
reg microcoderom 
		
