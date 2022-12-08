/*

Youtube Javascript file
Created By: Taylor Atkin
Date Created:12/6/22

 */


export function fetchSearch(str) {
  var myHeaders = new Headers();
  myHeaders.append("apikey", "vi7NLtylXPwNEX3lHEK6UtW67770jUAe");
  let dataGlobal;

  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  var fetchString = `https://api.apilayer.com/youtube/search?q=${str}`;

  const getData = async () => {
    const response = await fetch(fetchString, requestOptions);
    const data = await response.json();
    dataGlobal = data;
    return data;
  };

  (async () => {
    await getData();
    channelID(dataGlobal)
  })();
}


function channelID(dataGlobal) {
    var channelInfo = dataGlobal.contents[0]
    var channel = channelInfo.channel
    var channelID = channel.channelId
    channelDetails(channelID, dataGlobal)
}


export function channelDetails(channelID, search) {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "vi7NLtylXPwNEX3lHEK6UtW67770jUAe");
    let dataGlobal;
  
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };
  
    var fetchString = `https://api.apilayer.com/youtube/channel/details?id=${channelID}`;
  
    const getData = async () => {
      const response = await fetch(fetchString, requestOptions);
      const data = await response.json();
      dataGlobal = data;
      return data;
    };
  
    (async () => {
      await getData();
      assignVariables(dataGlobal, search)
    })();
  }



function assignVariables(dataGlobal, search) {
    var channelInfo = search.contents[0]
    var channel = channelInfo.channel
    var avatar = channel.avatar[0]

    var creator = channel.title
    var descriptionCreator = channel.descriptionSnippet
    var subs = dataGlobal.stats.subscribers
    var icon = avatar.url
    var vid1 = search.contents[1]
    var vid2 = search.contents[2]
    var vid3 = search.contents[3]

    var data = [creator, descriptionCreator, subs, icon, vid1, vid2, vid3]
    console.log(vid3)
    pushData(data)
}

export function pushData(data) {
    // assign variables
    var desc1 = data[4].video.title
    var desc2 = data[5].video.title
    var desc3 = data[6].video.title
    var vid1 = data[4].video.thumbnails[0].url
    var vid2 = data[5].video.thumbnails[0].url
    var vid3 = data[6].video.thumbnails[0].url
    console.log(data)

    // assign links to video and channel to variables
    var vidlink = "https://www.youtube.com/watch?v="
    var vid1ink1 = vidlink + data[4].video.videoId
    var vid1ink2 = vidlink + data[5].video.videoId
    var vid1ink3 = vidlink + data[6].video.videoId
    var channelId = data[4].video.author.canonicalBaseUrl
    var channelLink = `https://www.youtube.com/${channelId}`
    
    // push all images and text to page
    document.getElementById("logo").setAttribute("src", data[3])
    document.getElementById("rc1").setAttribute("src", vid1)
    document.getElementById("rc2").setAttribute("src", vid2)
    document.getElementById("rc3").setAttribute("src", vid3)
    document.getElementById("rctxt1").innerHTML = desc1
    document.getElementById("rctxt2").innerHTML = desc2
    document.getElementById("rctxt3").innerHTML = desc3
    document.getElementById("creator").innerHTML = data[0]
    document.getElementById("desc").innerHTML = data[1]
    document.getElementById("subs").innerHTML = data[2]

    // set all links to videos and channel
    document.getElementById("logoLink").setAttribute("href", channelLink)
    document.getElementById("rc1Link").setAttribute("href", vid1ink1)
    document.getElementById("rc2Link").setAttribute("href", vid1ink2)
    document.getElementById("rc3Link").setAttribute("href", vid1ink3)
    
}
















