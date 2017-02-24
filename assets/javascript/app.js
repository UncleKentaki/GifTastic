$(document).ready(function() {
	
	//create array of topics
	var topics = ["Rick and Morty", "Eric Andre", "Superjail", "Off The Air", "Tim and Eric"];

	//loop through array of topics
	//initial buttons
	function generateButtons() {

		for (var i = 0; i < topics.length; i++) {
		//create new button
		var gifButton = $("<button>");
		//set button html to topic 
		gifButton.html(topics[i])
		.addClass('btn btn-default gifButton');
		//append newDiv to buttonDiv 
		$("#buttonDiv").append(gifButton);
		};

			$(".gifButton").on("click", function() {

			$("#gifSpot").empty();

			var person = $(this).text();
      		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        	person + "&api_key=dc6zaTOxFJmzC&limit=10";

			$.ajax({
        	 url: queryURL,
        	  method: "GET"
       	 	})
       	 	.done(function(response) {
       	 		//store results
       	   		var results = response.data;
       	  	 	//loop through results
        	  	for (var i = 0; i < results.length; i++) {
	
        	    var gifDiv = $("<div>");
        	    gifDiv.addClass('gifDiv col-md-5')
        	    var rating = results[i].rating;

        	   	var p = $("<p>").text("Rating: " + rating);

        	    var personImage = $("<img>");
        	    personImage.attr("src", results[i].images.fixed_height.url);

         	   gifDiv.prepend(p);
        	    gifDiv.prepend(personImage);

        	    $("#gifSpot").prepend(gifDiv);
        	  }
        	});


	});
	};

	

	

	

	generateButtons();


		//add buttons
		$("#addButton").on("click", function() {

			topics.push($("#addTopicField").val());

			$("#addTopicField").val('');

			$("#buttonDiv").empty();

			generateButtons();
			//var gifButton = $("<button>");

			//gifButton.html($("#addTopicField").val())
			//.addClass('btn btn-default gifButton');

			//$("#addTopicField").val('');

			//$("#buttonDiv").append(gifButton);
		});

	


});