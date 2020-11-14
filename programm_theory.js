//================ All function ======================================================

//================ MAIN ======================================================
//======== Global variable ===================================================
//////////////////////
//Sarted matrix:	//
var arrSA = [		//
	[5, 6, 7],		//
	[3, 4, 5],		//
	[4, 7, 7]		//
];					//
//////////////////////

////////////////////////////////////////////////////////////////////
//var. will have selected strategii:							  //
var va = 0, ma = 0, se = 0, gur = 0, la = 0;					  //
//va - I, ma - II, gur - III, se - IV, la - V. - Number kriteriya //
////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//array for search strategiya:																						//
var arrVA = new Array(3), arrMA = new Array(3), arrSE = new Array(3), arrGUR = new Array(3), arrLA = new Array(3);	//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//============================================================================
//=========== Programm: ======================================================
var bt_result = document.querySelector("div.result");
bt_result.onclick = () =>{
	//====== Read data from matrix-table =================
	//matrix - name inputs when use matrix-table:
	var inputs_data = document.querySelectorAll("input");
	//id for array inputes_data:
	var id = 0;
	for(i = 0; i < 3; i++){
		for(j = 0; j < 3; j++){
			arrSA[i][j] = inputs_data[id].value;
			id++;
		}
	}
	//============================================================================
	///////////////////////////////////////////////////////////////////////////////////
	var res_td = document.querySelectorAll("#res tr td");//elements Result-matrix	 //
	///////////////////////////////////////////////////////////////////////////////////
	//================================== I =======================================
	//////////////////////////
	var a;//var. for trash	//
	//////////////////////////
	//zicl for search min in all strtegii Samsung:
	for (i = 0; i < 3; i++) {
		a = arrSA[i][0];
		arrVA[i] = a;
		for (j = 1; j < 3; j++) {
			if (arrSA[i][j] < a) {
				arrVA[i] = a;
			}
		}
	}
	///////////////////////////////////////////////////////////
	var va1 = arrVA[0];//var. for search max maney in arrVA	 //
	///////////////////////////////////////////////////////////
	for (i = 1; i < 3; i++) {
		if (va1 < arrVA[i]) {
			va1 = arrVA[i];
			va = i;
		}
	}
	res_td[0].innerHTML = "A" + (va + 1);//Output in I row.
	//============================================================================
	//================================== II ======================================
	///////////////////////////
	var a1;//var. for trash	 //
	///////////////////////////
	//zicl for search max in all strtegii Samsung:
	for (i = 0; i < 3; i++) {
		a1 = arrSA[i][0];
		arrMA[i] = a1;
		for (j = 1; j < 3; j++) {
			if (arrSA[i][j] > a1) {
				a1 = arrSA[i][j];
				arrMA[i] = a1;
			}
		}
	}
	//////////////////////////////////////
	var ma1 = arrMA[0];//var. for trash //
	//////////////////////////////////////
	for (i = 1; i < 3; i++) {
		if (ma1 < arrMA[i]) {
			ma1 = arrMA[i];
			ma = i;
		}
	}
	res_td[1].innerHTML = "A" + (ma + 1);//Output in II row.
	//============================================================================
	//================================ III =======================================
	////////////////////////////////
	const A = 0.4, B = 0.6;		  //
	////////////////////////////////
	//load array arrGUR:
	for (i = 0; i < 3; i++) {
		arrGUR[i] = (B * arrVA[i]) + (A * arrMA[i]);
	}
	////////////////////////////////////////
	var gur1 = arrGUR[0];//var. for trash //
	////////////////////////////////////////
	for (i = 1; i < 3; i++) {
		if (gur1 < arrGUR[i]) {
			gur1 = arrGUR[i];
			gur = i;
		}
	}
	res_td[2].innerHTML = "A" + (gur + 1);//Output in III row.
	//============================================================================
	//================================== IV ======================================
	////////////////////////
	var se1 = arrMA[0];	  //
	////////////////////////
	//zicl:
	for (i = 1; i < 3; i++) {
		if (se1 > arrMA[i]) {
			se1 = arrMA[i];
			se = i;
		}
	}
	res_td[3].innerHTML = "A" + (se + 1);//Output in IV row.
	//============================================================================
	//================================== V =======================================
	///////////////////
	var AA = 0.33;	 //
	///////////////////
	//zicl:
	for (i = 0; i < 3; i++) {
		for (j = 0; j < 3; j++) {
			if (j == 0) {
				arrLA[i] = arrSA[i][j] * AA;
			}
			else {
				arrLA[i] += arrSA[i][j] * AA;
			}
		}
	}
	//////////////////////////////////////
	var la1 = arrLA[0];//var. for trash //
	//////////////////////////////////////
	for (i = 1; i < 3; i++) {
		if (la1 < arrLA[i]) {
			la1 = arrLA[i];
			la = i;
		}
	}
	res_td[4].innerHTML = "A" + (la + 1);//Output in V row.
	//============================================================================
}

////////// Delete data in inputs and res-table ///////////////
var bt_reset = document.querySelector("div.reset");
bt_reset.onclick = () => {
	var inputs_data = document.querySelectorAll("input");
	for(i = 0; i < inputs_data.length; i++){
		inputs_data[i].value = "";
	}
	
	var res_td = document.querySelectorAll("#res tr td");
	for(i = 0; i < res_td.length; i++){
		res_td[i].innerHTML = "";
	}
}
