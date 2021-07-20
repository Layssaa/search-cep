$("#search-icon").click(() => {

    // ---------------------------------------- função que exibe os valores no html ---------------------------------------- //
        function showSearhResult(_result) {
        $("input").css({ "opacity": "0.5", "top": "50px" })
        $("#search-icon").css({ "opacity": "0.5", "top": "50px" })
        $("#cep-number").css("left", "20px")
        $("#search-icon").css("left", "700px")

        $("#feedback-search").html(`
       <div id="result-search">
       <p> Resultados para o CEP ${_result.cep} </p>
            <p>${_result.address}, ${_result.district}.</p>
            <p>${_result.city}, ${_result.state}.</p>
       </div>
       <iframe src="http://maps.google.com/maps?q=${(_result.lat).replace(",","%2C")},${(_result.lng).replace(",","%2C")}&z=15&output=embed" sandbox="allow-scripts" width="491" height="459"></iframe>
        `
        )
        console.log()
    }

    // ---------------------------------------- valor do CEP inserido ---------------------------------------- //
    let cepSearch = $('#cep-number').val();

    // ---------------------------------------- verificações do CEP ---------------------------------------- //
    if (cepSearch.length < 8 || cepSearch.length > 9 || cepSearch == "") {
        $("#feedback-search").html(`
    <p id="info-cep"> Insira um CEP válido.</p>
    `);
    } else {
        cepSearch = cepSearch.replace(/-/g, "")
        cepSearch = cepSearch.replace(/ /g, "")

        // ---------------------------------------- requisição ---------------------------------------- //
        $.ajax(`https://cep.awesomeapi.com.br/json/${cepSearch}`)
            .done(function (result) {
                showSearhResult(result)
            })
            .fail(function () {
                $("#feedback-search").html()

                $("#feedback-search").html(`
                        <p id="info-cep"> Não foi possível encontrar esse CEP no nosso banco de dados.</p>
                        `);
            })
    }

    // ---------------------------------------- mudança de CSS nos inputs ---------------------------------------- //
    $("input").mouseenter(() => {
        $("input").css("opacity", "1")
        $("#search-icon").css("opacity", "1")

    })

})

