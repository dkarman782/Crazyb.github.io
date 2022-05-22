function time_count(){
	var now = new Date().getTime();
	var input_time = document.getElementById("input_time").value;
	var time_draw = new Date(input_time).getTime();
	var time_dif = time_draw - now;
	var hour_dif = time_dif/(1000*3600);
	var day_dif = Math.floor(hour_dif/24);
	hour_dif = Math.floor(hour_dif%24);
	document.getElementById("time_remain").innerHTML = "時間差距："+day_dif+"日"+hour_dif+"小時";
}

function war_count(){
	const form = document.forms['input_agi'];
	var Ap_agi = Number(form.elements.Ap_agi.value);
	var Bp_agi = Number(form.elements.Bp_agi.value);
	var Aa_agi = Number(form.elements.Aa_agi.value)/100;
	var Ba_agi = Number(form.elements.Ba_agi.value)/100;
	var Ad_agi = Number(form.elements.Ad_agi.value)/100;
	var Bd_agi = Number(form.elements.Bd_agi.value)/100;

	var Atype = Number(form.elements.A_type.value);
	var Btype = Number(form.elements.B_type.value);

	var war_showA_agi = Ap_agi*(1+Aa_agi-Bd_agi);
	war_showA_agi = Number(war_showA_agi.toFixed(1));
	var war_showB_agi = Bp_agi*(1+Ba_agi-Ad_agi);
	war_showB_agi = Number(war_showB_agi.toFixed(1));

	var war_showA_agi_fna = (Ap_agi*Atype)*(1+Aa_agi-Bd_agi);
	war_showA_agi_fna = Number(war_showA_agi_fna.toFixed(1));
	var war_showB_agi_fna = (Bp_agi*Btype)*(1+Ba_agi-Ad_agi);
	war_showB_agi_fna = Number(war_showB_agi_fna.toFixed(1));

	var war_showA_xg = (war_showA_agi/((war_showA_agi+war_showB_agi)/2)-1)*100;
	war_showA_xg = Number(war_showA_xg.toFixed(1));
	var war_showB_xg = (war_showB_agi/((war_showA_agi+war_showB_agi)/2)-1)*100;
	war_showB_xg = Number(war_showB_xg.toFixed(1));

	document.getElementById("war_showA_agi").innerHTML = war_showA_agi;
	document.getElementById("war_showB_agi").innerHTML = war_showB_agi;
	document.getElementById("war_showA_xg").innerHTML = war_showA_xg+"%";
	document.getElementById("war_showB_xg").innerHTML = war_showB_xg+"%";

	var agi_high=0;
	var agi_low=0;
	if(war_showB_agi_fna>war_showA_agi_fna){
		agi_high = war_showB_agi_fna;
		agi_low = war_showA_agi_fna;
	}else{
		agi_high = war_showA_agi_fna;
		agi_low = war_showB_agi_fna;
	}
	//機率
	function C(x){
		var pA_agi = agi_high*(1+x);
		var nA_agi = agi_high*(1-x);
		var pB_agi = agi_low*(1+x);
		var nB_agi = agi_low*(1-x);
		var seeA = (pB_agi-nA_agi)/(pA_agi-nA_agi);
		var seeB = (nA_agi-nB_agi)/(pB_agi-nB_agi);

		var a13=0;
		var a14=0;
		var a15=0;
		var a16=0;
		//x
		if(1-seeA>1){
			a13 = 1;
		}else{
			a13 = 1-seeA;
		}
		//y
		if(seeB>1){
			a14 = 1;
		}else{
			a14 = seeB;
		}
		//no x
		if(1-a13>1){
			a15 = 1;
		}else{
			a15 = 1-a13; 
		}
		//no y
		if(1-a14>1){
			a16 = 1; 
		}else{
			a16 = 1-a14;
		}
		var a17 = a15*a16; //no x,y
		var a18 = 1-a17; //x&&y, x||y
		var a19 = a18+a17*0.5; //winrate
		if(a19>1){
			return 1;
		}else{
			return a19;
		}
	}
	var winA_4 = C(0.04)*100;
	winA_4 = Number(winA_4.toFixed(1));

	var loseA_4 = (1-C(0.04))*100;
	loseA_4 = Number(loseA_4.toFixed(1));

	var winA_5 = C(0.05)*100;
	winA_5 = Number(winA_5.toFixed(1));

	var loseA_5 = (1-C(0.05))*100;
	loseA_5 = Number(loseA_5.toFixed(1));

	
	if(war_showA_agi_fna>war_showB_agi_fna){
		document.getElementById("Awinrate_wayA_4").innerHTML = winA_4+"%";
		document.getElementById("Bwinrate_wayA_4").innerHTML = loseA_4+"%";
		document.getElementById("Awinrate_wayA_5").innerHTML = winA_5+"%";
		document.getElementById("Bwinrate_wayA_5").innerHTML = loseA_5+"%";
	}else{
		document.getElementById("Awinrate_wayA_4").innerHTML = loseA_4+"%";
		document.getElementById("Bwinrate_wayA_4").innerHTML = winA_4+"%";
		document.getElementById("Awinrate_wayA_5").innerHTML = loseA_5+"%";
		document.getElementById("Bwinrate_wayA_5").innerHTML = winA_5+"%";
	}
	//區間
	//+5%
	var ap5 = agi_high*1.05;
	var bp5 = agi_low*1.05;
	//+4%
	var ap4 = agi_high*1.04;
	var bp4 = agi_low*1.04;
	//+3%
	var ap3 = agi_high*1.03;
	var bp3 = agi_low*1.03;
	//+2%
	var ap2 = agi_high*1.02;
	var bp2 = agi_low*1.02;
	//+1%
	var ap1 = agi_high*1.01;
	var bp1 = agi_low*1.01;
	//0%
	var a0 = agi_high*1;
	var b0 = agi_low*1;
	//-1%
	var an1 = agi_high*0.99;
	var bn1 = agi_low*0.99;
	//-2%
	var an2 = agi_high*0.98;
	var bn2 = agi_low*0.98;
	//-3%
	var an3 = agi_high*0.97;
	var bn3 = agi_low*0.97;
	//-4%
	var an4 = agi_high*0.96;
	var bn4 = agi_low*0.96;
	//-5%
	var an5 = agi_high*0.95;
	var bn5 = agi_low*0.95;

	let a_4 = [ap4,ap3,ap2,ap1,a0,an1,an2,an3,an4];
	let a_5 = [ap5,ap4,ap3,ap2,ap1,a0,an1,an2,an3,an4,an5];
	let b_4 = [bp4,bp3,bp2,bp1,b0,bn1,bn2,bn3,bn4];
	let b_5 = [bp5,bp4,bp3,bp2,bp1,b0,bn1,bn2,bn3,bn4,bn5];
	let a_4_blose = [];
	let a_4_draw = [];
	let a_5_blose = [];
	let a_5_draw = [];

	function cif_4(x){
		var rec_w = 0;
		var rec_d = 0;
		for(var i=0;i<a_4.length;i++){
			if(Number(a_4[i])>x){
				rec_w++;
			}else if(Number(a_4[i])==x){
				rec_d++;
			}
		}
		a_4_blose.push(rec_w);
		a_4_draw.push(rec_d);
	}
	function cif_5(x){
		var rec_w = 0;
		var rec_d = 0;
		for(var i=0;i<a_5.length;i++){
			if(Number(a_5[i])>x){
				rec_w++;
			}else if(Number(a_5[i])==x){
				rec_d++;
			}
		}
		a_5_blose.push(rec_w);
		a_5_draw.push(rec_d);
	}
	
	for(var j=0;j<b_4.length;j++){
		cif_4(Number(b_4[j]));
	}
	for(var j=0;j<b_5.length;j++){
		cif_5(Number(b_5[j]));
	}

	var sum_a_4_blose = 0;
	for(var k=0;k<a_4_blose.length;k++){
		sum_a_4_blose += a_4_blose[k];
	}
	var sum_a_4_draw = 0;
	for(var k=0;k<a_4_draw.length;k++){
		sum_a_4_draw += a_4_draw[k];
	}
	var sum_a_5_blose = 0;
	for(var k=0;k<a_5_blose.length;k++){
		sum_a_5_blose += a_5_blose[k];
	}
	var sum_a_5_draw = 0;
	for(var k=0;k<a_5_draw.length;k++){
		sum_a_5_draw += a_5_draw[k];
	}

	var Awin_4 = 0;
	if(sum_a_4_blose/81>1){
		Awin_4 = 1;
	}else{
		Awin_4 = sum_a_4_blose/81;
	}
	var Adraw_4 = sum_a_4_draw/81;
	var Awin_5 = sum_a_5_blose/121;
	var Adraw_5 = sum_a_5_draw/121;

	var winB_4 = (Awin_4+Adraw_4*0.5)*100;
	winB_4 = Number(winB_4.toFixed(1));
	var loseB_4 = (1-(Awin_4+Adraw_4*0.5))*100;
	loseB_4 = Number(loseB_4.toFixed(1));
	var winB_5 = (Awin_5+Adraw_5*0.5)*100;
	winB_5 = Number(winB_5.toFixed(1));
	var loseB_5 = (1-(Awin_5+Adraw_5*0.5))*100;
	loseB_5 = Number(loseB_5.toFixed(1));


	if(war_showA_agi_fna>war_showB_agi_fna){
		document.getElementById("Awinrate_wayB_4").innerHTML = winB_4+"%";
		document.getElementById("Bwinrate_wayB_4").innerHTML = loseB_4+"%";
		document.getElementById("Awinrate_wayB_5").innerHTML = winB_5+"%";
		document.getElementById("Bwinrate_wayB_5").innerHTML = loseB_5+"%";
	}else{
		document.getElementById("Awinrate_wayB_4").innerHTML = loseB_4+"%";
		document.getElementById("Bwinrate_wayB_4").innerHTML = winB_4+"%";
		document.getElementById("Awinrate_wayB_5").innerHTML = loseB_5+"%";
		document.getElementById("Bwinrate_wayB_5").innerHTML = winB_5+"%";
	}

}
/*
function ChangeFontColor(id,color_change){
    var OriginalFont=document.getElementById(id).innerHTML;
    document.getElementById(id).innerHTML='<font color=color_change>'+OriginalFont+'</font>';
}
function fract(num) {
	return num - Math.trunc(num);
}
*/
function rnd_dmg(){
	const form = document.forms['input_dmg'];
	var th = 3;
	var count = 0;
	let color_a = [];
	let color_d = [];
	let rnd_dmg_a = [];
	let rnd_dmg_d = [];
	
	var dmgA = Number(form.elements.dmgA.value);
	var dmgB = Number(form.elements.dmgB.value);
	var x = 1-dmgB/dmgA;
	
	rnd_dmg_a[0] = x.toFixed(2)/x;
	rnd_dmg_a[0] = rnd_dmg_a[0].toFixed(2);
	rnd_dmg_a[0] = (1-rnd_dmg_a[0])*x;
	rnd_dmg_a[0] = rnd_dmg_a[0]/x.toFixed(2);
	rnd_dmg_a[0] = 1/(rnd_dmg_a[0]+1);
	rnd_dmg_a[0] = rnd_dmg_a[0].toFixed(2);
	rnd_dmg_a[0] = dmgA/rnd_dmg_a[0];
	
	for(var i=1;i<=4;i++) {
		rnd_dmg_a[i] = rnd_dmg_a[0]*(1+i/100);
		rnd_dmg_d[i] = rnd_dmg_a[0]*(1-i/100);
		rnd_dmg_a[i] = Number(Math.floor(rnd_dmg_a[i]));
		rnd_dmg_d[i] = Number(Math.floor(rnd_dmg_d[i]));
		if(Math.abs(rnd_dmg_a[i]-dmgA)<th||Math.abs(rnd_dmg_a[i]-dmgB)<th) {
			color_a[i] = 'red';
			count+=1;
		} else { color_a[i] = 'black'; }
		if(Math.abs(rnd_dmg_d[i]-dmgA)<th||Math.abs(rnd_dmg_d[i]-dmgB)<th) {
			color_d[i] = 'red';
			count+=1;
		} else { color_d[i] = 'black'; }
	} rnd_dmg_a[0] = Number(Math.floor(rnd_dmg_a[0]));
	if(Math.abs(rnd_dmg_a[0]-dmgA)<th||Math.abs(rnd_dmg_a[0]-dmgB)<th) {
		color_a[0] = 'red';
		count+=1;
	} else { color_a[0] = 'black'; }
	
	if(count<2) {
		rnd_dmg_a = [];
		rnd_dmg_d = [];
		rnd_dmg_a[0] = "輸入同配置下的兩個暴穿傷害值";
		color_a[0] = 'red';
	}
	
	document.getElementById("rnd_dmg_a0").innerHTML = '<font color='+color_a[0]+'>'+rnd_dmg_a[0]+'</font>';
	document.getElementById("rnd_dmg_a1").innerHTML = '<font color='+color_a[1]+'>'+rnd_dmg_a[1]+'</font>';
	document.getElementById("rnd_dmg_a2").innerHTML = '<font color='+color_a[2]+'>'+rnd_dmg_a[2]+'</font>';
	document.getElementById("rnd_dmg_a3").innerHTML = '<font color='+color_a[3]+'>'+rnd_dmg_a[3]+'</font>';
	document.getElementById("rnd_dmg_a4").innerHTML = '<font color='+color_a[4]+'>'+rnd_dmg_a[4]+'</font>';
	document.getElementById("rnd_dmg_d1").innerHTML = '<font color='+color_d[1]+'>'+rnd_dmg_d[1]+'</font>';
	document.getElementById("rnd_dmg_d2").innerHTML = '<font color='+color_d[2]+'>'+rnd_dmg_d[2]+'</font>';
	document.getElementById("rnd_dmg_d3").innerHTML = '<font color='+color_d[3]+'>'+rnd_dmg_d[3]+'</font>';
	document.getElementById("rnd_dmg_d4").innerHTML = '<font color='+color_d[4]+'>'+rnd_dmg_d[4]+'</font>';
}
