const APIController = (function () {
  const clientId = '8907f6ec1e134604ac92cc1a0d3231a3';
  const clientSecret = '7f250f8114aa4843a2e1c7f3599b137d';

  let token; // Declare a variable to store the access token

  // Private method to get the access token
  const _getToken = async () => {
    try {
      const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
      });

      const data = await result.json();
      token = data.access_token;
      console.log(token)
      // Store the access token
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  }

  // Public method to fetch data from Spotify API
  // Public method to fetch data from Spotify API
const fetchData = async () => {
  if (!token) {
    await _getToken();
  }

  const url = 'https://api.spotify.com/v1/artists?ids=4svvMm4TQnkphZJfhLCzzv,2nWYQRy7Ikh7CyWnvZZouD,4YRxDV8wJFPHPTeXepOstw,0oOet2f43PA68X5RxKobEy,4zCH9qm4R2DADamUHMCa6O,7qjJw7ZM2ekDSahLXPjIlN,4PULA4EFzYTrxYvOVlwpiQ,5sSzCxHtgL82pYDvx2QyEU,5sSzCxHtgL82pYDvx2QyEU,5wJ1H6ud777odtZl5gG507';
  const request = new Request(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });

  try {
    const response = await fetch(request);
    const data = await response.json();
    console.log(data);

    const tableContainer = document.getElementById("assignment");

    // Create a table element
    const table = document.createElement("table");
    table.border = "1";

    // Create table header
    const headerRow = document.createElement("tr");
    const imageHeader = document.createElement("th");
    imageHeader.textContent = "Image";
    const genreHeader = document.createElement("th");
    genreHeader.textContent = "Genres";
    const nameHeader = document.createElement("th");
    nameHeader.textContent = "Name";
    headerRow.appendChild(imageHeader);
    headerRow.appendChild(genreHeader);
    headerRow.appendChild(nameHeader);
    table.appendChild(headerRow);

    // Create table rows with data
    data.artists.forEach(artist => {
      const row = document.createElement("tr");

      // Image cell
      const imageCell = document.createElement("td");
      if (artist.images.length > 0) {
        const artistImage = document.createElement("img");
        artistImage.src = artist.images[2].url; // Use the first image URL
        artistImage.alt = artist.name; // Set alt text for accessibility
        imageCell.appendChild(artistImage);
      }
      row.appendChild(imageCell);

      // Genres cell
      const genreCell = document.createElement("td");
      genreCell.textContent = artist.genres.join(', ');
      row.appendChild(genreCell);

      // Name cell
      const nameCell = document.createElement("td");
      nameCell.textContent = artist.name;
      row.appendChild(nameCell);

      table.appendChild(row);
    });

    // Append the table to the container
    tableContainer.appendChild(table);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}


  return {
    fetchData: fetchData
  };
})();

APIController.fetchData(); // Call the fetchData method to initiate the data retrieval
