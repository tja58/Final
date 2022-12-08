/*

Main Javascript file
Created By: Taylor Atkin
Date Created:12/6/22

 */

/* Imports */
import {
  fetchUser,
  fetchPlaylists,
  seperateData,
  createEmbed,
} from "./modules/spotify.js";

import {
  showNotes,
  showMenu,
  deleteNote,
  updateNote,
  addnote,
  updateMenu,
} from "./modules/notes.js"

import {
  fetchSearch,
} from "./modules/youtube.js"

/*
-------------------------------- 
Spotify section JS 
*/
const btn = document.getElementById("submit");
const test = document.getElementById("test");
btn.addEventListener("click", fetchUser);

var btns = document.getElementById("playlists");

btns.addEventListener("click", (event) => {
  const isButton = event.target.nodeName === "INPUT";
  if (!isButton) {
    return;
  }
  createEmbed(event.target.id);
});

/* 
--------------------------------
Notes section JS 
*/
const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
popupTitle = popupBox.querySelector("header p"),
closeIcon = popupBox.querySelector("header i"),
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector("textarea"),
addBtn = popupBox.querySelector("button");
const notes = JSON.parse(localStorage.getItem("notes") || "[]");


addBox.addEventListener("click", () => {
    popupTitle.innerText = "Add a new Note";
    addBtn.innerText = "Add Note";
    popupBox.classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
    if(window.innerWidth > 660) titleTag.focus();
});

closeIcon.addEventListener("click", () => {
    titleTag.value = descTag.value = "";
    popupBox.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";
});

addBtn.addEventListener("click", e => {
  addnote(e) 
  }
);

updateMenu()

/*
--------------------------------
Youtube JS
*/
var ytBtn = document.getElementById("sbmBtn")
var searchBar = document.getElementById("searchBar")

ytBtn.addEventListener("click", search)

function search() {
  var searchStr = searchBar.value
  fetchSearch(searchStr)
}