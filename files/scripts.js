function dilutionAmounts(value){
  if (value=="select") {
    document.getElementById("bloodVolumeResult").innerHTML = "";
    document.getElementById("cellpackVolumeResult").innerHTML = "";
    document.getElementById("totalVolumeResult").innerHTML = "";
  }
  if (value=="2") {
    document.getElementById("bloodVolumeResult").innerHTML = "100";
    document.getElementById("cellpackVolumeResult").innerHTML = "100";
    document.getElementById("totalVolumeResult").innerHTML = "200";
  }
  else if (value=="3") {
    document.getElementById("bloodVolumeResult").innerHTML = "100";
    document.getElementById("cellpackVolumeResult").innerHTML = "200";
    document.getElementById("totalVolumeResult").innerHTML = "300";
  }
  else if (value=="5") {
    document.getElementById("bloodVolumeResult").innerHTML = "50";
    document.getElementById("cellpackVolumeResult").innerHTML = "200";
    document.getElementById("totalVolumeResult").innerHTML = "250";
  }
  wbcCalcDilution("rawWbc");
  pltCalcDilution("rawPlt");
  hgbCalcDilution("rawHgb");
  highWbcCalcDilution("rawHighWbc");
}

function wbcDilutionRangeCalc(id) {
  let input = document.getElementById(id).value;
  let dilutionRangeLow = Math.round((input * 0.85 + Number.EPSILON) * 100) / 100;
  let dilutionRangeHigh = Math.round((input * 1.15 + Number.EPSILON) * 100) / 100;
  let dilutionRange = String(dilutionRangeLow+"-"+dilutionRangeHigh)
  document.getElementById("wbcDilutionRange").value = dilutionRange;
  validationGrade();
}

function wbcCalcDilution(id) {
  let input = document.getElementById(id).value;
  let dilution = document.getElementById("dilutionFactor").value;
  let calcDilution = Math.round((input * dilution + Number.EPSILON) * 100) / 100;
  document.getElementById("wbcCalculatedDilution").value = calcDilution;
  validationGrade();
}

function pltDilutionRangeCalc(id) {
  let input = document.getElementById(id).value;
  let dilutionRangeLow = Math.round((input * 0.85 + Number.EPSILON) * 100) / 100;
  let dilutionRangeHigh = Math.round((input * 1.15 + Number.EPSILON) * 100) / 100;
  let dilutionRange = String(dilutionRangeLow+"-"+dilutionRangeHigh)
  document.getElementById("pltDilutionRange").value = dilutionRange;
  validationGrade();
}

function pltCalcDilution(id) {
  let input = document.getElementById(id).value;
  let dilution = document.getElementById("dilutionFactor").value;
  let calcDilution = Math.round((input * dilution + Number.EPSILON) * 100) / 100;
  document.getElementById("pltCalculatedDilution").value = calcDilution;
  validationGrade();
}

function hgbCalcDilution(id) {
  let input = document.getElementById(id).value;
  let dilution = document.getElementById("dilutionFactor").value;
  let calcDilution = Math.round((input * dilution + Number.EPSILON) * 100) / 100;
  document.getElementById("hgbCalculatedDilution").value = calcDilution;
}

function highWbcCalcDilution(id) {
  let input = document.getElementById(id).value;
  let dilution = document.getElementById("dilutionFactor").value;
  let calcDilution = Math.round((input * dilution + Number.EPSILON) * 100) / 100;
  document.getElementById("highWbcCalculatedDilution").value = calcDilution;
}

function validationGrade() {
  let calcWbc = document.getElementById("wbcCalculatedDilution").value;
  let rangeWbc = document.getElementById("wbcDilutionRange").value;
  let floatsWbc = rangeWbc.split('-').map(parseFloat)
  let lowWbc = floatsWbc [0];
  let highWbc = floatsWbc [1];
  
  let calcPlt = document.getElementById("pltCalculatedDilution").value;
  let rangePlt = document.getElementById("pltDilutionRange").value;
  let floatsPlt = rangePlt.split('-').map(parseFloat)
  let lowPlt = floatsPlt [0];
  let highPlt = floatsPlt [1];
  
  if ((calcWbc>=lowWbc && calcWbc<=highWbc) || (calcPlt>=lowPlt && calcPlt<=highPlt)) {
    document.getElementById("validationGrade").innerHTML = "PASS";
    document.getElementById("validationGrade").classList.remove("fail");
    document.getElementById("validationGrade").classList.add("pass");
    document.getElementById("hgbCalculatedDilution").setAttribute("type","text");
    document.getElementById("hgbCalculatedDilution").setAttribute("inputmode","numeric");
    document.getElementById("highWbcCalculatedDilution").setAttribute("type","text");
    document.getElementById("highWbcCalculatedDilution").setAttribute("inputmode","numeric");
  }
  else {
    document.getElementById("validationGrade").innerHTML = "FAIL";
    document.getElementById("validationGrade").classList.remove("pass");
    document.getElementById("validationGrade").classList.add("fail");
    document.getElementById("hgbCalculatedDilution").setAttribute("type","hidden");
    document.getElementById("highWbcCalculatedDilution").setAttribute("type","hidden");
  }
}

function plasmaBlankCalc() {
  let initialHgb = document.getElementById("initialHgb").value;
  let initialHct = document.getElementById("initialHct").value;
  let plasmaBlank = document.getElementById("plasmaBlankHgb").value;
  let calc = Math.round(((initialHgb-((1-(initialHct/100))*plasmaBlank)) + Number.EPSILON) * 100) / 100;
  document.getElementById("correctedHgb").value = calc;
}

function correctedWbcCalc() {
  let tnc = document.getElementById("tnc").value;
  let nrbc = document.getElementById("nrbc").value;
  nrbc = parseFloat(nrbc,10);
  let calc = Math.round((((tnc*100)/(nrbc+100)) + Number.EPSILON) * 100) / 100;
  document.getElementById("correctedWbc").value = calc;
}

function indicesCalc() {
  let irbc = document.getElementById("iRbc").value;
  let ihgb = document.getElementById("iHgb").value;
  let ihct = document.getElementById("iHct").value;

  let calcmch = Math.round((((ihgb/irbc)*10) + Number.EPSILON) * 100) / 100;
  let calcmcv = Math.round((((ihct/irbc)*10) + Number.EPSILON) * 100) / 100;
  let calcmchc = Math.round((((ihgb/ihct)*100) + Number.EPSILON) * 100) / 100;

  document.getElementById("iMch").value = calcmch;
  document.getElementById("iMcv").value = calcmcv;
  document.getElementById("iMchc").value = calcmchc;
}

function ancCalc() {
  let wbc = document.getElementById("ancWBC").value;
  let seg = document.getElementById("seg").value;
  let band = document.getElementById("band").value;
  neut = parseInt(seg,10)+parseInt(band,10)

  let calc = Math.round(((((neut)*wbc)/100) + Number.EPSILON) * 100) / 100;
 
  document.getElementById("anc").value = calc;
}

function altWbcCalc() {
  let wbc = document.getElementById("otherWBC").value;
  let perct = document.getElementById("otherWbcPerct").value;

  let calc = Math.round((((perct*wbc)/100) + Number.EPSILON) * 100) / 100;
 
  document.getElementById("otherAbsCount").value = calc;
}