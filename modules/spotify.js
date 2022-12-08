/*
Created by: Taylor Atkin
Module name: spotify.js
date created: 12/7/22
*/

export function fetchUser() {
  var profileName = document.getElementById("user").value;
  let dataGlobal;
  var myHeaders = new Headers();
  myHeaders.append("apikey", "vi7NLtylXPwNEX3lHEK6UtW67770jUAe");

  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  var fetchString = `https://api.apilayer.com/spotify/user_profile?id=${profileName}`;
  console.log(fetchString);
  const getData = async () => {
    const response = await fetch(fetchString, requestOptions);
    const data = await response.json();
    dataGlobal = data;
    return data;
  };

  (async () => {
    await getData();
    console.log(dataGlobal);
    seperateData(dataGlobal.public_playlists);
  })();
}

export function fetchPlaylists(playlist, urlBase) {
  var section = document.getElementById("playlists");
  let playlistName;
  console.log(playlist);
  var myHeaders = new Headers();
  myHeaders.append("apikey", "vi7NLtylXPwNEX3lHEK6UtW67770jUAe");

  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  var fetchString = `https://api.apilayer.com/spotify/playlist?id=${playlist}`;

  fetch(fetchString, requestOptions)
    .then((res) => res.json())
    .then((data) => {
      playlistName = data.name;
    })
    .then(() => {
      console.log(playlistName);
      section.innerHTML += `<input type="submit" id="${urlBase}" value="${playlistName}" class="plsBtn"></input>`;
    });
}

export function seperateData(data) {
  var section = (document.getElementById("playlists").innerHTML = "");
  var playlist_url = [];
  var urlBase;
  var playlist;
  var x;
  var playlistName;
  var seperate = [];
  var playlists = [data[0], data[1], data[2]];
  for (x in playlists) {
    playlist = playlists[x].uri + "";
    seperate = playlist.split(":");
    console.log(seperate);
    urlBase = seperate[1] + "/" + seperate[2];
    var playlistURI = seperate[2];
    playlist_url.push(urlBase);

    playlistName = fetchPlaylists(playlistURI, urlBase);
  }

  console.log(playlist_url);
  createEmbed(playlist_url);
}

export function createEmbed(option) {
  var section = document.getElementById("embed");
  var playlistSelected;
  var temp = option;
  var length = option.length;
  console.log(option);
  if (length == 3) {
    playlistSelected = option[0];
    console.log(playlistSelected);
    var embed = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/${playlistSelected}?utm_source=generator" width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
  } else {
    console.log(temp);
    var embed = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/${temp}?utm_source=generator" width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
  }
  console.log(temp);
  section.innerHTML = "";
  section.innerHTML += embed;
}
