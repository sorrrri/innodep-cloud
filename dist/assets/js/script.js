"use strict";function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_unsupportedIterableToArray(arr)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(o,minLen){if(o){if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);return"Map"===(n="Object"===n&&o.constructor?o.constructor.name:n)||"Set"===n?Array.from(o):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(o,minLen):void 0}}function _iterableToArray(iter){if("undefined"!=typeof Symbol&&null!=iter[Symbol.iterator]||null!=iter["@@iterator"])return Array.from(iter)}function _arrayWithoutHoles(arr){if(Array.isArray(arr))return _arrayLikeToArray(arr)}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}document.addEventListener("DOMContentLoaded",function(){var vh=.01*window.innerHeight;document.documentElement.style.setProperty("--vh","".concat(vh,"px")),window.addEventListener("resize",function(){var vh=.01*window.innerHeight;document.documentElement.style.setProperty("--vh","".concat(vh,"px"))}),document.querySelectorAll(".main-menu").forEach(function(mainMenu){var subMenu=mainMenu.nextElementSibling;subMenu&&mainMenu.addEventListener("click",function(){mainMenu.classList.toggle("active"),subMenu.classList.toggle("active")})});var tabMenus,tabContents,activeSection,notice,downloads,errata,globalNavigationMenu=document.querySelector(".global-navigation-menu"),localNavigationMenu=document.querySelector(".local-navigation-menu"),toggleMenu=document.querySelector(".toggle-menu"),localToggleMenu=document.querySelector(".local-toggle-menu"),overlay=document.querySelector(".overlay");localToggleMenu&&localToggleMenu.addEventListener("click",function(e){e.stopPropagation(),localNavigationMenu.classList.add("active"),overlay.classList.add("active")}),toggleMenu.addEventListener("click",function(e){e.stopPropagation(),globalNavigationMenu.classList.add("active"),overlay.classList.add("active")}),overlay.addEventListener("click",function(){toggleMenu.classList.remove("active"),localToggleMenu.classList.remove("active"),globalNavigationMenu.classList.remove("active"),localNavigationMenu.classList.remove("active")}),document.querySelector(".main")&&(tabMenus=document.querySelectorAll(".tab-menu li"),btnNavigation=document.querySelector(".tab-menu button"),tabContents=document.querySelectorAll(".tab-content section"),activeSection=function(e){e.stopPropagation();var menuIndex=_toConsumableArray(tabMenus).indexOf(e.target);tabMenus.forEach(function(menu){_toConsumableArray(tabMenus).indexOf(menu)===menuIndex?menu.classList.add("active"):menu.classList.remove("active")}),tabContents.forEach(function(content){_toConsumableArray(tabContents).indexOf(content)===menuIndex?content.classList.add("active"):content.classList.remove("active")})},_toConsumableArray(tabMenus)[0].classList.add("active"),_toConsumableArray(tabContents)[0].classList.add("active"),tabMenus.forEach(function(menu){menu.addEventListener("click",activeSection)}),notice=document.querySelector(".notice"),downloads=document.querySelector(".downloads"),errata=document.querySelector(".errata"),btnNavigation.addEventListener("click",function(e){e.stopPropagation(),notice.classList.contains("active")?window.location="notice.html":downloads.classList.contains("active")?window.location="downloads.html":errata.classList.contains("active")&&(window.location="errata.html")}));document.querySelector(".admin");var fileInput=document.querySelector(".input-file"),btnNavigation=document.querySelector(".input-file-trigger"),the_return=document.querySelector(".file-return");function check(argument_0){var checked=!(0<arguments.length&&void 0!==argument_0)||argument_0;document.querySelectorAll('input[name="books"]').forEach(function(cb){cb.checked=checked})}function handleCheckAll(){check(),this.onclick=handleUncheckAll}function handleUncheckAll(){check(!1),this.onclick=handleCheckAll}fileInput&&(btnNavigation.addEventListener("keydown",function(event){13!=event.keyCode&&32!=event.keyCode||fileInput.focus()}),btnNavigation.addEventListener("click",function(event){return fileInput.focus(),!1}),fileInput.addEventListener("change",function(event){the_return.innerHTML=this.files[0].name}));var fileSelect,fileDrag,btnNavigation=document.querySelector("#checkAll");function fileDragHover(e){var fileDrag=document.getElementById("file-drag");e.stopPropagation(),e.preventDefault(),fileDrag.className="dragover"===e.type?"hover":"modal-body file-upload"}function fileSelectHandler(e){var files=e.target.files||e.dataTransfer.files;fileDragHover(e);for(var f,i=0;f=files[i];i++)!function(file){output("<strong>"+encodeURI(file.name)+"</strong>");var imageName=file.name;/\.(?=gif|jpg|png|jpeg)/gi.test(imageName)?(document.getElementById("start").classList.add("hidden"),document.getElementById("response").classList.remove("hidden"),document.getElementById("notimage").classList.add("hidden"),document.getElementById("file-image").classList.remove("hidden"),document.getElementById("file-image").src=URL.createObjectURL(file)):(document.getElementById("file-image").classList.add("hidden"),document.getElementById("notimage").classList.remove("hidden"),document.getElementById("start").classList.remove("hidden"),document.getElementById("response").classList.add("hidden"),document.getElementById("file-upload-form").reset())}(f),function(file){var xhr=new XMLHttpRequest,pBar=(document.getElementById("class-roster-file"),document.getElementById("file-progress"));xhr.upload&&(file.size<=1073741824?(pBar.style.display="inline",xhr.onreadystatechange=function(e){xhr.readyState},xhr.open("POST",document.getElementById("file-upload-form").action,!0),xhr.setRequestHeader("X-File-Name",file.name),xhr.setRequestHeader("X-File-Size",file.size),xhr.setRequestHeader("Content-Type","multipart/form-data"),xhr.send(file)):output("Please upload a smaller file (< 1024 MB)."))}(f)}function output(msg){document.getElementById("messages").innerHTML=msg}btnNavigation&&btnNavigation.addEventListener("click",handleCheckAll),document.querySelector("main.images")&&(window.File&&window.FileList&&window.FileReader?(fileSelect=document.getElementById("file-upload"),fileDrag=document.getElementById("file-drag"),document.getElementById("submit-button"),fileSelect.addEventListener("change",fileSelectHandler,!1),(new XMLHttpRequest).upload&&(fileDrag.addEventListener("dragover",fileDragHover,!1),fileDrag.addEventListener("dragleave",fileDragHover,!1),fileDrag.addEventListener("drop",fileSelectHandler,!1))):document.getElementById("file-drag").style.display="none");function hiddenOverlay(){overlay.classList.remove("active"),modals.forEach(function(modal){return modal.classList.remove("active")})}var modals=document.querySelectorAll(".modal"),btnNavigation=document.querySelectorAll(".close");overlay&&(overlay.addEventListener("click",hiddenOverlay),btnNavigation.forEach(function(close){close.addEventListener("click",hiddenOverlay)}));var btnNavigation=document.querySelector(".btn-navigation"),modalNavigation=document.querySelector(".modal-navigation");btnNavigation&&btnNavigation.addEventListener("click",function(){modalNavigation.classList.add("active"),overlay.classList.add("active")})});