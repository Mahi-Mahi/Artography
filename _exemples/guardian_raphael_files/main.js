






var public_spreadsheet_url = 'https://docs.google.com/spreadsheet/pub?key=0Aq-FnOoJcl-ndDY1TlB2UUtjRVI1N0JLYWVxLWlITnc&output=html';

var parent_url;
var states = {'alabama': 'AL' , 'alaska': 'AK' , 'arizona': 'AZ' , 'arkansas': 'AR' , 'california': 'CA' , 'colorado': 'CO' , 'connecticut': 'CT' , 'delaware': 'DE' , 'florida': 'FL' , 'georgia': 'GA' , 'hawaii': 'HI' , 'idaho': 'ID' , 'illinois': 'IL' , 'indiana': 'ID' , 'iowa': 'IA' , 'kansas': 'KS' , 'kentucky': 'KY' , 'louisiana': 'LA' , 'maine': 'ME' , 'maryland': 'MD' , 'massachusetts': 'MA' , 'michigan': 'MI' , 'minnesota': 'MN' , 'mississippi': 'MS' , 'missouri': 'MO' , 'montana': 'MT' , 'nebraska': 'NE' , 'nevada': 'NV' , 'new hampshire': 'NH' , 'new jersey': 'NJ' , 'new mexico': 'NM' , 'new york': 'NY' , 'north carolina': 'NC' , 'north dakota': 'ND' , 'ohio': 'OH' , 'oklahoma': 'OK' , 'oregon': 'OR' , 'pennsylvania': 'PA' , 'rhode island': 'RI' , 'south carolina': 'SC' , 'south dakota': 'SD' , 'tennessee': 'TN' , 'texas': 'TX' , 'utah': 'UT' , 'vermont': 'VT' , 'virginia': 'VA' , 'washington': 'WA' , 'west virginia': 'WV' , 'wisconsin': 'WI' , 'wyoming': 'WY' };
var userLoc = null
var userDisplayState = null
var userFriendLoc = {}
var userFriendTotal = 0;
var userStateTotal = 0;
var loginType = ''
var linkedState = ''

//var layerOrder = ['marriage','union','dpartnership','adoptionlegal','employmentall','employmentstate','housing-orient','housing-orient-gender','crime-orient','crime-orient-gender']
var layerOrder = ['school', 'crime', 'housing', 'employment', 'adoption','hospital', 'marriage']
var marriageLayerOrder = ['dpartnership', 'union','marriage']
var adoptionLayerOrder = ['adoption-single', 'adoption-joint']
var employmentLayerOrder = ['workplace-sex','workplace-gender']
var housingLayerOrder = ['housing-sex','housing-gender']
var crimeLayerOrder = ['hate-sex','hate-gender']
var bullyingLayerOrder = ['school-bullying-sex','school-bullying-gender']
var hospitalLayerOrder = ['hospital-visit-designee', 'hospital-visit-relationship']

var stateData; //stores all state data loaded from spreadsheets
var seRegionData = [];
var neRegionData = [];
var mwRegionData = [];
var nwRegionData = [];
var swRegionData = [];

var charts = {}

var currentHover = null;



//sets
var overState = '';//state that is currently highlighted

var overviewChartData;
var marriageChartData = {};
var adoptionChartData = {};
var housingChartData = {};
var employmentChartData = {};
var crimeChartData = {};
var bullyingChartData = {};
var hospitalChartData = {};





var displayType = 'region';
var prevDisplayType = 'region';
var totalPop = 0;

var colorKey = {
	'ban': 'url(img/ban.gif)',
	'marriage': '#CB2F27',
	'marriage-ban': 'url(img/marriage-ban.gif)',
	'union':'#F9BAB8',
	'dpartnership':'#F9BAB8',
	'adoption-some': '#A1C9E4',
	'adoption-all': '#0061A6',
	'adoption-ban': 'url(img/adoption-ban.gif)',
	'workplace-sex':'#CFE8AE',
	'workplace-gender':'#87BB40',
	'housing-sex':'#F7B7D3',
	'housing-gender':'#CF128A',
	'hate-sex':'#D4BFDA',
	'hate-gender': '#833E98',
	'hospital-visit-relationship': '#F0BD56',
	'hospital-visit-designee': '#FFF1D2',
	'school-bullying-sex': '#D0E5F0',
	'school-bullying-gender': '#82C2EA'
}

var specificColorKey = {
	'ban': 'url(img/ban.gif)',
	'marriage': '#CB2F27',
	'marriage-ban': 'url(img/ban.gif)',
	'union':'#EA7B75',
	'dpartnership':'#FAC2BF',
	'adoption-single':'#A1C9E4',
	'adoption-joint':'#0061A6',
	'adoption-ban':'url(img/ban.gif)',

	'workplace-sex':'#D0E5AE',
	'workplace-gender':'#87BB40',

	'housing-sex':'#F7B7D3',
	'housing-gender':'#CF128A',
	
	'hate-sex':'#D4BFDA',
	'hate-gender':'#833E98',
	
	'hospital-visit-designee':'#FFF1D2',
	'hospital-visit-relationship':'#F0BD56',
	
	'school-bullying-sex':'#D0E5F0',
	'school-bullying-gender':'#82C2EA'


}


function loadData() {
	Tabletop.init( { key: public_spreadsheet_url, callback: processData, simpleSheet: true } )
}

