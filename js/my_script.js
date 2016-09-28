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
		$("#peopleYear").html(personDetail.birth_year);


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
					
					shipList+= "<li class='list-group-item'>"+shipName.name+"</li>";
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
										
					vehList+= "<li class='list-group-item'>"+vehName.name+"</li>";
					$("#veh-list").html(vehList);
					
					})
				

		})



		var appearsIn="";
		for (var i=0; i<personDetail.films.length; i++) {
			
			
			if (personDetail.films[i] == "http://swapi.co/api/films/1/") {
				appearsIn=appearsIn+'<img title="A New Hope" class="img-responsive img-rounded" src="img/ep4.jpg">';
			}
			else if (personDetail.films[i] == "http://swapi.co/api/films/2/") {
				appearsIn=appearsIn+'<img title="Empire Strikes Back" class="img-responsive img-rounded" src="img/ep5.jpg">';
			}
			else if (personDetail.films[i] == "http://swapi.co/api/films/3/") {
				appearsIn=appearsIn+'<img title="Return of the Jedi" class="img-responsive img-rounded" src="img/ep6.jpg">';
			}
			else if (personDetail.films[i] == "http://swapi.co/api/films/4/") {
				appearsIn=appearsIn+'<img title="The Phantom Menace" class="img-responsive img-rounded" src="img/ep1.jpg">';
			}
			else if (personDetail.films[i] == "http://swapi.co/api/films/5/") {
				appearsIn=appearsIn+'<img title="Attack of the Clones" class="img-responsive img-rounded" src="img/ep2.jpg">';
			}
			else if (personDetail.films[i] == "http://swapi.co/api/films/6/") {
				appearsIn=appearsIn+'<img title="Revenge of the Sith" class="img-responsive img-rounded" src="img/ep3.jpg">';
			}
			else if (personDetail.films[i] == "http://swapi.co/api/films/7/") {
				appearsIn=appearsIn+'<img title="The Force Awakens" class="img-responsive img-rounded" src="img/ep7.jpg">';
			}
			else  {
				console.log("shouldn't see me");
			}
			console.log(appearsIn);
		};

		$("#film-list").html(appearsIn);

		// var filmList='';

		// $.each(personDetail.films, function(i, filmData){
					
		// 		console.log(personDetail.films)
		// 		$.ajax({
		// 			url: filmData,
		// 			dataType: 'json',
		// 		})
		// 		.success(function( filmName) {
										
		// 			filmList+= filmName.title+' ';
		// 			console.log(filmList);
		// 			$("#film-list").html(filmList);
					
		// 			})
				

		// })
		

	});
})



// Search for Vehicle name using user input

$("#search-vehicle").on('keyup', function(event) {

	event.preventDefault();

	$(".hidden").removeClass("hidden");

	var nameSearch = $("#search-vehicle").val();
	var urlVehName = "https://swapi.co/api/vehicles/?search=" + nameSearch;

	$.ajax({
		url: urlVehName,
		dataType: 'json',

	})

	.success(function( searchItem ) {
		var searchOutput = "";

		$.each(searchItem.results, function(i, sData){
			
		searchOutput += '<tr data-toggle="modal" data-target="#veh_modal" id="'+sData.url+'"><td>' + sData.name + '</td><td>' + sData.manufacturer + '</td><td>' + sData.crew + '</td><td>' + sData.passengers + '</td></tr>';
		})		


		$("#vehicle-results").html( searchOutput );
	});
})

