
const clientId = '8907f6ec1e134604ac92cc1a0d3231a3';
const clientSecret = '7f250f8114aa4843a2e1c7f3599b137d';
let token;
let request;
let ids = [
  '4svvMm4TQnkphZJfhLCzzv',
  '2nWYQRy7Ikh7CyWnvZZouD',
  '4YRxDV8wJFPHPTeXepOstw',
  '0oOet2f43PA68X5RxKobEy',
  '4zCH9qm4R2DADamUHMCa6O',
  '7qjJw7ZM2ekDSahLXPjIlN',
  '4PULA4EFzYTrxYvOVlwpiQ',
  '5sSzCxHtgL82pYDvx2QyEU',
  '5sSzCxHtgL82pYDvx2QyEU',
  '5wJ1H6ud777odtZl5gG507'
];
let url = `https://api.spotify.com/v1/artists?ids=${ids.join(',')}`;
const getToken = async () => {
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
    console.log(token);
    urlAndRequest();
  } catch (error) {
    console.error("Error fetching token:", error);
  }
}
const urlAndRequest = () => {
  if (!token) {
    document.write("Token not available yet.");
    return;
  }
  request = new Request(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
  fetchData();
}
const fetchData = async () => {
  try {
    const response = await fetch(request);
    const data = await response.json();
    console.log(data);
    const dataContainer = document.getElementById("assignment");
    data.artists.forEach(artist => {
      if (artist.images.length > 0) {
        const artistDiv = document.createElement("div");
        artistDiv.classList.add("artist");
        const artistImage = document.createElement("img");
        artistImage.src = artist.images[2].url;
        artistImage.alt = artist.name;
        const artistname = document.createElement("h2");
        artistname.textContent = `Artist Name: ${artist.name}`;
        const artistgenres = document.createElement("p");
        artistgenres.textContent = `Artist Genres: ${artist.genres}`
        artistDiv.appendChild(artistImage);
        artistDiv.appendChild(artistname);
        artistDiv.appendChild(artistgenres);
        dataContainer.appendChild(artistDiv);
      }
    });
  } catch (error) {
    document.write("Error fetching data:", error);
  }
}
getToken();
