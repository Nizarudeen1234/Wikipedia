document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const searchResults = document.getElementById("searchResults");

    searchButton.addEventListener("click", function () {
        const searchTerm = searchInput.value;
        if (searchTerm.trim() !== "") {
            searchWikipedia(searchTerm);
        }
    });

    function searchWikipedia(term) {
        
        const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=${term}`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayResults(data.query.search);
            })
            .catch(error => {
                console.error("An error occurred: " + error);
            });
    }

    function displayResults(results) {
        searchResults.innerHTML = ""; 

        results.forEach(result => {
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            link.href = `https://en.wikipedia.org/wiki/${result.title}`;
            link.target = "_blank"; 
            link.textContent = result.title;
            listItem.appendChild(link);
            searchResults.appendChild(listItem);
        });
    }
});