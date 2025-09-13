var cryptos = []

//get all characters
function getAllCryptos() {
            $.ajax({
                type: "GET",
                dataType: "json",
                url: "https://api.coincap.io/v3/assets?apiKey=0e16795f7b0afdbfc57fb812ca66b34de8d32d98f8adaccce2cf26d1e9fa3c0b",
                success: function(data) {
					cryptos = data.data;
                    console.log(cryptos); 
                    var template = $("#js-crypto-template").html();
                    var rendered = Mustache.render(template, { data: cryptos });
                    $("#crypto-table tbody").html(rendered);
                },
                error: function(err) {
                    console.error("API error:", err);
                }
            });
        }



function getCharacter(selectedButton) {
    // Step 1: Get the selected id (use closest() and find())
    var cryptoId = $(selectedButton).data("id"); // id van aangeklikte crypto

// Step 2: Create an AJAX-call with the selected character id. (see the above function for an example of an AJAX call)
	// 		Example AJAX-call: "https://api.pokemontcg.io/v2/cards/dp6-90 is just an example
	// 		More info: https://docs.pokemontcg.io/api-reference/cards/get-card
	// 		the "dp6-90" is an example because in our case it should be dynamic based on the clicked button
    var crypto = cryptos.find(c => c.id === cryptoId);

    if (crypto) {
	// Step 3: in the success: append the data (name and image) in the modal
        $("#cryptoModalLabel").text(crypto.name + " (" + crypto.symbol + ")");
        $("#modal-marketcap").text(parseFloat(crypto.marketCapUsd).toLocaleString("en-US", {style:"currency", currency:"USD"}));
        $("#modal-change").text(parseFloat(crypto.changePercent24Hr).toFixed(2) + "%");

        // Bootstrap modal tonen
        var modalEl = document.getElementById('cryptoModal');
        var modal = new bootstrap.Modal(modalEl);
        modal.show();
    }
}


$(document).ready(function () {

	//load all characters @ loading
	getAllCryptos();

	//On click to get a character
 $("#crypto-table").on("click", ".crypto-info-btn", function() {
        getCharacter(this);

	});


});