function processData(data, tabletop) {	
	stateData = data;
	
	//calc pop total
	for( var s = 0; s < stateData.length; s++){
		totalPop += Number(stateData[s].totalpop)
		if(stateData[s].region == 'Southeast'){
			seRegionData.push(stateData[s])
		} else if(stateData[s].region == 'Northeast'){
			neRegionData.push(stateData[s])
		} else if(stateData[s].region == 'Midwest'){
			mwRegionData.push(stateData[s])
		} else if(stateData[s].region == 'Northwest'){
			nwRegionData.push(stateData[s])
		} else if(stateData[s].region == 'Southwest'){
			swRegionData.push(stateData[s])
		}
		
	}
	

	
	overviewChartData = drawCircleChart('rights-map', 700, 700, 700, 700,0,0,layerOrder, stateData, 'overview')
	if ( $.browser.msie ) {
		$('#margiage').html('<img src="img/marriage.png">')
		$('#adoption').html('<img src="img/adoption.png">')
		$('#employment').html('<img src="img/employment.png">')
		$('#housing').html('<img src="img/housing.png">')
		$('#crime').html('<img src="img/hate-crimes.png">')
		$('#hospital').html('<img src="img/visitation.png">')
		$('#bullying').html('<img src="img/bullying.png">')


	} else {
		marriageChartData['Southeast'] =  drawCircleChart('margiage',180, 940, 180, 180,0,-20,marriageLayerOrder, seRegionData, 'marriage')
		marriageChartData['Northeast'] =  drawCircleChart('margiage',180, 940, 180, 180,190,-20,marriageLayerOrder, neRegionData, 'marriage')
		marriageChartData['Midwest'] =  drawCircleChart('margiage',180, 940, 180, 180,380,-20,marriageLayerOrder, mwRegionData, 'marriage')
		marriageChartData['Northwest'] =  drawCircleChart('margiage',180, 940, 180, 180,570,-20,marriageLayerOrder, nwRegionData, 'marriage')
		marriageChartData['Southwest'] =  drawCircleChart('margiage',180, 940, 180, 180,760,-20,marriageLayerOrder, swRegionData, 'marriage')

		adoptionChartData['Southeast'] =  drawCircleChart('adoption',180, 940, 180, 180,0,-20,adoptionLayerOrder, seRegionData, 'adoption')
		adoptionChartData['Northeast'] =  drawCircleChart('adoption',180, 940, 180, 180,190,-20,adoptionLayerOrder, neRegionData, 'adoption')
		adoptionChartData['Midwest'] =  drawCircleChart('adoption',180, 940, 180, 180,380,-20,adoptionLayerOrder, mwRegionData, 'adoption')
		adoptionChartData['Northwest'] =  drawCircleChart('adoption',180, 940, 180, 180,570,-20,adoptionLayerOrder, nwRegionData, 'adoption')
		adoptionChartData['Southwest'] =  drawCircleChart('adoption',180, 940, 180, 180,760,-20,adoptionLayerOrder, swRegionData, 'adoption')

		employmentChartData['Southeast'] =  drawCircleChart('employment',180, 940, 180, 180,0,-20,employmentLayerOrder, seRegionData, 'employment')
		employmentChartData['Northeast'] =  drawCircleChart('employment',180, 940, 180, 180,190,-20,employmentLayerOrder, neRegionData, 'employment')
		employmentChartData['Midwest'] =  drawCircleChart('employment',180, 940, 180, 180,380,-20,employmentLayerOrder, mwRegionData, 'employment')
		employmentChartData['Northwest'] =  drawCircleChart('employment',180, 940, 180, 180,570,-20,employmentLayerOrder, nwRegionData, 'employment')
		employmentChartData['Southwest'] =  drawCircleChart('employment',180, 940, 180, 180,760,-20,employmentLayerOrder, swRegionData, 'employment')

		housingChartData['Southeast'] =  drawCircleChart('housing',180, 940, 180, 180,0,-20,housingLayerOrder, seRegionData, 'housing')
		housingChartData['Northeast'] =  drawCircleChart('housing',180, 940, 180, 180,190,-20,housingLayerOrder, neRegionData, 'housing')
		housingChartData['Midwest'] =  drawCircleChart('housing',180, 940, 180, 180,380,-20,housingLayerOrder, mwRegionData, 'housing')
		housingChartData['Northwest'] =  drawCircleChart('housing',180, 940, 180, 180,570,-20,housingLayerOrder, nwRegionData, 'housing')
		housingChartData['Southwest'] =  drawCircleChart('housing',180, 940, 180, 180,760,-20,housingLayerOrder, swRegionData, 'housing')


		crimeChartData['Southeast'] =  drawCircleChart('crime',180, 940, 180, 180,0,-20,crimeLayerOrder, seRegionData, 'crime')
		crimeChartData['Northeast'] =  drawCircleChart('crime',180, 940, 180, 180,190,-20,crimeLayerOrder, neRegionData, 'crime')
		crimeChartData['Midwest'] =  drawCircleChart('crime',180, 940, 180, 180,380,-20,crimeLayerOrder, mwRegionData, 'crime')
		crimeChartData['Northwest'] =  drawCircleChart('crime',180, 940, 180, 180,570,-20,crimeLayerOrder, nwRegionData, 'crime')
		crimeChartData['Southwest'] =  drawCircleChart('crime',180, 940, 180, 180,760,-20,crimeLayerOrder, swRegionData, 'crime')


		hospitalChartData['Southeast'] =  drawCircleChart('hospital',180, 940, 180, 180,0,-20,hospitalLayerOrder, seRegionData, 'hospital')
		hospitalChartData['Northeast'] =  drawCircleChart('hospital',180, 940, 180, 180,190,-20,hospitalLayerOrder, neRegionData, 'hospital')
		hospitalChartData['Midwest'] =  drawCircleChart('hospital',180, 940, 180, 180,380,-20,hospitalLayerOrder, mwRegionData, 'hospital')
		hospitalChartData['Northwest'] =  drawCircleChart('hospital',180, 940, 180, 180,570,-20,hospitalLayerOrder, nwRegionData, 'hospital')
		hospitalChartData['Southwest'] =  drawCircleChart('hospital',180, 940, 180, 180,760,-20,hospitalLayerOrder, swRegionData, 'hospital')


		bullyingChartData['Southeast'] =  drawCircleChart('bullying',180, 940, 180, 180,0,-20,bullyingLayerOrder, seRegionData, 'bullying')
		bullyingChartData['Northeast'] =  drawCircleChart('bullying',180, 940, 180, 180,190,-20,bullyingLayerOrder, neRegionData, 'bullying')
		bullyingChartData['Midwest'] =  drawCircleChart('bullying',180, 940, 180, 180,380,-20,bullyingLayerOrder, mwRegionData, 'bullying')
		bullyingChartData['Northwest'] =  drawCircleChart('bullying',180, 940, 180, 180,570,-20,bullyingLayerOrder, nwRegionData, 'bullying')
		bullyingChartData['Southwest'] =  drawCircleChart('bullying',180, 940, 180, 180,760,-20,bullyingLayerOrder, swRegionData, 'bullying')
	}


	$('#loader-text').css('display', 'none')
	
	$('#population').click(function(){toggleDisplay('population')})
	
	$('#regions').click(function(){toggleDisplay('regions')})
	
	$('#friends').click(function(){
		FB.getLoginStatus(function(response) {
			if (response.status == 'connected' && response.authResponse != null) {
				getFriendLocations('visualize');
			} else {
				loginToFacebook('visualize');
			}
		});
		
	});
	
	$('#whats-this').hover(
		function(e){
	
			//over
			$('#whats-this-box').css('display', 'inline')
			$('#whats-this-box').css('top', e.pageY - $('#whats-this-box').outerHeight() + 10 )
			$('#whats-this-box').css('left', $('#friends').offset().left + $('#friends').outerWidth() +   20)
		},
		function(){
			//out
			$('#whats-this-box').css('display', 'none')
		})
	
}



function toggleDisplay(value){

	if(displayType != value){
		prevDisplayType = displayType;
		displayType = value;
		$('#overviewPopup').css('display', 'none')	
		if(value == 'population'){
			$('#regions').removeClass('active')
			$('#population').addClass('active')
			$('#friends').removeClass('active')
		} else if(value == 'regions'){
			$('#regions').addClass('active')
			$('#population').removeClass('active')
			$('#friends').removeClass('active')
		} else if(value == 'friends'){
			$('#friends').addClass('active')
			$('#regions').removeClass('active')
			$('#population').removeClass('active')
		}
		
		resizeChart(700, 700,layerOrder,stateData, overviewChartData, 'overview');

	}	
	
}

