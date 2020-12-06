//////////////////////////////////////////////////////////////////////////////////////////
/////////////////// Autor: ///////////////////////////////////////////////////////////////
//																						//
//		-| Theory game with nature |-													//
//																						//
//		@XxxdimooonxxX 2020																//
//////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Global variable: ///////////////////////////////////////////////
var arrSA;		//Main Matrix															//
//======================================================================================//
//var.-kriterii? which will have selected strategii:									//
var va	= 0,	//va	- I																//
	ma	= 0,	//ma	- II															//
	gur	= 0,	//gur	- III															//
	se	= 0,	//se	- IV															//
	la	= 0;	//la	- V																//
//======================================================================================//
//array, which will help for search strategiya:											//
var arrVA, arrMA, arrSE, arrGUR, arrLA;													//
//////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Programm: //////////////////////////////////////////////////////
/////////////////////// Create matrix: ///////////////////////////////////////////////////
var len_x = document.querySelector("input#size_x");
var len_y = document.querySelector("input#size_y");
var l_x = 0, l_y = 0;	//size matrix, x - state nature, y - "strategii"
var bt_create = document.querySelector("div#create");
var ass = 0;
bt_create.onclick = () =>{
	if(ass != 0){
		var t_matrix = document.querySelector(".table_dark");
		var len_tr_del = t_matrix.childElementCount;

		for(i = 0; i < len_tr_del; i++){
			var tr_del = t_matrix.firstElementChild;
			t_matrix.removeChild(tr_del);
		}
	}
	ass++;

	l_x = Number(len_x.value);
	l_y = Number(len_y.value);

	arrSA	= new Array(l_y);	//array "main matrix"
	arrVA	= new Array(l_y);
	arrMA	= new Array(l_y);
	arrSE	= new Array(l_y);
	arrGUR	= new Array(l_y);
	arrLA	= new Array(l_y);

	//create array in array "main matrix"
	for(i = 0; i < l_y; i++){
		arrSA[i] = new Array(l_x);
	}

	//create table-matrix(main matrix) in HTML:
	var main_matrix = document.querySelector(".table_dark"); //get element .table_dark
	var A_size = 1; //счетчик стратегий, для таблицы

	for(i = 0; i < l_y + 1; i++){
		//Для строки таблицы-матрицы, в которой указываются состояние природы
		if(i == 0){
			var tr_matrix = document.createElement("tr");//create tr
			for(j = 0; j < l_x + 1; j++){
				var th_matrix = document.createElement("th");//create th
				
				if(j == 0){
					th_matrix.innerHTML = "S/A";
				}else{
					th_matrix.innerHTML = "B" + j;
				}

				tr_matrix.appendChild(th_matrix);
			}
			main_matrix.appendChild(tr_matrix);
		}
		//для строк-стратегий, указывается номер стратегии и вставляет поля-ввода
		if(i != 0){
			var tr_matrix = document.createElement("tr");//create tr
			var th_matrix = document.createElement("th");//create th
			
			th_matrix.innerHTML = "A" + A_size;
			A_size++;
			tr_matrix.appendChild(th_matrix);

			for(j = 1; j < l_x + 1; j++){
				var td_matrix = document.createElement("td");//create td
				var inps = document.createElement("input");
				inps.name = "matrix";
				inps.id = "matrix";
				inps.type = "number";

				td_matrix.appendChild(inps);
				tr_matrix.appendChild(td_matrix);
			}
			main_matrix.appendChild(tr_matrix);
		}
	}
	//END create table-matrix(main matrix) in HTML
}
//////////////////////////////////////////////////////////////////////////////////////////
////////////// PART PROGRAMM, WHICH SEARCH NUMBER "strategii" ////////////////////////////
var bt_result = document.querySelector("div#result");	//button result, which performed main code
bt_result.onclick = () =>{
	//====== Read data from matrix-table =================
	//matrix - name inputs when use matrix-table:
	var inputs_data = document.querySelectorAll("input#matrix");
	var id = 0; //id for array inputes_data:
	for(i = 0; i < l_y; i++){
		for(j = 0; j < l_x; j++){
			arrSA[i][j] = inputs_data[id].value;
			id++;
		}
	}
	//====== END Read data from matrix-table =======================================
	//====== var., for output result in table-res ==================================
	var res_td = document.querySelectorAll("#res tr td");	//elements Result-matrix
	//====== END var., for output result in table-res ==============================
	//================================== I =========================================
	var a;	//var. for trash
	//zicl for search min in all strtegii Samsung:
	for (i = 0; i < l_y; i++) {
		a = arrSA[i][0];
		arrVA[i] = a;
		for (j = 1; j < l_x; j++) {
			if (arrSA[i][j] < a) {
				arrVA[i] = a;
			}
		}
	}
	//Search maxed in arrVA
	var va1 = arrVA[0];	//var. for search maxed in arrVA
	for (i = 1; i < l_y; i++) {
		if (va1 < arrVA[i]) {
			va1 = arrVA[i];
			va = i;
		}
	}
	//SHOW:
	res_td[0].innerHTML = "A" + (va + 1);	//Output in I row. result-table
	//================================== END - I ===================================
	//================================== II ========================================
	//zicl for search max in all strtegii Samsung:
	for (i = 0; i < l_y; i++) {
		a = arrSA[i][0];
		arrMA[i] = a;
		for (j = 1; j < l_x; j++) {
			if (arrSA[i][j] > a) {
				a = arrSA[i][j];
				arrMA[i] = a;
			}
		}
	}
	//Search maxed in arrMA
	var ma1 = arrMA[0];	//var. for trash
	for (i = 1; i < l_y; i++) {
		if (ma1 < arrMA[i]) {
			ma1 = arrMA[i];
			ma = i;
		}
	}
	//SHOW:
	res_td[1].innerHTML = "A" + (ma + 1);//Output in II row.
	//================================== END - II ==================================
	//================================ III =========================================
	const A = 0.4, B = 0.6;	//veroyzrnoct'
	//load array arrGUR:
	for (i = 0; i < l_y; i++) {
		arrGUR[i] = (B * arrVA[i]) + (A * arrMA[i]);
	}
	//Search "kriteriya" metodth Gurvits
	var gur1 = arrGUR[0];//var. for trash
	for (i = 1; i < l_y; i++) {
		if (gur1 < arrGUR[i]) {
			gur1 = arrGUR[i];
			gur = i;
		}
	}
	//SHOW:
	res_td[2].innerHTML = "A" + (gur + 1);//Output in III row.
	//================================ END - III ===================================
	//================================== IV ========================================
	//Search min. "riska"
	var se1 = arrMA[0];	//var. for trash
	//zicl:
	for (i = 1; i < l_y; i++) {
		if (se1 > arrMA[i]) {
			se1 = arrMA[i];
			se = i;
		}
	}
	//SHOW: 
	res_td[3].innerHTML = "A" + (se + 1);//Output in IV row.
	//================================== END - IV ==================================
	//================================== V =========================================
	var AA = 0.33;	//"    ravnoveroyzrnost'        "
	//zicl:
	for (i = 0; i < l_y; i++) {
		for (j = 0; j < l_x; j++) {
			if (j == 0) {
				arrLA[i] = arrSA[i][j] * AA;
			}
			else {
				arrLA[i] += arrSA[i][j] * AA;
			}
		}
	}
	//Searh "kriteriya" metodth Laplasa
	var la1 = arrLA[0];//var. for trash
	for (i = 1; i < l_y; i++) {
		if (la1 < arrLA[i]) {
			la1 = arrLA[i];
			la = i;
		}
	}
	//SHOW:
	res_td[4].innerHTML = "A" + (la + 1);//Output in V row.
	//================================== END - V ===================================
}
//////////////////////////////////////////////////////////////////////////////////////////
////////// Delete data in inputs and res-table ///////////////////////////////////////////
var bt_reset = document.querySelector("div#reset");
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
//////////////////////////////////////////////////////////////////////////////////////////
////////// Open info /////////////////////////////////////////////////////////////////////
var bt_p	= document.querySelectorAll("div.bt_plus");		//все плюсики
var h_text	= document.querySelectorAll(".hidden_text");	//все скрытые тексты
var check	= new Array(bt_p.length);						//state h_text(1 - open, 0 - close)
for(i = 0; i < bt_p.length; i++){
	check[i] = 1;
}

//при клике открываем скрытый тексты
bt_p[0].onclick = () =>{
	if(check[0] == 1){
		h_text[0].style.position = "relative";
		h_text[0].style.height = "300px";
		h_text[0].style.width = "100%";
		check[0]--;
	}else{
		h_text[0].style.position = "absolute";
		h_text[0].style.height = "0px";
		h_text[0].style.width = "0px";
		check[0]++;
	}
}

bt_p[1].onclick = () =>{
	if(check[1] == 1){
		h_text[1].style.position = "relative";
		h_text[1].style.height = "300px";
		h_text[1].style.width = "350px";
		check[1]--;
	}else{
		h_text[1].style.position = "absolute";
		h_text[1].style.height = "0px";
		h_text[1].style.width = "0px";
		check[1]++;
	}
}
//////////////////////////////////////////////////////////////////////////////////////////
