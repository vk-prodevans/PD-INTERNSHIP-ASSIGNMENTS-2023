// document.addEventListener("DOMContentLoaded", function () {
   
//     const jsonFormat = document.getElementById("assignment");

   
//     const apiUrl = "http://worldtimeapi.org/api/timezone/Asia/Kolkata";

   
//     fetch(apiUrl)
//         .then((response) => {
          
//             return response.json();
//         })
//         .then((data) => {
           
//             const jsonString = JSON.stringify(data,null);
//             jsonFormat.textContent = jsonString;
//         })
//         .catch((error) => {
//             console.error("There was a problem fetching the data:", error);
//         });
// });
const url = 'https://api.spotify.com/v1/artists?ids=2CIMQHirSU0MQqyYHq0eOx,4YRxDV8wJFPHPTeXepOstw,0oOet2f43PA68X5RxKobEy,4zCH9qm4R2DADamUHMCa6O,7qjJw7ZM2ekDSahLXPjIlN,4PULA4EFzYTrxYvOVlwpiQ,5sSzCxHtgL82pYDvx2QyEU,5sSzCxHtgL82pYDvx2QyEU,5wJ1H6ud777odtZl5gG507';

const token = 'BQC4pNyNXqqi2Q0jLcz5Vq-fDqVYuKF2VViIdL4M-Gsnh023yxtF28GpTGAR_H3h90z22d8wvPX1hr1PmLkzBiS0JNTX2Sl61OOZK8sZAOTJuTfb8jlv1eSnFANwjlQaoY0IXA8ypbE5vDF3fd_iGNvZElnqrGLdpYh7C_B1kA8pzWe-3CDzYlAsgS2FSpRxMb45zgPJw1fziVfYy7bSVeDsYmIEVvlzkG6keD4zDgDdw5eHVE9aGKnLdy0eThlKsHMhLK1TRUSd4UMDWOfOxGvG';
const request = new Request(
    url,{
        headers:{
            'Authorization': `Bearer ${token}`
        },
    })


    async function getData() {
        try {
            const response = await fetch(request);
            const data = await response.json();
            console.log(data);
            
           
            const dataContainer = document.getElementById("assignment");

            data.artists.forEach(artist => {
                const artistname= document.createElement("h1");
                artistname.textContent = `Artist Name: ${artist.name} [Artist Genres:${artist.genres}]`;
                dataContainer.appendChild(artistname);
                
            });
            // data.artists.forEach(artist => {const artistgenres = document.createElement("h2");
            //     artistgenres.textContent = `Artist Genres:${artist.genres}`;
            //      dataContainer.appendChild(artistgenres)});


            
            
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }


getData()