function resizeChart(divW,divH,orderKey,dataTable,chartData,type){
	var fullRadius = divW/2 - 40
	var startRadius = divW/4 - 45;
	var radius = divW/4 - 40;
	var originX = divW/2 ;
	var originY = divH/2 ;
	var layerW = ((divW/4) )/orderKey.length;
	var a = 2*Math.PI/dataTable.length 
	
	if(type == 'overview'){
		
		for (var l= 0; l < orderKey.length; l++){
			var curRegionA = -Math.PI *.20;	
			var startA = 0;
			var endA = 0;
			for(var i = 0; i < dataTable.length; i++){
						
						if(displayType == 'population'){
							a = 2*Math.PI * (  dataTable[i].totalpop / totalPop);	
						} else if (displayType == 'friends'){
						
							if(userFriendLoc.hasOwnProperty(dataTable[i].state.toLowerCase())){
								
								//console.log(dataTable[i].state.toLowerCase(), userFriendLoc[dataTable[i].state.toLowerCase()] , userFriendTotal)

								if( userLoc.toLowerCase() == dataTable[i].state.toLowerCase()){
									a = 2*Math.PI * (  (Number(userFriendLoc[dataTable[i].state.toLowerCase()]) + 1) / userFriendTotal);
								} else {
									a = 2*Math.PI * (  userFriendLoc[dataTable[i].state.toLowerCase()] / userFriendTotal);
								}
								//a = 2*Math.PI * (  1 / userStateTotal);
							} else {
								a = 0;
							}
						}

						if(i > 0){
							startA = endA;
						}
							

						endA = startA + a;
						
					

						var blX = originX + Math.sin(endA) * radius ;
						var blY = originY + Math.cos(endA) * radius 
						var brX = originX + Math.sin(startA) * radius;
						var brY = originY + Math.cos(startA) * radius ;

						var tplX = originX + Math.sin(endA) * (radius + layerW);
						var tplY = originY + Math.cos(endA) * (radius + layerW);
						var tprX = originX + Math.sin(startA) * (radius + layerW);
						var tprY = originY + Math.cos(startA) * (radius + layerW);



						var strokeW = (fullRadius/ orderKey.length )/2 
						var startRadius = divW/4 - .5*strokeW - 40; 
						var strokeRadius = startRadius  +strokeW +  (strokeW +2)* l

						var direction = 0
						if(a >= Math.PI){
                              direction = 1
                         }


                         path = [        
                                 ["M", blX, blY], 
                                 ["A", radius, radius, direction,direction, 1, brX, brY],
                                 ["L", tprX, tprY],
                                 ["A", radius + layerW, radius + layerW, direction,direction, 0, tplX, tplY],
                                 ["L", blX, blY],
                                 ['z'] 
                         ];
					
						if (displayType != 'friends' && prevDisplayType != 'friends'){
							
							if ( $.browser.msie ) {
								chartData[i]['layersObj'][ orderKey[l] ].attr({'path': path, 'opacity': 1  });
							} else {
								chartData[i]['layersObj'][ orderKey[l] ].animate({'path': path, 'opacity': 1 }, 150, "easeIn");
							}
							
							
							
						
						} else {
							
							if(a == 0){
								chartData[i]['layersObj'][ orderKey[l] ].attr({'path': path, 'opacity': 1  });
								//chartData[i]['layersObj'][ orderKey[l] ].animate({'path': path, 'opacity': 0 }, 150, "easeIn");
							} else {
								chartData[i]['layersObj'][ orderKey[l] ].attr({'path': path, 'opacity': 1  });
								//chartData[i]['layersObj'][ orderKey[l] ].animate({'path': path, 'opacity': 1 }, 150, "easeIn");
							}
							
						}
						
											
						//resize the hit state
						if(l == 0){
							
							
							var hblX = originX + Math.sin(startA) * radius;
							var hblY = originY + Math.cos(startA) * radius;
							var hbrX = originX + Math.sin(endA) * radius;
							var hbrY = originY + Math.cos(endA) * radius;
							var htplX = originX + Math.sin(startA) * (fullRadius);
							var htplY = originY + Math.cos(startA) * (fullRadius);
							var htprX = originX + Math.sin(endA) * (fullRadius);
							var htprY = originY + Math.cos(endA) * (fullRadius);
							
							outline = [	
								["M", hblX, hblY], 
								["A", radius, radius, direction, direction, 0, hbrX, hbrY],
								["L", htprX, htprY],
								["A", radius + (layerW * orderKey.length) , radius + (layerW * orderKey.length) , direction, direction, 1, htplX, htplY],
								["L", hblX, hblY], 
								['z'] 
							];
						
							
							if(displayType == 'friends'){
								if(dataTable[i]['state'].toLowerCase() == userLoc.toLowerCase()){
									
									chartData[i]['hover'].attr({"path": outline, 'stroke-opacity': 1 })
									currentHover = chartData[i]['hover']
									populateHoverBox( 'friends', i )
								
								} else {
									chartData[i]['hover'].attr({"path": outline, 'stroke-opacity': 0 })
								}
								
							
							} else {
								if(dataTable[i]['state'].toLowerCase() == linkedState){
									
									chartData[i]['hover'].attr({"path": outline, 'stroke-opacity': 1 })
									currentHover = chartData[i]['hover']
									populateHoverBox( 'not-friends', i )
								
								} else {
									chartData[i]['hover'].attr({"path": outline, 'stroke-opacity': 0 })
								}
								
								
							}
							
							//move the state label
							var labelA = (startA + endA)/2;
							chartData[i]['label'].attr({ 'x' : originX + Math.sin(labelA) * (fullRadius + 10)  , 'y' : originY + Math.cos(labelA) * (fullRadius + 10) })
							
							if(displayType == 'friends'){
								chartData[i]['label'].attr({ 'fill' : '#000', 'font-weight': 'bold' })
							} else {
								chartData[i]['label'].attr({ 'fill' : '#ccc', 'font-weight': 'normal' })
							}
							
							
							if(endA - startA < .05){
								chartData[i]['label'].attr({ 'opacity' : 0 })
							} else {
								chartData[i]['label'].attr({ 'opacity' : 1 })
							}
							//move the divider
							if (chartData[i]['regionDivider'] != false){
								var startX = originX + Math.sin(startA ) * (startRadius + 10)
								var startY = originY + Math.cos(startA) * ( startRadius + 10)
								var endX = originX + Math.sin(startA) * (fullRadius + 30 );
								var endY = originY + Math.cos(startA) * (fullRadius + 30 );
								line = "M " 
								line+= String(startX) + " "  + String(startY) + " L "
								line+= String(endX) + " "  + String(endY) + " z"
							
								if(chartData[i].regionLabel != null){
									chartData[i].regionLabel.remove()
									chartData[i].regionLabel = null;
								}
								
								var regionLabelA = (curRegionA + startA)/2

								if (displayType != 'friends'){
									
									chartData[i].regionDivider.attr({ 'path': line, 'stroke-opacity': 1})
									chartData[i].regionLabel = 	charts[type].text(originX + Math.sin(regionLabelA) * (fullRadius + 30)  ,originY + Math.cos(regionLabelA) * (fullRadius + 30) ,chartData[i].region.toUpperCase() ).attr({'text-anchor': 'middle',"font-size": 10, fill:"#333", 'font-weight': 'bold',  "font-family": "Arial, Helvetica Neue, Helvetica, sans-serif","cursor":"default"})
									if(regionLabelA > Math.PI/2 && regionLabelA < 1.5*Math.PI){
										chartData[i].regionLabel.rotate(180 - regionLabelA*180/Math.PI )
										
									} else {

										chartData[i].regionLabel.rotate(360 - regionLabelA*180/Math.PI )
									}
								} else {
									chartData[i].regionDivider.attr({ 'path': line , 'stroke-opacity': 0})
								}
								
								
								
								
								
								
								
								
								curRegionA = startA;
							}
							
							
						}
						
						
						
						
						
						
			}
			radius += layerW;
		}
		
		
	}
	
	
	
	
}







