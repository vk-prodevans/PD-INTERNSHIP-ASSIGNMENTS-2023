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
const url='https://api.spotify.com/v1/artists?ids=2CIMQHirSU0MQqyYHq0eOx%2C57dN52uHvrHOxijzpIgu3E%2C1vCWHaC5f2uS3yhpwWbIA6'
const token = 'BQDj6Y3Zuyb9D6uEXfbkKXMZBVsBNCh6azY7tXCZjumyXQ7PnkrG3aI9RO_jD3zUZrXl3kJ2lEWfYTqE7gCY44-pO598wRom5ZC9w8WM4v_UdVo5FIP3wkElUfHpNARo52MkzD4rTH2XSwWsL806NUJvlde00mClAU6B9C-EiXnQz0OD4f52ad1DOOEXiYAwcKNxTLx9g4VzA5976iw-BuNTPK3-MzMK3g9vwED9WOwFMmctJsrLJ3mku-ux4rDsPCeS9nivUHWrpgW2cggzZxBH';
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
                const artistlist= document.createElement("h1");
                artistlist.textContent = `Artist Name: ${artist.name}`;
                dataContainer.appendChild(artistlist);
            });

            
            dataContainer.appendChild(artistList);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }


getData()