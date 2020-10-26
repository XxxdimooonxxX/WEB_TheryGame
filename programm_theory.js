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
var matrix_main = document.getElementById("matrix");
matrix_main.style.whiteSpace = "pre-wrap";//Не убирает табуляцию
matrix_main.innerHTML = "======= Matrix =========</br>";
matrix_main.innerHTML += "---------------------------------</br>";
matrix_main.innerHTML += "|S/A		|B1		|B2		|B3		|</br>";
matrix_main.innerHTML += "---------------------------------</br>";

for (i = 0; i < 3; i++) {
	matrix_main.innerHTML += "|A" + (i + 1) + "		";
	for (j = 0; j < 3; j++) {
		matrix_main.innerHTML += "|" + arrSA[i][j] + "		";
	}
	matrix_main.innerHTML += "|</br>";
}

matrix_main.innerHTML += "---------------------------------</br>";
matrix_main.innerHTML += "\nKriterii: </br>";
matrix_main.innerHTML += "-------------";
//===================================
// I:
var k_show = document.getElementById("Kriterii");
k_show.style.whiteSpace = "pre-wrap";//Не убирает табуляцию
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
k_show.innerHTML = "|I		- A" + (va + 1) + "|</br>";
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
k_show.innerHTML += "|II		- A" + (ma + 1) + "|</br>";
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
k_show.innerHTML += "|III		- A" + (gur + 1) + "|</br>";
//===================================
// IV:
var se1 = arrMA[0];
for (i = 1; i < 3; i++) {
	if (se1 > arrMA[i]) {
		se1 = arrMA[i];
		se = i;
	}
}
k_show.innerHTML += "|IV		- A" + (se + 1) + "|</br>";
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
k_show.innerHTML += "|V		- A" + (la + 1) + "|</br>";
//===================================
k_show.innerHTML += "-------------</br>";
//==================================