function drawCircleChart(div,canvasH, canvasW, divW,divH,offsetX,offsetY,orderKey,dataTable,type){
	
	var chart;
	
	if(charts.hasOwnProperty(type)){
		chart = charts[type]
	} else {

		chart = Raphael(document.getElementById(div), canvasW, canvasH);
		charts[type] = chart;
	}
	
	var chartData = []
	
	var fullRadius = divW/2 - 40
	var startRadius = divW/4 - 45;
	var radius = divW/4 - 40;
	var originX = offsetX + divW/2 ;
	var originY = offsetY + divH/2 ;
	var layerW = ((divW/4) )/orderKey.length;
	var a = 2*Math.PI/dataTable.length 
	
	//DRAW THE CHART BACKGROUND / SHELL
	 chart.circle(originX, originY, radius - 5).attr({ 'stroke': '#333', 'stroke-width' : 1})
	 //chart.circle(originX, originY, fullRadius + 30).attr({ 'stroke': '#333', 'stroke-width' : 1})
	// if(divW == 700){
	// 	backgroundImg = chart.image('img/rights-key.gif', 250,250,190,130)
	// }
	
	
	//loop through each layer
	for (var l= 0; l < orderKey.length; l++){
		var curRegion = ''
		var curRegionA = 0;		
		var startA = 0;
		var endA = 0;

		for(var i = 0; i < dataTable.length; i++){

			//start and end points of the topic region
			if(i > 0){
				startA = endA;
			}
			endA = startA + a;

			var blX = originX + Math.sin(endA) * radius ;
			var blY = originY + Math.cos(endA) * radius 
			var brX = originX + Math.sin(startA) * radius;
			var brY = originY + Math.cos(startA) * radius ;
			var tplX = originX + Math.sin(endA) * (radius + layerW);
			var tplY = originY + Math.cos(endA) * (radius + layerW);
			var tprX = originX + Math.sin(startA) * (radius + layerW);
			var tprY = originY + Math.cos(startA) * (radius + layerW);

			var strokeW = (fullRadius/ orderKey.length )/2 
			var startRadius = divW/4 - .5*strokeW - 40; 
			var strokeRadius = startRadius  +strokeW +  (strokeW +2)* l
			
			path = [	
				["M", blX, blY], 
				["A", radius, radius, 0, 0, 1, brX, brY],
				["L", tprX, tprY],
				["A", radius + layerW, radius + layerW, 0, 0, 0, tplX, tplY],
				["L", blX, blY],
				['z'] 
			];
			

			
			if(l == 0){
													
							//init the chartobject
							chartData.push({
								'hover' : {},
								'layersSet' : chart.set(),
								'layersObj' : {},
								'state': dataTable[i]['stateabbreviation'],
								'label': {},
								'region': '',
								'regionLabel': {},
								'regionDivider': false,
								'statePos': i
							})
							
							var hblX = originX + Math.sin(startA) * radius;
							var hblY = originY + Math.cos(startA) * radius;
							var hbrX = originX + Math.sin(endA) * radius;
							var hbrY = originY + Math.cos(endA) * radius;
							var htplX = originX + Math.sin(startA) * (fullRadius);
							var htplY = originY + Math.cos(startA) * (fullRadius);
							var htprX = originX + Math.sin(endA) * (fullRadius);
							var htprY = originY + Math.cos(endA) * (fullRadius);
							
							outline = [	
								["M", hblX, hblY], 
								["A", radius, radius, 0, 0, 0, hbrX, hbrY],
								["L", htprX, htprY],
								["A", radius + (layerW * orderKey.length), radius + (layerW * orderKey.length), 0, 0, 1, htplX, htplY],
								["L", hblX, hblY], 
								['z'] 
							];
							
					
							if(displayType != 'friends'){
								if(dataTable[i]['state'].toLowerCase() == linkedState && type == 'overview'){
									
									chartData[i]['hover'] = chart.path( outline ).attr({"stroke-width": 2, "stroke": "#000000", 'stroke-opacity': 1, 'fill-opacity': 0, 'fill': '#000'}).data('chartType',type).data('statePos',i).data('region',dataTable[i]['region'])					
									chartData[i]['hover'].mouseover(highlightState)
							
										currentHover = chartData[i]['hover']
										populateHoverBox( 'friends', i )
								
								} else {
									chartData[i]['hover'] = chart.path( outline ).attr({"stroke-width": 2, "stroke": "#000000", 'stroke-opacity': 0, 'fill-opacity': 0, 'fill': '#000'}).data('chartType',type).data('statePos',i).data('region',dataTable[i]['region'])					
									chartData[i]['hover'].mouseover(highlightState)
								}
								
							
							}
							
							chartData[i]['hover'].mouseout(showAllStates)
							if(type != 'overview'){
								chartData[i]['hover'].mousemove(movePopup)
							}	
							
							//create the state label
							var labelA = (startA + endA)/2;
							
							chartData[i]['label'] = chart.text(originX + Math.sin(labelA) * (fullRadius + 10)  ,originY + Math.cos(labelA) * (fullRadius + 10) ,dataTable[i]['stateabbreviation'] ).attr({'text-anchor': 'middle',"font-size": 10, fill:"#ccc", "font-family": "Arial, Helvetica Neue, Helvetica, sans-serif","cursor":"default"})
							
							
							if(curRegion == ''){
								curRegion = dataTable[i]['region'];
								curRegionA = startA;
							} else if (curRegion != dataTable[i]['region']){
								var startX = originX + Math.sin(startA ) * (startRadius + 10)
								var startY = originY + Math.cos(startA) * ( startRadius + 10)
								var endX = originX + Math.sin(startA) * (fullRadius + 30 );
								var endY = originY + Math.cos(startA) * (fullRadius + 30 );
								line = "M " 
								line+= String(startX) + " "  + String(startY) + " L "
								line+= String(endX) + " "  + String(endY) + " z"
								
								
								chartData[i].regionDivider = chart.path(line).attr({"stroke-width": 4, "stroke": "#000"})
								chartData[i].region = curRegion
								
								var regionLabelA = (curRegionA + startA)/2
								
								var regionlabel = 	chart.text(originX + Math.sin(regionLabelA) * (fullRadius + 30)  ,originY + Math.cos(regionLabelA) * (fullRadius + 30) ,curRegion.toUpperCase() ).attr({'text-anchor': 'middle',"font-size": 10, fill:"#333", 'font-weight': 'bold',  "font-family": "Arial, Helvetica Neue, Helvetica, sans-serif","cursor":"default"})
								if(regionLabelA > Math.PI/2 && regionLabelA < 1.5*Math.PI){
									regionlabel.rotate(180 - regionLabelA*180/Math.PI )

								} else {
									regionlabel.rotate(360 - regionLabelA*180/Math.PI )
								}
								
								chartData[i].regionLabel = regionlabel
								curRegionA = startA;
								curRegion = dataTable[i]['region'];
								
								
								
								
							}
							
							
							
										
			}

			var blockColor;
			if(type == 'overview'){		
				blockColor = getColorOverview(l, i, dataTable);
			} else {
				blockColor = getColorRegional(orderKey[l], i, dataTable);
			}
			
			var block = chart.path(path).attr({fill: blockColor,"stroke-width": 1, "stroke": "#fff"}).toBack();			
			block.data('state',dataTable[i]['state'])
			block.data('chartType',type)
			block.data('region',dataTable[i]['region'])
			block.data('statePos',i)
			chartData[i]['layersObj'][orderKey[l]] = block
			
			
		}

		radius += layerW;
	}
	
	// for(var s= 0; s < chartData.length; s++){
	// 
	// 	chartData[s]['hover'].toFront();
	// 	chartData[s]['hover'].mouseover(highlightState)
	// 	chartData[s]['hover'].mouseout(showAllStates)
	// 	if(type != 'overview'){
	// 		chartData[s]['hover'].mousemove(movePopup)
	// 	}
	// 	
	// 	if(chartData[s]['regionDivider'] != false){
	// 		chartData[s]['regionDivider'].toFront()
	// 	}
	// 	
	// }

	// if(divW == 700){
	// 	backgroundImg.toBack();
	// 	
	// }


	return chartData;
	
}


