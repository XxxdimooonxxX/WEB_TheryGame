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
/////////////////////// Create matrix: ///////////////////////////////////////////////////
var el_input_x  = document.querySelector("#input_x");
var el_input_y  = document.querySelector("#input_y");
var bt_create   = document.querySelector("#create");
var el_SC		= document.querySelectorAll(".check-select");//check-select in .criteriy

var l_x = 0, l_y = 0;	//size matrix, x - states nature, y - "strategii"
var check_del = false;	//check for delete main-table
bt_create.onclick = () =>{
	l_x = Number(el_input_x.value);
	l_y = Number(el_input_y.value);

	var el_aletrSize = document.querySelector(".vvod__alert-size");
	var el_hiddenVvod = document.querySelector(".vvod__hidden-vvod");
	if(l_x < 2 || l_y < 2){
		el_aletrSize.style.display = "block";
		el_hiddenVvod.style.display = "none";
		el_aletrSize.querySelector("p").innerHTML = "Матрица не может быть меньше 2х2!!!";
		return;
	}
	el_hiddenVvod.style.display = "block";
	el_aletrSize.style.display = "none";

	//delete main-table if before table "sush'estvuet"
	if(check_del){
		var t_matrix    = document.querySelector(".table-dark");    //element table
        var len_tr_del  = t_matrix.childElementCount;               //count elements in main-table
        
		for(i = 0; i < len_tr_del; i++){
			var tr_del = t_matrix.firstElementChild;	//get element
			t_matrix.removeChild(tr_del);	            //delete element
		}
	}
	if(!check_del){
        el_hiddenVvod.style.display = "block";
        check_del = true;
	}

    //create arrays:
	arrVA	= new Array(l_y);
	arrMA	= new Array(l_y);
	arrSE	= new Array(l_y);
	arrGUR	= new Array(l_y);
	arrLA	= new Array(l_y);

    //create array in array "main matrix"
    arrSA	= new Array(l_y);	//array "main matrix"
	for(i = 0; i < l_y; i++){
		arrSA[i] = new Array(l_x);
	}

	//create table-matrix(main matrix) in HTML:
	var main_matrix = document.querySelector(".table-dark"); //get element .table_dark
	var A_size = 1; //номер стратегий, для таблицы

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

				tr_matrix.appendChild(th_matrix);//add in tr
			}
			main_matrix.appendChild(tr_matrix);//add tr in table-dark
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
                var inps = document.createElement("input");//create input
				//inps.name = "matrix";
				inps.id = "matrix";
				inps.type = "number";

				td_matrix.appendChild(inps);//add input in td
				tr_matrix.appendChild(td_matrix);//add td in tr
			}
			main_matrix.appendChild(tr_matrix);//add tr in table-dark
		}
	}
	//END create table-matrix(main matrix) in HTML
}
//////////////////////////////////////////////////////////////////////////////////////////
////////////// PART PROGRAMM, WHICH SEARCH NUMBER "strategii" ////////////////////////////
var bt_result = document.querySelector("#bt_result");  //element button result, which performed main code
bt_result.onclick = () =>{
	//====== Read data from matrix-table =================
	//matrix - name inputs when use matrix-table:
	var el_inputs = document.querySelectorAll("input#matrix");//array elements inputs in table-dark
	var id = 0; //id for array inputes_data:
	for(i = 0; i < l_y; i++){
		for(j = 0; j < l_x; j++){
			arrSA[i][j] = el_inputs[id].value;
			id++;
		}
	}
	//====== END Read data from matrix-table =======================================
	//====== var., for output result in table-res ==================================
	var el_res_td = document.querySelectorAll("#res tr td");	//elements Result-matrix
    //====== END var., for output result in table-res ==============================
    //====== set 0 in variable, which хранят number "strategii" ====================
	va = ma = gur = se = la = 0;
	//clear result table
	for(i = 0; i < 5; i++){
		el_res_td[i].innerHTML = "";
	}
    //====== END set 0 in variable, which хранят number "strategii" ================
	//================================== I =========================================
	if(el_SC[0].checked){
		//zicl for search min in all strtegii Samsung:
		for (i = 0; i < l_y; i++) {
			arrVA[i] = Number(arrSA[i][0]);
			for (j = 1; j < l_x; j++) {
				if (Number(arrSA[i][j]) < arrVA[i]) {
					arrVA[i] = Number(arrSA[i][j]);
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
		el_res_td[0].innerHTML = "A" + (va + 1);	//Output in I row. result-table
	}
	//================================== END - I ===================================
	//================================== II ========================================
	if(el_SC[1].checked){
		//zicl for search max in all strtegii Samsung:
		for (i = 0; i < l_y; i++) {
			arrMA[i] = Number(arrSA[i][0]);
			for (j = 1; j < l_x; j++) {
				if (Number(arrSA[i][j]) > arrMA[i]) {
					arrMA[i] = Number(arrSA[i][j]);
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
		el_res_td[1].innerHTML = "A" + (ma + 1);//Output in II row.
	}
	//================================== END - II ==================================
	//================================ III =========================================
	if(el_SC[2].checked){
		const A = 0.4, B = 0.6;	//veroyzrnoct'
		//load array arrGUR:
		for (i = 0; i < l_y; i++) {
			arrGUR[i] = Number(B * Number(arrVA[i])) + (A * Number(arrMA[i]));
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
		el_res_td[2].innerHTML = "A" + (gur + 1);//Output in III row.
	}
	//================================ END - III ===================================
	//================================== IV ========================================
	if(el_SC[3].checked){
		var arrSE1 = new Array(l_x);//max in all colums
		//search max in all collums
		for(i = 0; i < l_x; i++){
			arrSE1[i] = arrSA[0][i];
			for(j = 1; j < l_y; j++){
				if(arrSE1[i] < arrSA[j][i]){
					arrSE1[i] = arrSA[j][i];
				}
			}
		}
		//max in all rows
		for(i = 0; i < l_y; i++){
			arrSE[i] = arrSE1[0] - Number(arrSA[i][0]);
			for(j = 1; j < l_x; j++){
				if(arrSE[i] < arrSE1[j] - Number(arrSA[i][j])){
					arrSE[i] = arrSE1[j] - Number(arrSA[i][j]);
				}
			}
		}
		//Search min. "riska"
		var se1 = arrSE[0];	//var. for trash
		//zicl:
		for (i = 1; i < l_y; i++) {
			if (se1 > arrSE[i]) {
				se1 = arrSE[i];
				se = i;
			}
		}
		//SHOW: 
		el_res_td[3].innerHTML = "A" + (se + 1);//Output in IV row.
	}
	//================================== END - IV ==================================
	//================================== V =========================================
	if(el_SC[4].checked){
		var AA = 0.33;	//"    ravnoveroyzrnost'        "
		//zicl:
		for (i = 0; i < l_y; i++) {
			for (j = 0; j < l_x; j++) {
				if (j == 0) {
					arrLA[i] = Number(arrSA[i][j]) * AA;
				}
				else {
					arrLA[i] += Number(arrSA[i][j]) * AA;
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
		el_res_td[4].innerHTML = "A" + (la + 1);//Output in V row.
	}
	//================================== END - V ===================================
}
//////////////////////////////////////////////////////////////////////////////////////////
////////// Delete data in inputs and res-table ///////////////////////////////////////////
var bt_reset = document.querySelector("#bt_reset");
bt_reset.onclick = () => {
	var el_inputs = document.querySelectorAll("input");
	for(i = 0; i < el_inputs.length; i++){
		el_inputs[i].value = "";
	}
	
	var el_res_td = document.querySelectorAll("#res tr td");
	for(i = 0; i < el_res_td.length; i++){
		el_res_td[i].innerHTML = "";
	}
}
//////////////////////////////////////////////////////////////////////////////////////////
//////////////// Open and Close hidden-text(info) ////////////////////////////////////////
var el_HT_title = document.querySelectorAll(".hidden-text__title");     //array elements title
var el_HT_text  = document.querySelectorAll(".hidden-text__text");      //array elements text
var check       = new Array(el_HT_text.length);                         //array check, for check on open and close
for(i = 0; i < el_HT_text.length; i++){
    check[i] = true;
}
var height_text;//save size hidden-text__text

el_HT_title[0].onclick = () =>{
    if(check[0]){
        el_HT_text[0].style.height = "100%";//set 100% to find out size in px
        height_text = el_HT_text[0].offsetHeight + "px";//save size in px
        el_HT_text[0].style.height = "0px";//set back 0px
        //animation
        el_HT_text[0].animate([{height: "0px"}, {height: height_text}], 500);
        //
        el_HT_text[0].style.height = height_text;//set full size height
        el_HT_title[0].querySelector(".hidden-text__x").style.transform = "rotate(45deg)";//rotate "+" in title hidden-text
        //for repeate click, hidden-text close:
        check[0] = false;
    }else{
        height_text = el_HT_text[0].offsetHeight + "px";//save size in px
        //animation
        el_HT_text[0].animate([{height: height_text},{height: "0px"}],500);
        //
        el_HT_text[0].style.height = "0px";
        el_HT_title[0].querySelector(".hidden-text__x").style.transform = "rotate(0deg)";
        //for repeate click, hidden-text open:
        check[0] = true;
    }
}

el_HT_title[1].onclick = () =>{
    if(check[1]){
        el_HT_text[1].style.height = "100%";//set 100% to find out size in px
        height_text = el_HT_text[1].offsetHeight + "px";//save size in px
        el_HT_text[1].style.height = "0px";//set back 0px
        //animation
        el_HT_text[1].animate([{height: "0px"}, {height: height_text}], 500);
        //
        el_HT_text[1].style.height = height_text;//set full size height
        el_HT_title[1].querySelector(".hidden-text__x").style.transform = "rotate(45deg)";//rotate "+" in title hidden-text
        //for repeate click, hidden-text close:
        check[1] = false;
    }else{
        height_text = el_HT_text[1].offsetHeight + "px";//save size in px
        //animation
        el_HT_text[1].animate([{height: height_text},{height: "0px"}],500);
        //
        el_HT_text[1].style.height = "0px";
        el_HT_title[1].querySelector(".hidden-text__x").style.transform = "rotate(0deg)";
        //for repeate click, hidden-text open:
        check[1] = true;
    }
}

//////////////////////////////////////////////////////////////////////////////////////////
//////////////// Open info in criteries //////////////////////////////////////////////////
//NC = Name Class
//CI = Criteriy Info
var bt_infoCriteria = document.querySelectorAll(".criteriy-open-info");
var el_criteriyInfo = document.querySelectorAll(".criteriy-info");
//var NC_el_CI = "criteriy-info";
//var NC_bt_IC = "criteriy-open-info";
var checkInfo = new Array(bt_infoCriteria.length);
for(i = 0; i < bt_infoCriteria.length; i++){
	el_criteriyInfo[i].className = i + "criteriy-info" + " " + "criteriy-info";
	bt_infoCriteria[i].className = i + "criteriy-open-info" + " " + "criteriy-open-info";
	checkInfo[i] = true;
}

var heightInfo = 0;
var target, char_T;

bt_infoCriteria[0].onclick = OpenInfo;
bt_infoCriteria[1].onclick = OpenInfo;
bt_infoCriteria[2].onclick = OpenInfo;
bt_infoCriteria[3].onclick = OpenInfo;
bt_infoCriteria[4].onclick = OpenInfo;

function OpenInfo(event){
	target = event.target.className;
	char_T = target[0];
	if(checkInfo[char_T]){
		el_criteriyInfo[char_T].style.height = "100%";
		el_criteriyInfo[char_T].style.borderTop = "2px dashed #007FE6";
		heightInfo = el_criteriyInfo[char_T].offsetHeight + 1 + "px";
		el_criteriyInfo[char_T].style.borderTop = "none";
		el_criteriyInfo[char_T].style.height = "0px";

		el_criteriyInfo[char_T].animate([{height: "0px"}, {height: heightInfo}], 500);

		el_criteriyInfo[char_T].style.borderTop = "2px dashed #007FE6";
		el_criteriyInfo[char_T].style.height = heightInfo;

		checkInfo[char_T] = false;
	}else{
		el_criteriyInfo[char_T].style.height = "100%";
		el_criteriyInfo[char_T].style.borderTop = "none";
		heightInfo = el_criteriyInfo[char_T].offsetHeight + 1 + "px";
		el_criteriyInfo[char_T].style.height = "0px";

		el_criteriyInfo[char_T].animate([{height: heightInfo}, {height: "0px"}], 500);

		el_criteriyInfo[char_T].style.height = "0px";

		checkInfo[char_T] = true;
	}
}

/*
На будущее
Исправление ошибок, или добавление нового функционала:
    1. Добавить(изменить) вывод так, чтобы было понятно любому пользователю. То есть надо сделать его подробным
    2. Добавить выбор критериев
    3. Добавить изменение вероятностей некоторых критериев
*/
//