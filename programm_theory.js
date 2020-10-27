//========Global variable=============
var arrSA = [
	[5, 6, 7],
	[3, 4, 5],
	[4, 7, 7]
];

var va = 0, ma = 0, se = 0, gur = 0, la = 0;//var. will have select strategii
//va - I, ma - II, gur - III, se - IV, la - V. - Number kriteriya

//array for search strategiya:
var arrVA = new Array(3), arrMA = new Array(3), arrSE = new Array(3), arrGUR = new Array(3), arrLA = new Array(3);
//===================================
//===========programm================
// Output matrix in WEB:
var table_td = document.querySelectorAll(".table_dark tr td");//elements table-matrix

var cnt_id = 0;//index array table_td
//Add matrix in WEB suite in table_dark-matrix
for(i = 0; i < 3; i++){
	for(j = 0; j < 3; j++){
		table_td[cnt_id].innerHTML = arrSA[i][j];
		cnt_id++;
	}
}

//===================================
var res_td = document.querySelectorAll("#res tr td");//elements Result-matrix
//k_show.style.whiteSpace = "pre-wrap";//Не убирает табуляцию
// I:
var a;//var. for trash
for (i = 0; i < 3; i++) {//zicl for search min in all strtegii Samsung
	a = arrSA[i][0];
	arrVA[i] = a;
	for (j = 1; j < 3; j++) {
		if (arrSA[i][j] < a) {
			arrVA[i] = a;
		}
	}
}
var va1 = arrVA[0];//var. for search max maney in arrVA
for (i = 1; i < 3; i++) {
	if (va1 < arrVA[i]) {
		va1 = arrVA[i];
		va = i;
	}
}
res_td[0].innerHTML = "A" + (va + 1);
//===================================
// II:
var a1;//var. for trash
for (i = 0; i < 3; i++) {//zicl for search max in all strtegii Samsung
	a1 = arrSA[i][0];
	arrMA[i] = a1;
	for (j = 1; j < 3; j++) {
		if (arrSA[i][j] > a1) {
			a1 = arrSA[i][j];
			arrMA[i] = a1;
		}
	}
}
var ma1 = arrMA[0];
for (i = 1; i < 3; i++) {
	if (ma1 < arrMA[i]) {
		ma1 = arrMA[i];
		ma = i;
	}
}
res_td[1].innerHTML = "A" + (ma + 1);
//===================================
// III:
var A = 0.4, B = 0.6;//const
for (i = 0; i < 3; i++) {//load array arrGUR
	arrGUR[i] = (B * arrVA[i]) + (A * arrMA[i]);
}
var gur1 = arrGUR[0];
for (i = 1; i < 3; i++) {
	if (gur1 < arrGUR[i]) {
		gur1 = arrGUR[i];
		gur = i;
	}
}
res_td[2].innerHTML = "A" + (gur + 1);
//===================================
// IV:
var se1 = arrMA[0];
for (i = 1; i < 3; i++) {
	if (se1 > arrMA[i]) {
		se1 = arrMA[i];
		se = i;
	}
}
res_td[3].innerHTML = "A" + (se + 1);
//===================================
// V:
var AA = 0.33;
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
var la1 = arrLA[0];
for (i = 1; i < 3; i++) {
	if (la1 < arrLA[i]) {
		la1 = arrLA[i];
		la = i;
	}
}
res_td[4].innerHTML = "A" + (la + 1);
//===================================