function highlightState(e){
	
	if(overState != this.data('state')){
		overState = this.data('state')
		
		if(currentHover != null){

			currentHover.attr({'stroke-opacity': 0})
		}
		
		
		if(this.data('chartType')=='overview'){
			currentHover = overviewChartData[this.data('statePos')]['hover']
			currentState = overviewChartData[this.data('statePos')]['state']
			//backgroundImg.attr({'opacity': 0})
			
			populateHoverBox( this.data('chartType'), this.data('statePos') )
			$('#overviewPopup').css('display', 'inline')	
		} else { 
		
			if(this.data('chartType')=='marriage'){
				currentHover = marriageChartData[this.data('region')][this.data('statePos')]['hover']
			} else if(this.data('chartType')=='adoption'){
				currentHover = adoptionChartData[this.data('region')][this.data('statePos')]['hover']
			} else if(this.data('chartType')=='employment'){
				currentHover = employmentChartData[this.data('region')][this.data('statePos')]['hover']
			} else if(this.data('chartType')=='housing'){
				currentHover = housingChartData[this.data('region')][this.data('statePos')]['hover']
			} else if(this.data('chartType')=='bullying'){
				currentHover = bullyingChartData[this.data('region')][this.data('statePos')]['hover']
			} else if(this.data('chartType')=='crime'){
				currentHover = crimeChartData[this.data('region')][this.data('statePos')]['hover']
			} else if(this.data('chartType')=='hospital'){
				currentHover = hospitalChartData[this.data('region')][this.data('statePos')]['hover']
			}
			populateRegionalHoverBox( this.data('chartType'), this.data('region'), this.data('statePos') )
			
			
		}
		currentHover.attr({'stroke-opacity': 1})
		
		
	}
	
	
}


function movePopup(e){

	e = jQuery.event.fix(e);
	mouseX = e.pageX 
	mouseY = e.pageY
	
	$('#regionalPopup').css('display', 'inline')
	
	if(mouseY > 90){
		$('#regionalPopup').css('top', mouseY + 10 - $('#gay-rights-container').offset().top)
	} else {
		$('#regionalPopup').css('top', mouseY - 10 - $('#regionalPopup').outerHeight()- $('#gay-rights-container').offset().top)
	}
	
	var xVal = mouseX - $('#gay-rights-container').offset().left

	if(xVal < 180){
			$('#regionalPopup').css('left', xVal + 10)
		} else if(xVal >= 180 && xVal < 300){
			$('#regionalPopup').css('left', xVal - 10 - $('#regionalPopup').outerWidth())
		} else if(xVal >= 270 && xVal < 390){
			$('#regionalPopup').css('left', xVal + 10)
			
		} else if(xVal >= 360 && xVal < 480){
			$('#regionalPopup').css('left', xVal - 10 - $('#regionalPopup').outerWidth())
			
		} else if(xVal >= 450 && xVal < 570){
			$('#regionalPopup').css('left', xVal + 10)
		} else if(xVal >= 540 && xVal < 660){
			$('#regionalPopup').css('left', xVal - 10 - $('#regionalPopup').outerWidth())
		}  else if(xVal >= 630 && xVal < 750){
			$('#regionalPopup').css('left', xVal + 10)
		} else if(xVal >= 720 && xVal < 840){
			$('#regionalPopup').css('left', xVal - 10 - $('#regionalPopup').outerWidth())
		} else if(xVal >= 840 ){
			$('#regionalPopup').css('left', xVal - 10 - $('#regionalPopup').outerWidth())
		}


}

