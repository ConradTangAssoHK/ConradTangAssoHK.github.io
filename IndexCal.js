/* Database */
var gridHM20C = [[13,14,15,16],[9,10,11,12],[5,6,7,8],[1,2,3,4]];
var gridSM10C = [["SW","SE"],["NW","NE"]];
var gridHP5C = [[21,22,23,24,25],[16,17,18,19,20],[11,12,13,14,15],[6, 7, 8, 9, 10],[1, 2, 3, 4, 5]];
var gridHP1C = [["C", "D"],["A", "B"]];

function submitCoord() {
	var northing = document.forms.form1.inputN.value;
	var easting = document.forms.form1.inputE.value;
	
	warningOutBound20.style.display = 'none';
	warningOutBound10.style.display = 'none';
	warningOutBound5.style.display = 'none';
	warningOutBound1.style.display = 'none';
	
	if (northing == null || northing == "" || easting == null || easting == "") {
		validFill.style.display = 'block';
		return false;
	} else {
		validFill.style.display = 'none';
	}
	if (isNaN(northing) || isNaN(easting)) {
		validValue.style.display = 'block';
		return false;
	} else {
		validValue.style.display = 'none';
	}
	if (northing < 800000 || northing > 848000 || easting < 800000 || easting > 860000) {
		validValue80.style.display = 'block';
		return false;
	} else {
		validValue80.style.display = 'none';
	}
	
	northing = northing - 800000;
	easting = easting - 800000;
	var gridIndex = deriveGrid(northing, easting);
	document.forms.form1.output.value = gridIndex;
}

function deriveGrid(northing, easting) {
	var temp20c = derHM20C(northing, easting);
	var index20c = gridHM20C[temp20c[0]-1][temp20c[1]-1];
	northing = northing - ((temp20c[0]-1)*12000);
	easting = easting - ((temp20c[1]-1)*15000);
	
	var temp10c = derSM10C(northing, easting);
	var index10c = gridSM10C[temp10c[0]-1][temp10c[1]-1];
	northing = northing - ((temp10c[0]-1)*6000);
	easting = easting - ((temp10c[1]-1)*7500);
	
	var temp5c = derHP5C(northing, easting);
	var index5c = gridHP5C[temp5c[0]-1][temp5c[1]-1];
	northing = northing - ((temp5c[0]-1)*1200);
	easting = easting - ((temp5c[1]-1)*1500);
	
	var temp1c = derHP1C(northing, easting);
	var index1c = gridHP1C[temp1c[0]-1][temp1c[1]-1];
	
	var gridIndex = index20c + "-" + index10c + "-" + index5c + index1c;
	return gridIndex;
}

function derHM20C(northing, easting) {
	var tempN = Math.ceil(northing /12000);
	var tempE = Math.ceil(easting / 15000);
	if (northing % 12000 == 0 || easting % 15000 == 0) {
		warningOutBound20.style.display = 'block';
	}
	var temp20c = [tempN, tempE];
	return temp20c;
}

function derSM10C(northing, easting) {
	var tempN = Math.ceil(northing / 6000);
	var tempE = Math.ceil(easting / 7500);
	if (northing % 6000 == 0 || easting % 7500 == 0) {
		warningOutBound10.style.display = 'block';
	}
	var temp10c = [tempN, tempE];
	return temp10c;
}

function derHP5C(northing, easting) {
	var tempN = Math.ceil(northing / 1200);
	var tempE = Math.ceil(easting / 1500);
	if (northing % 1200 == 0 || easting % 1500 == 0) {
		warningOutBound5.style.display = 'block';
	}
	var temp5c = [tempN, tempE];
	return temp5c;
}

function derHP1C(northing, easting) {
	var tempN = Math.ceil(northing / 600);
	var tempE = Math.ceil(easting / 750);
	if (northing % 1200 == 0 || easting % 1500 == 0) {
		warningOutBound1.style.display = 'block';
	}
	var temp1c = [tempN, tempE];
	return temp1c;
}
