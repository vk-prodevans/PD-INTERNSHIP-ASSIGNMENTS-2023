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
 const token = 'BQCUVidgQ756zMyPwpvmr3xFgH1zFVWxoL2aPcePJOpHw6E3-mjdsheg_xLN8U0jctVb60o7f0YQwGjwd6b1uWOnPdwa8OQ-j39TdCRwjlATjf8NvRZu59tHwcBDAC5CGa6xN66YejMASEpeUrx2V1gPGiMy1CVJ9XfS9MlJAj6dNC0Jj9ctbpoFi83wB3tVE4usDGwZXD2i1aqgcOZKLcMmeSWthF-WnwFbf1LumBHni6f4-iE0hnYnNdav6GUQKF0sLa41wYGYpShCmZhH7MrN';
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
                artistname.textContent = `Artist Name: ${artist.name} [Artist Genres:${artist.genres}] `;
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



// -------------------------------------------------------------                                --------------
const clientId = "3e1ca73bffd14498a16504e5e7874023"; // Replace with your client ID
const params = new URLSearchParams(window.location.search);

const code = params.get("code");

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    const accessToken = await getAccessToken(clientId, code);
    const profile = await fetchProfile(accessToken);
    populateUI(profile);
}

async function redirectToAuthCodeFlow(clientId) {
    // TODO: Redirect to Spotify authorization page
}

async function getAccessToken(clientId, code) {
  // TODO: Get access token for code
}

async function fetchProfile(token) {
    // TODO: Call Web API
}

function populateUI(profile) {
    // TODO: Update UI with profile data
}
export async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}
if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    const accessToken = await getAccessToken(clientId, code);
    const profile = await fetchProfile(accessToken);
    populateUI(profile);
}
export async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}
async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}

function populateUI(profile) {
    document.getElementById("displayName").innerText = profile.display_name;
    if (profile.images[0]) {
        const profileImage = new Image(200, 200);
        profileImage.src = profile.images[0].url;
        document.getElementById("avatar").appendChild(profileImage);
        document.getElementById("imgUrl").innerText = profile.images[0].url;
    }
    document.getElementById("id").innerText = profile.id;
    document.getElementById("email").innerText = profile.email;
    document.getElementById("uri").innerText = profile.uri;
    document.getElementById("uri").setAttribute("href", profile.external_urls.spotify);
    document.getElementById("url").innerText = profile.href;
    document.getElementById("url").setAttribute("href", profile.href);
}