function populateRegionalHoverBox (type, region, position){
	var dataArray;
	if(region == 'Southeast'){
		dataArray = seRegionData;
	} else if(region == 'Northeast') {
		dataArray = neRegionData;	
	} else if(region == 'Midwest') {
		dataArray = mwRegionData;
	} else if(region == 'Northwest') {
		dataArray = nwRegionData;
	} else if(region == 'Southwest') {
		dataArray = swRegionData;
	}

	$( "#regionalPopupContent" ).empty();
	var obj = {};
	
	$('#regionalStateName').html( dataArray[position]['state'] )
	
	if(type == 'marriage'){
		
		
		if(dataArray[position]['marriage'] != ''){
			obj.text =  'Allows same-sex marriage.'
			obj.style = 'key-marriage'
			$( "#popupTemplate" ).tmpl( obj ).appendTo( "#regionalPopupContent" );
		} else if (dataArray[position]['marriage'] == '' && dataArray[position]['marriageban'] != '' ){
			obj.text =  'Same-sex marriage is illegal or banned.'
			obj.style = 'key-ban'
			$( "#popupTemplate" ).tmpl( obj ).appendTo( "#regionalPopupContent" );
		} // else {
		 // 			obj.text =  'No laws.'
		 // 			obj.style = 'key-none'
		 // 		}
		//$( "#popupTemplate" ).tmpl( obj ).appendTo( "#regionalPopupContent" );
		
		if(dataArray[position]['union'] != ''){
			obj.text =  'Allows civil unions.'
			obj.style = 'key-union'
			$( "#popupTemplate" ).tmpl( obj ).appendTo( "#regionalPopupContent" );
		} // else {
		// 			obj.text =  'No laws allowing unions.'
		// 			obj.style = 'key-none'
		// 		}
		
		
		if(dataArray[position]['dpartnership'] != ''){
			obj.text =  'Allows domestic partnerships.'
			obj.style = 'key-partnership'
			$( "#popupTemplate" ).tmpl( obj ).appendTo( "#regionalPopupContent" );
		} // else {
		// 			obj.text =  'No laws allowing domestic partnerships.'
		// 			obj.style = 'key-none'
		// 		}
	
		if(dataArray[position]['dpartnership'] == '' && dataArray[position]['union'] == '' && dataArray[position]['marriage'] == '' && dataArray[position]['marriageban'] == ''){
			obj.text =  'The law is unclear.'
			obj.style = 'key-none'
			$( "#popupTemplate" ).tmpl( obj ).appendTo( "#regionalPopupContent" );
		}
	
	

	} else if(type == 'adoption'){
		
		if(dataArray[position]['adoption-joint'] == '' && dataArray[position]['adoption-ban'] == ''){
			obj.text =  'No law or law unclear.'
			obj.style = 'key-none'
			
		} else if (dataArray[position]['adoption-ban'] != '' ){
			obj.text =  'Bans joint adoption by same-sex partners.'
			obj.style = 'key-ban'
			$( "#popupTemplate" ).tmpl( obj ).appendTo( "#regionalPopupContent" );
		} else if (dataArray[position]['adoption-joint'] != '' ){
			obj.text =  'Allows joint adoption by same-sex partners.'
			obj.style = 'key-adoption-joint'
		
		}
		
		
		
		// if (dataArray[position]['adoption-single'] == '' ){
		// 	obj.text =  'No law or law unclear'
		// 	obj.style = 'key-none'
		// } else 
		if (dataArray[position]['adoption-single'] != '' ){
			obj.text =  'Allows adoption a single individual.'
			obj.style = 'key-adoption-single'
			$( "#popupTemplate" ).tmpl( obj ).appendTo( "#regionalPopupContent" );
		}

	
	
	} else if(type == 'employment'){
		if(dataArray[position]['workplace-gender'] != ''){
			obj.text =  'Prohibits gender identity discrimination.'
			obj.style = 'key-workplace-gender'
			$( "#popupTemplate" ).tmpl( obj ).appendTo( "#regionalPopupContent" );
		} 
		// else {
		// 			obj.text =  'No law or law unclear on gender identity discrimination.'
		// 			obj.style = 'key-none'
		// 		}
		// 		$( "#popupTemplate" ).tmpl( obj ).appendTo( "#regionalPopupContent" );
		// 		
		if(dataArray[position]['workplace-sex'] != ''){
			obj.text =  'Prohibits sexual orientation discrimination.'
			obj.style = 'key-workplace-sex'
			$( "#popupTemplate" ).tmpl( obj ).appendTo( "#regionalPopupContent" );
		} 
		
		if(dataArray[position]['workplace-sex'] == '' && dataArray[position]['workplace-gender'] == ''){
			obj.text =  'No law or law unclear.'
			obj.style = 'key-none'
			$( "#popupTemplate" ).tmpl( obj ).appendTo( "#regionalPopupContent" );
		}
		// else {
		// 			obj.text =  'No law or law unclear on sexual orientation discrimination.'
		// 			obj.style = 'key-none'
		// 		}
		// 		$( "#popupTemplate" ).tmpl( obj ).appendTo( "#regionalPopupContent" );
	} else if(type == 'housing'){
		if(dataArray[position]['housing-gender'] != ''){
			obj.text =  'Prohibits gender identity discrimination.'
			obj.style = 'key-housing-gender'
			$( "#popupTemplate" ).tmpl( obj ).appendTo( "#regionalPopupContent" );
		}
		 // else {
		 // 			obj.text =  'No law or law unclear on gender identity discrimination.'
		 // 			obj.style = 'key-none'
		 // 		}
		
		
		if(dataArray[position]['housing-sex'] != ''){
			obj.text =  'Prohibits sexual orientation discrimination.'
			obj.style = 'key-housing-sex'
			$( "#popupTemplate" ).tmpl( obj ).appendTo( "#regionalPopupContent" );
		} 
		// else {
		// 			obj.text =  'No law or law unclear on sexual orientation discrimination.'
		// 			obj.style = 'key-none'
		// 		}
		// 		$( "#popupTemplate" ).tmpl( obj ).appendTo( "#regionalPopupContent" );
		
		
		if(dataArray[position]['housing-sex'] == '' && dataArray[position]['housing-gender'] == ''){
			obj.text =  'No law or law unclear.'
			obj.style = 'key-none'
			$( "#popupTemplate" ).tmpl( obj ).appendTo( "#regionalPopupContent" );
		}
		
		
	} else if(type == 'crime'){
		if(dataArray[position]['hate-gender'] != ''){
			obj.text =  'Law addresses hate crimes related to gender identity.'
			obj.style = 'key-hate-gender'
			$( "#popupTemplate" ).tmpl( obj ).appendTo( "#regionalPopupContent" );
		}
		 // else {
		 // 			obj.text =  'No law or law unclear on hate crimes based on gender identity.'
		 // 			obj.style = 'key-none'
		 // 		}
		
		
		if(dataArray[position]['hate-sex'] != ''){
			obj.text =  'Law addresses hate crimes related to sexual orientation.'
			obj.style = 'key-hate-sex'
			$( "#popupTemplate" ).tmpl( obj ).appendTo( "#regionalPopupContent" );
		} 
		// else {
		// 			obj.text =  'No law or law unclear on hate based on sexual orientation.'
		// 			obj.style = 'key-none'
		// 		}
		// 		$( "#popupTemplate" ).tmpl( obj ).appendTo( "#regionalPopupContent" );
		
		if(dataArray[position]['hate-gender'] == '' && dataArray[position]['hate-sex'] == ''){
			obj.text =  'No law or law unclear.'
			obj.style = 'key-none'
			$( "#popupTemplate" ).tmpl( obj ).appendTo( "#regionalPopupContent" );
		}
		
		
		
	} else if(type == 'bullying'){
		if(dataArray[position]['school-bullying-gender'] != ''){
			obj.text =  'Prohibits harassment based on gender identity.'
			obj.style = 'key-bullying-gender'
			$( "#popupTemplate" ).tmpl( obj ).appendTo( "#regionalPopupContent" );
		} 
		// else {
		// 			obj.text =  'No law or law unclear on hate based on gender.'
		// 			obj.style = 'key-none'
		// 		}
		
		
		if(dataArray[position]['school-bullying-sex'] != ''){
			obj.text =  'Prohibits harassment based on sexual orientation.'
			obj.style = 'key-bullying-sex'
			$( "#popupTemplate" ).tmpl( obj ).appendTo( "#regionalPopupContent" );
		} 
		
		if(dataArray[position]['school-bullying-sex'] == '' && dataArray[position]['school-bullying-gender'] == ''){
			obj.text =  'No law or law unclear.'
			obj.style = 'key-none'
			$( "#popupTemplate" ).tmpl( obj ).appendTo( "#regionalPopupContent" );
		}
		
		
		// else {
		// 			obj.text =  'No law or law unclear on hate based on sexual orientation.'
		// 			obj.style = 'key-none'
		// 		}
		// 		$( "#popupTemplate" ).tmpl( obj ).appendTo( "#regionalPopupContent" );
	} else if(type == 'hospital'){

		if(dataArray[position]['hospital-visit-relationship'] != ''){
			obj.text =  'Allows visitation by same-sex partners or spouses.'
			obj.style = 'key-hospital-visit-relationship'
		} else if(dataArray[position]['hospital-visit-designee'] != ''){
			obj.text =  'Recognizes designated visitors.'
			obj.style = 'key-hospital-visit-designee'
		} else {
			obj.text =  'No law or state law is unclear.'
			obj.style = 'key-none'
		}
		
		
		
		
		$( "#popupTemplate" ).tmpl( obj ).appendTo( "#regionalPopupContent" );
		

	}


	
	
	
	
	
	
}



