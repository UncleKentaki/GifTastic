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
       	   			console.log(results);
       	  	 		
       	  	 		//loop through results
        	  		for (var i = 0; i < results.length; i++) {
	
        	    		var gifDiv = $("<div>");

        	    		gifDiv.addClass('gifDiv col-md-5')

        	    		var rating = results[i].rating;

        	   			var p = $("<p>").text("Rating: " + rating);

        	    		var personImage = $("<img>");
        	    		personImage.attr("src", results[i].images.fixed_height.url);
        	    		personImage.attr({
        	    			"data-still": results[i].images.fixed_height_still.url,
        	    			"data-animate": results[i].images.fixed_height.url,
        	    			"data-state": 'animate',
        	    			"class": 'gif'
        	    		});

         	   			gifDiv.prepend(p);
        	    		gifDiv.prepend(personImage);

        	    		$("#gifSpot").prepend(gifDiv);
        	  		};
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

			
		});

			$(document).on("click", ".gif", function() {
			
					var state = $(this).attr('data-state');

			console.log(state);
				if (state === "still") {
					console.log('test');
           			 $(this).attr('src', $(this).data('animate'));
           			 $(this).attr('data-state', 'animate');
      			} else {
             		$(this).attr('src', $(this).data('still'));
             		$(this).attr('data-state', 'still');
      			}
			});
			
		


});