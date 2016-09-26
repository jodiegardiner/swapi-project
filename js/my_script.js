// custom js for swapi-project stream 1

// Search for People
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
		console.log(sData);	
		searchOutput += '<tr><td>' + sData.name + '</td><td>' + sData.gender + '</td><td>' + sData.hair_color + '</td><td>' + sData.eye_color + '</td><td>' + searchItem.results[0].skin_color + '</td></tr>';
		})		

		console.log(searchItem);

		$("#search-results").html( searchOutput );
	});
})