function populateHoverBox (type, position){

		var overviewObj = {
			'state' : stateData[position].state
		}
		
		if(displayType == 'friends'){
			if(userLoc.toLowerCase() == stateData[position].state.toLowerCase() ){
				overviewObj.pop =  'You and ' + addCommas(userFriendLoc[stateData[position].state.toLowerCase()] - 1)
				if(userFriendLoc[stateData[position].state.toLowerCase()] - 1 != 1){
					overviewObj.pop = overviewObj.pop +  ' friends live here'
				} else {
					overviewObj.pop  = overviewObj.pop +  ' friend lives here'
				}
				
			} else {
				overviewObj.pop =  addCommas(userFriendLoc[stateData[position].state.toLowerCase()])
				if(userFriendLoc[stateData[position].state.toLowerCase()] != 1){
					overviewObj.pop  = overviewObj.pop + ' friends live here'
				} else {
					overviewObj.pop  = overviewObj.pop +  ' friend lives here'
				}
			}
			
		} else {
			overviewObj.pop = '2010 population: ' + addCommas(stateData[position].totalpop)
		}
		
		
		
		if(stateData[position]['marriage'] != ''){
			overviewObj.marriage = 'key-marriage'
			overviewObj.marriagetext = 'Allows same-sex marriage.'
		} else if(stateData[position]['union'] != '' && stateData[position]['marriageban'] != ''){
			overviewObj.marriage = 'key-marriage-ban'
			overviewObj.marriagetext = 'Allows civil unions; does not allow same-sex marriage.'
		} else if(stateData[position]['union'] != '' ){
			overviewObj.marriage = 'key-union'
			overviewObj.marriagetext = 'Allows civil unions.'
		} else if(stateData[position]['dpartnership'] != '' && stateData[position]['marriageban'] != ''){
			overviewObj.marriage = 'key-marriage-ban'
			overviewObj.marriagetext = 'Allows domestic partnerships;  does not allow same-sex marriage.'
		} else if(stateData[position]['dpartnership'] != ''){
			overviewObj.marriage = 'key-union'
			overviewObj.marriagetext = 'Allows domestic partnerships.'
		} else if (stateData[position]['marriageban'] != ''){
			overviewObj.marriage = 'key-ban'
			overviewObj.marriagetext = 'Same-sex marriage is illegal or banned.'
		} else {
			overviewObj.marriagetext = 'No action taken.'
			overviewObj.marriage = 'key-none'
		}
		
		if(stateData[position]['adoption-joint'] != ''){
			overviewObj.adoption = 'key-adoption-joint'
			overviewObj.adoptiontext = 'Allows adoption by a single person and joint adoption by same-sex couples.'
		} else if(stateData[position]['adoption-single'] != '' && stateData[position]['adoption-ban'] != ''){
			overviewObj.adoption = 'key-adoption-single-ban'
			overviewObj.adoptiontext = 'Allows adoption by a single person, but bans joint adoption by same-sex partners.'
		} else if(stateData[position]['adoption-single'] != '' ){
			overviewObj.adoption = 'key-adoption-single'
			overviewObj.adoptiontext = 'Allows adoption by a single person.'
		} else {
			overviewObj.adoption = 'key-none'
			overviewObj.adoptiontext = 'No rights or the law is unclear.'	
		}
		
		
		if(stateData[position]['workplace-gender'] != ''){
			overviewObj.employment = 'key-workplace-gender'
			overviewObj.employmenttext = 'Prohibits discrimination based on gender identity and sexual orientation.'
		} else if(stateData[position]['workplace-sex'] != ''){
			overviewObj.employment = 'key-workplace-sex'
			overviewObj.employmenttext = 'Prohibits discrimination based on sexual orientation.'
		} else {
			overviewObj.employmenttext = 'No protection against discrimination or the law is unclear.'
			overviewObj.employment = 'key-none'
		}

		if(stateData[position]['housing-gender'] != ''){
			overviewObj.housing = 'key-housing-gender'
			overviewObj.housingtext = 'Prohibits discrimination based on gender identity and sexual orientation.'
		} else if(stateData[position]['housing-sex'] != ''){
			overviewObj.housing = 'key-housing-sex'
			overviewObj.housingtext = 'Prohibits discrimination based on sexual orientation.'
		} else {
			overviewObj.housingtext = 'No protection against discrimination or the law is unclear.'
			overviewObj.housing = 'key-none'
		}

		if(stateData[position]['hate-gender'] != ''){
			overviewObj.crimes = 'key-hate-gender'
			overviewObj.crimestext = 'Law addresses hate crimes related to gender identity and sexual orientation.'
		} else if(stateData[position]['hate-sex'] != ''){
			overviewObj.crimes = 'key-hate-sex'
			overviewObj.crimestext = 'Law addresses hate crimes related to sexual orientation.'
		} else {
			overviewObj.crimestext = 'No explicit inclusion or the law is unclear.'
			overviewObj.crimes = 'key-none'
		}
		
		if(stateData[position]['hospital-visit-relationship'] != ''){
			overviewObj.hospital = 'key-hospital-visit-relationship'
			overviewObj.hospitaltext = 'Allows visitation by same-sex partners or spouses.'
		} else if(stateData[position]['hospital-visit-designee'] != ''){
			overviewObj.hospital = 'key-hospital-visit-designee'
			overviewObj.hospitaltext = 'Allows designated visitors.'
		} else {
			overviewObj.hospitaltext = 'No extended rights or law is unclear.'
			overviewObj.hospital = 'key-none'
		}
		
		if(stateData[position]['school-bullying-gender'] != ''){
			overviewObj.bullying = 'key-bullying-gender'
			overviewObj.bullyingtext = 'Prohibits harassment based on gender identity and sexual orientation.'
		} else if(stateData[position]['school-bullying-sex'] != ''){
			overviewObj.bullying = 'key-bullying-sex'
			overviewObj.bullyingtext = 'Prohibits harassment based on sexual orientation.'
		} else {
			overviewObj.bullyingtext = 'No protection or the law is unclear.'
			overviewObj.bullying = 'key-none'
		}
		
		
		
		//$('#overview-state-name').text(stateData[position].state)
		//marriage

		$( "#overviewPopup" ).empty();
		$( "#overviewTemplate" ).tmpl( overviewObj ).appendTo( "#overviewPopup" );
		$( "#overviewPopup" ).css('display', 'inline')
}




function showAllStates(e){
	overState = '';
	//overviewChartData[this.data('statePos')]['hover']


	currentHover.attr({'stroke-opacity': 0})

	
	
	$('#regionalPopup').css('display', 'none')
	$('#overviewPopup').css('display', 'none')
	
	
	
}















function getColorOverview(orderPos, tablePos, dataTable) {
	
	var color = '#eeeeee'
	if(orderPos == 6){
		if(dataTable[tablePos]['marriage'] != ''){
			color = colorKey['marriage'];
		} else if(dataTable[tablePos]['union'] != '' && dataTable[tablePos]['marriageban'] != ''){
			color = colorKey['marriage-ban'];
		} else if(dataTable[tablePos]['union'] != '' ){
			color = colorKey['union'];
		} else if(dataTable[tablePos]['dpartnership'] != '' && dataTable[tablePos]['marriageban'] != ''){
			color = colorKey['marriage-ban'];
		} else if(dataTable[tablePos]['dpartnership'] != ''){
			color = colorKey['dpartnership'];
		} else if (dataTable[tablePos]['marriageban'] != ''){
			color = colorKey['ban'];
		}
	} else if(orderPos == 4){
		if(dataTable[tablePos]['adoption-joint'] != '' && dataTable[tablePos]['adoption-single'] != ''){
			color = colorKey['adoption-all'];
		} else if( dataTable[tablePos]['adoption-ban'] != '' && dataTable[tablePos]['adoption-single'] != ''){
				color = colorKey['adoption-ban'];
		} else if( dataTable[tablePos]['adoption-single'] != ''){
				color = colorKey['adoption-some'];
		} else if(dataTable[tablePos]['adoption-ban'] != ''){
			color = colorKey['ban'];
		}
		
		
	} else if(orderPos == 3){
		if(dataTable[tablePos]['workplace-gender'] != ''){
			color = colorKey['workplace-gender'];
		} else if(dataTable[tablePos]['workplace-sex'] != ''){
			color = colorKey['workplace-sex'];
		}
	} else if(orderPos == 2){
		if(dataTable[tablePos]['housing-gender'] != ''){
			color = colorKey['housing-gender'];
		} else if(dataTable[tablePos]['housing-sex'] != ''){
			color = colorKey['housing-sex'];
		}
	} else if(orderPos == 1){
		if(dataTable[tablePos]['hate-gender'] != ''){
			color = colorKey['hate-gender'];
		} else if(dataTable[tablePos]['hate-sex'] != ''){
			color = colorKey['hate-sex'];
		}
	} else if(orderPos == 5){
		if(dataTable[tablePos]['hospital-visit-relationship'] != ''){
			color = colorKey['hospital-visit-relationship'];
		} else if(dataTable[tablePos]['hospital-visit-designee'] != ''){
			color = colorKey['hospital-visit-designee'];
		}
	} else if(orderPos == 0){
		if(dataTable[tablePos]['school-bullying-gender'] != ''){
			color = colorKey['school-bullying-gender'];
		} else if(dataTable[tablePos]['school-bullying-sex'] != ''){
			color = colorKey['school-bullying-sex'];
		}
	}
	return color;
}


