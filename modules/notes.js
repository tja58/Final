/*

Notes Javascript file
Created By: Taylor Atkin
Date Created:12/6/22

 */

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
popupTitle = popupBox.querySelector("header p"),
closeIcon = popupBox.querySelector("header i"),
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector("textarea"),
addBtn = popupBox.querySelector("button");
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

var isUpdate = false, updateId;

export function showNotes() {
    if(!notes) return;
    document.querySelectorAll(".note").forEach(li => li.remove());
    notes.forEach((note, id) => {
        let filterDesc = note.description.replaceAll("\n", '<br/>');
        let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${filterDesc}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i id="I" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li id="${id}/${note.title}/${filterDesc}" class="update")><i class="uil uil-pen"></i>Edit</li>
                                    <li id="${id}" class="delete"><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    });
    updateMenu()
}
showNotes();

export function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}

export function deleteNote(noteId) {
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if(!confirmDel) return;
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

export function updateNote(noteId, title, filterDesc) {
    let description = filterDesc.replaceAll('<br/>', '\r\n');
    updateId = noteId;
    isUpdate = true;
    addBox.click();
    titleTag.value = title;
    descTag.value = description;
    popupTitle.innerText = "Update a Note";
    addBtn.innerText = "Update Note";
}

export function addnote(e) {
    e.preventDefault();
  let title = titleTag.value.trim(),
  description = descTag.value.trim();

  if(title || description) {
      let currentDate = new Date(),
      month = months[currentDate.getMonth()],
      day = currentDate.getDate(),
      year = currentDate.getFullYear();

      let noteInfo = {title, description, date: `${month} ${day}, ${year}`}
      if(!isUpdate) {
          notes.push(noteInfo);
      } else {
          isUpdate = false;
          notes[updateId] = noteInfo;
      }
      localStorage.setItem("notes", JSON.stringify(notes));
      showNotes();
      close();
    }
}

export function close() {
    isUpdate = false;
    titleTag.value = descTag.value = "";
    popupBox.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";
}

export function updateMenu() {
    document.querySelectorAll("#I").forEach(item => {
        item.addEventListener('click', event => {
          showMenu(item)
        })
      }); 

      document.querySelectorAll(".update").forEach(item => {
        item.addEventListener('click', event => {
          var str = item.id + ""
          var split = str.split("/")
          updateNote(split[0], split[1], split[2])
        })
      });

      document.querySelectorAll(".delete").forEach(item => {
        item.addEventListener('click', event => {
          deleteNote(item.id)
        })
      });
}