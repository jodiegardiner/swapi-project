// custom js for swapi-project stream 1

// Search for People name using user input
$("#searchQuery").on('keyup', function(event) {

	event.preventDefault();

	$(".hidden").removeClass("hidden");

	var nameSearch = $("#searchQuery").val();
	var urlPeopleName = "https://swapi.co/api/people/?search=" + nameSearch;

	$.ajax({
		url: urlPeopleName,
		dataType: 'json',

	})

	.success(function( searchItem ) {
		var searchOutput = "";

		$.each(searchItem.results, function(i, sData){
			
		searchOutput += '<tr data-toggle="modal" data-target="#sw_modal" id="'+sData.url+'"><td>' + sData.name + '</td><td>' + sData.gender + '</td><td>' + sData.hair_color + '</td><td>' + sData.eye_color + '</td><td>' + sData.skin_color + '</td></tr>';
		})		


		$("#search-results").html( searchOutput );
	});
})

// Return specific person, format for modal
$("#search-results").on('click', "tr", function(event){

	// empty out old data on every fresh click
	$("#ship-list").html("");
	$("#veh-list").html("");

	var urlID = $(this).attr('id');

	$.ajax({
		url: urlID,
		dataType: 'json',

	})

	.success(function( personDetail ) {
		var personOutput = "";
		var genderIcon;
		var planetName = personDetail.homeworld;
		var starships = personDetail.starships;
		

		if (personDetail.gender == "male"){
			genderIcon="<i class='fa fa-mars fa-3x'></i>"
		}	else if (personDetail.gender == "female"){
			genderIcon="<i class='fa fa-venus fa-3x'></i>"
		}	else if (personDetail.gender =="n/a"){
			genderIcon="<i class='fa fa-ban fa-3x'></i>"
		}	else if (personDetail.gender =="hermaphrodite"){
			genderIcon="<i class='fa fa-mercury fa-3x'></i>"
		}	else {
			genderIcon=""			
		};
		

		$("#peopleModalLabel").html(personDetail.name);
		$("#peopleHeight").html(personDetail.height);
		$("#peopleWeight").html(personDetail.mass);
		$("#peopleHair").html(personDetail.hair_color);
		$("#peopleEyes").html(personDetail.eye_color).css("color", personDetail.eye_color);
		$("#genderIco").html("     "+genderIcon);


		$.ajax({
			url: planetName,
			dataType: 'json',
		})

		.success(function( homeWorld) {
			$("#peopleWorld").html(homeWorld.name)
		})

		
		var shipList='';

		$.each(personDetail.starships, function(i, shipData){
					
				
				$.ajax({
					url: shipData,
					dataType: 'json',
				})
				.success(function( shipName) {
					
					shipList+= shipName.name+' ';
					console.log(shipList);
					$("#ship-list").html(shipList);
					
					})
				

		})

		var vehList='';

		$.each(personDetail.vehicles, function(i, vehData){
					
				
				$.ajax({
					url: vehData,
					dataType: 'json',
				})
				.success(function( vehName) {
										
					vehList+= vehName.name+' ';
					console.log(vehList);
					$("#veh-list").html(vehList);
					
					})
				

		})
		


	});
})

