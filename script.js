
const getSongs = () => {
    const input = document.getElementById("input").value;
    fetch(` https://api.lyrics.ovh/suggest/${input}`)
        .then(res => res.json())
        .then(data => displaySong(data.data))
        .catch(err => errMessage(err))
}
const errMessage = () => {
    document.getElementById("result").innerText = "";
    document.getElementById("error").innerText = "* input required .";
}
const displaySong = songs => {
    document.getElementById("error").innerText = "";
    const songContainer = document.getElementById("song-container");
    songContainer.innerHTML = '';
    // console.log(songs);
    if (songs.length === 0) {
        document.getElementById("result").innerText = `There are no result for : ${input}.`
    } else {
        songs.forEach(song => {
            document.getElementById("poster").innerHTML = "";
            document.getElementById("result").innerText = `Search result for '${input}' :`
            const div = document.createElement("div");
            div.className = "single-result row align-items-center my-3 p-3";
            div.innerHTML = `
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p>Album by <span class="author">${song.artist.name}</span></p>
                        <audio controls>
                            <source src="${song.preview}" type="audio/ogg">
                        </audio>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
                    </div>`
            songContainer.appendChild(div);
        });
    }

}

const getLyric = (artist, title) => {
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(res => res.json())
        .then(data => {
            const lyric = document.getElementById("lyrics");
            lyric.innerHTML = `
            <h2>Title : ${title}</h2>
            <h5>Artist : ${artist}</h5>
            <p>${data.lyrics}</p>
            <button onclick="goBack()" class="btn btn-success">go back</button>`
            document.getElementById("content-area").style.display = "none";
        })
}

// const getLyric = (artist, title) => {
//     fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
//         .then(res => res.json())
//         .then(data => displayLyrics(data))
// }
// const displayLyrics = (lyrics) => {
//     const lyric = document.getElementById("lyrics");
//     lyric.innerHTML = `
//     <h2>Title : ${title}</h>
//     <h5>Artist : ${artist}</h5>
//     <p>${lyrics}</p>
//     <button onclick="goBack()" class="btn btn-success">go back</button>`
//     document.getElementById("content-area").innerHTML = "";
// }

const goBack = () => {
    document.getElementById("lyrics").innerHTML = "";
    document.getElementById("content-area").style.display = "block";
}

const goHome = () => {
    document.getElementById("content-area").style.display = "block";
}