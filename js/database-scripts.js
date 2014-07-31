/**
 * Database Space
 *
*/
var db;

function indexedDBOk() {
    return "indexedDB" in window;
}

document.addEventListener("DOMContentLoaded", loadDatabaseObject(), false);

function loadDatabaseObject(){
    if (!indexedDBOk) {
        document.write("IndexedDB is not supported with this browser");
        return;
    }
    var openRequest = indexedDB.open("meme_data", 3);
    openRequest.onupgradeneeded = function (event) {
        var update = event.target.result;

        if (!update.objectStoreNames.contains("memes")) {
            var objStore = update.createObjectStore("memes", { keyPath: "key", autoIncrement: "true" });
            objStore.createIndex("url", "url", { unique: false });
        }
        if (!update.objectStoreNames.contains("users")) {
            var objStore = update.createObjectStore(CommentsWrapper.dbName, { keyPath: "id", autoIncrement: "true" });
        }
        if (!update.objectStoreNames.contains("comments")) {
            var objStore = update.createObjectStore(UserWrapper.dbName, { keyPath: "id", autoIncrement: "true" });
        }
    }

    openRequest.onsuccess = function (event) {
        db = event.target.result;
    }
}
/**
 *
*/
function addData(object, strDBLocat, strRWAccess) {
    var transaction = db.transaction([strDBLocat], strRWAccess);
    var objStore = transaction.objectStore(strDBLocat);
    var obj = objStore.add(object);
    return obj;
}

function getData(key, strDBLocat, strRWAccess) {
    var transaction = db.transaction([strDBLocat], strRWAccess);
    var objStore = transaction.objectStore(strDBLocat);
    return objStore.get(key);
};// end routine

function editData(key, strDBLocat) {
    var transaction = db.transaction([strDBLocat], "readwrite");
    var objStore = transaction.objectStore(strDBLocat);
};


/**
 * Object wrappers
 *
*/
var MemeHandler = {};
MemeHandler.dbName = "memes";
MemeHandler.MEME_IMG = "memeImg";
MemeHandler.MEME_TITLE = "memeTitle";
MemeHandler.img;
MemeHandler.onFileSelect = function (event) {
    var selectedFile = event.target.files[0];
    var fileReader = new FileReader();

    // automatically pull the image and put it in
    var tagIMG = document.getElementById("imgCheck");
    tagIMG.title = selectedFile.name;

    fileReader.onload = function (event) {
        tagIMG.src = event.target.result;
    }
    fileReader.readAsDataURL(selectedFile);
    MemeHandler.img = tagIMG;
};

MemeHandler.generate = function () {
    if (MemeHandler.img != null) {
        localStorage.setItem(MemeHandler.MEME_IMG, MemeHandler.img.src);
        localStorage.setItem(MemeHandler.MEME_TITLE, MemeHandler.img.title);
    }
    else {
        localStorage.setItem(MemeHandler.MEME_IMG, "");
        localStorage.setItem(MemeHandler.MEME_TITLE, "");
    }
};
MemeHandler.getImg = function () {
    return localStorage.getItem(MemeHandler.MEME_IMG);
};
MemeHandler.getTitle = function () {
    var result = localStorage.getItem(MemeHandler.MEME_TITLE);
    if (result == null) return "";
    else return result;
};
MemeHandler.destroy = function () {
    localStorage.removeItem(MemeHandler.MEME_IMG);
    localStorage.removeItem(MemeHandler.MEME_TITLE);
};
MemeHandler.makeMeme = function (url, title, hashes) {
    var Meme = {};
    Meme.url = url;
    Meme.title = title;
    Meme.hashs = hashes;
    Meme.created = new Date();
    Meme.likes = 0;
    Meme.dislikes = 0;

    return Meme;
};

var UserWrapper = {};
UserWrapper.dbName = "users";
UserWrapper.makeUser = function () {
    // define what goes in a user 
}

var CommentsWrapper = {};
CommentsWrapper.dbName = "comments";
CommentsWrapper.makeComment = function (key, user, comment) {
    var commentObject = {};
    commentObject.key = key;
    commentObject.user = user;
    commentObject.comment = comment;
    commentObject.created = new Date();
}