function getColorRegional(type, tablePos, dataTable) {
	var color = '#eeeeee'
	
	if(dataTable[tablePos]['marriage'] != '' && type == 'marriage'){
		color = specificColorKey['marriage'];
	} 
	
	if(dataTable[tablePos]['union'] != '' && type == 'union'){
		color = specificColorKey['union'];
	}
	if(dataTable[tablePos]['marriageban'] != '' && type == 'marriage'){
		color = specificColorKey['marriage-ban'];
	}
	if(dataTable[tablePos]['marriageban'] != '' && type == 'marriage'){
		color = specificColorKey['marriage-ban'];
	}
	
	
	if(dataTable[tablePos]['dpartnership'] != '' && type == 'dpartnership'){
		color = specificColorKey['dpartnership'];
	}
	
	
	if(dataTable[tablePos]['adoption-joint'] != '' && type == 'adoption-joint'){
		color = specificColorKey['adoption-joint'];
	}
	if(dataTable[tablePos]['adoption-ban'] != '' && type == 'adoption-joint'){
		color = specificColorKey['adoption-ban'];
	}
	
	if(dataTable[tablePos]['adoption-single'] != '' && type == 'adoption-single'){
		color = specificColorKey['adoption-single'];
	}



	if(dataTable[tablePos]['housing-sex'] != '' && type == 'housing-sex'){
		color = specificColorKey['housing-sex'];
	}
	if(dataTable[tablePos]['housing-gender'] != '' && type == 'housing-gender'){
		color = specificColorKey['housing-gender'];
	}
	
	
	if(dataTable[tablePos]['workplace-sex'] != '' && type == 'workplace-sex'){
		color = specificColorKey['workplace-sex'];
	}
	if(dataTable[tablePos]['workplace-gender'] != '' && type == 'workplace-gender'){
		color = specificColorKey['workplace-gender'];
	}
	
	
	if(dataTable[tablePos]['hate-sex'] != '' && type == 'hate-sex'){
		color = specificColorKey['hate-sex'];
	}
	if(dataTable[tablePos]['hate-gender'] != '' && type == 'hate-gender'){
		color = specificColorKey['hate-gender'];
	}
	
	if(dataTable[tablePos]['hospital-visit-relationship'] != '' && type == 'hospital-visit-relationship'){
		color = specificColorKey['hospital-visit-relationship'];
	}
	if(dataTable[tablePos]['hospital-visit-designee'] != '' && type == 'hospital-visit-designee'){
		color = specificColorKey['hospital-visit-designee'];
	}
	
	
	if(dataTable[tablePos]['school-bullying-sex'] != '' && type == 'school-bullying-sex'){
		color = specificColorKey['school-bullying-sex'];
	}
	if(dataTable[tablePos]['school-bullying-gender'] != '' && type == 'school-bullying-gender'){
		color = specificColorKey['school-bullying-gender'];
	}	
	
	return color;
}


function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}



$(document).ready(function(){
	if($.browser.msie){
		$('#browser-notice').css('display', 'inline')
	}
	
	
	
	parent_url = decodeURIComponent( document.location.hash.replace( /^#/, '' ) );
	getParams()
	loadData();
	initFacebook();



	
	
});

function initFacebook(){
	$('#share-facebook').click(function(){
		FB.getLoginStatus(function(response) {
			if (response.status == 'connected' && response.authResponse != null) {
				getFriendLocations('share');
			} else {
				loginToFacebook('share');
			}
		});
	})
	
	$('#fbk-logout').live('click',function(){
		FB.logout();
	})
	
	
	FB.init({
	  appId: '349871508408083',
	  status: true, // check login status
	  cookie: true, // enable cookies
	  xfbml: true, // parse XFBML
	  oauth: true
	});

	FB.Event.subscribe('auth.authResponseChange', toggleResponse);

	FB.getLoginStatus(toggleResponse);

}

function toggleResponse(response){

	if (response.status == 'connected' && response.authResponse != null) {
		$('#facebook-status').html('You are connected to Facebook. <a id="fbk-logout">Logout.</a>')
		
	} else {
	
	    $('#facebook-status').html('You are not connected to Facebook.')
		if(displayType == 'friends'){
			toggleDisplay('regions')
		}
		clearLoadedData();
	}
}

function loginToFacebook(type){
	FB.login(
		function(response) {
			if (response.authResponse) {
					getFriendLocations(type);
			   } else {
					$('#facebook-status').html('There was an error connecting to Facebook.')
			   }
		}, 
		{scope: 'user_location, friends_location, publish_stream'}
	);
}


function getFriendLocations(type) {
  FB.api('/', 'POST', {
    batch: [
      {
        'method': 'GET',
        'relative_url': 'me'
      }, {
        'method': 'GET',
        'name': 'get-friends',
        'relative_url': 'me/friends'
      }, {
        'method': 'GET',
        'relative_url':
        '?ids={result=get-friends:$.data.*.id}&fields=location'
      }
    ]
  }, function(response) {
    if (!response || response.error) {
		$('#facebook-status').html('There was an error connecting to Facebook.')
    } else {
		clearLoadedData();
		var r1 = eval('(' + response[0].body + ')'); 
		var r2 = eval('(' + response[2].body + ')');
		
		myLocation(r1);
		countByState(r2);
    	if(type == 'share'){
			shareUserState()
		} else {
			toggleDisplay('friends')
		}
		
	}
  });
}

function shareUserState(){

	var linkUrl = 'http://www.guardian.co.uk/world/us/interactive/2012/05/gay-rights/america.html'

	if(states.hasOwnProperty(userLoc.toLowerCase())){
		linkUrl = 'http://www.guardian.co.uk/world/us/interactive/2012/05/gay-rights/'+ userLoc.replace(/ /g, '-').toLowerCase() +'.html'
	
	}
	
	var obj = {
			method: 'feed',
			link: linkUrl
	 };
	
	 function callback(response) {
			if(response != null){
				$('#share-status').html("A link to this project was posted to your Facebook feed.")
				$('share-button').css('display', 'none')
			}
     }
	
	if(userLoc != null){
	



        FB.ui(obj, callback);
	} else {
		FB.ui(obj, callback);
		//$('#share-status').html("Unable to detect your state from your Facebook profile.")
	}
}



function clearLoadedData(){
	userLoc = null
	userFriendLoc = {}
	userFriendTotal = 0;
	userStateTotal = 0;
}


function myLocation(me) {
	userDisplayState = locationToState(me.location)
	if(userLoc){
		userLoc = locationToState(me.location).toLowerCase()
	} else {
		userLoc = locationToState(me.location)
	}
	

	userFriendLoc[userLoc] = 1
	userStateTotal ++;
	userFriendTotal ++;
	
}


function countByState(friends) {

	
	for(var friend in friends){

		state = locationToState(friends[friend].location);
		
		if(state && userFriendLoc.hasOwnProperty(state.toLowerCase())){
			userFriendLoc[state.toLowerCase()] ++	
			userFriendTotal ++;		
		} else if(state) {
			userFriendLoc[state.toLowerCase()] = 1
			userStateTotal ++;
			userFriendTotal ++;
		}
		
	}

}


function locationToState(location) {
	
	if (location && location.name) {
		var stateArray = location.name.split(',')
	    var state = $.trim(stateArray[stateArray.length-1])
	    if ( states.hasOwnProperty(state.toLowerCase()) ) {
			return state
	    } else {
			return null
	    } 

	}
}


function getParams(){
	$.postMessage({ get_params: true }, parent_url, parent );
}

$.receiveMessage(function(e){
		
		var param = e.data.split('=');
		
		//changing the url to set the state
		if(param[0] == 'state'){
			
			linkedState = param[1].replace(/-/g, ' ').toLowerCase();
	
		} else if (param[0] == 'section'){
		
			$.postMessage({ section_link: $('#' + param[1].toLowerCase() + '-section').offset().top }, parent_url, parent );
			
		}

  } );


// function testUpload() {
// 
// 	var imgURL="http://static.guim.co.uk/sys-images/guardian/Pix/pictures/2012/4/19/1334832891288/Therese-D-Moonrise-Kingdo-008.jpg";//change with your external photo url
// 	var body = 'Test uploading an image';
// 	FB.api('me/photos', 'post', 
// 		{ 
// 			message: body,
// 			url: imgURL
// 		}, function(response) {
// 	  if (!response || response.error) {
// 	    alert('Error occured');
// 	  } else {
// 	    alert('Post ID: ' + response.id);
// 	  }
// 	});
// 	return 'done'
// }



