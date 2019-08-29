
window.requestFileSystem = window.requestFileSystem ||
    window.webkitRequestFileSystem;



var filesystem = null;


var form = document.getElementById('file-form');
var filenameInput = document.getElementById('filename');
var contentTextArea = document.getElementById('content');

var fileList = document.getElementById('file-list');

var messageBox = document.getElementById('messages');



function errorHandler(error) {
    var message = '';

    switch (error.code) {
        case FileError.SECURITY_ERR:
            message = 'Security Error';
            break;
        case FileError.NOT_FOUND_ERR:
            message = 'Not Found Error';
            break;
        case FileError.QUOTA_EXCEEDED_ERR:
            message = 'Quota Exceeded Error';
            break;
        case FileError.INVALID_MODIFICATION_ERR:
            message = 'Invalid Modification Error';
            break;
        case FileError.INVALID_STATE_ERR:
            message = 'Invalid State Error';
            break;
        default:
            message = 'Unknown Error';
            break;
    }

    console.log(message);
}



function initFileSystem() {
    navigator.webkitPersistentStorage.requestQuota(1024 * 1024 * 5,
        function(grantedSize) {


            window.requestFileSystem(window.PERSISTENT, grantedSize, function(fs) {


                filesystem = fs;


                setupFormEventListener();


                listFiles();

            }, errorHandler);

        }, errorHandler);
}


function loadFile(filename) {
    filesystem.root.getFile(filename, {}, function(fileEntry) {

        fileEntry.file(function(file) {
            var reader = new FileReader();

            reader.onload = function(e) {

                filenameInput.value = filename;
                contentTextArea.value = this.result;
            };

            reader.readAsText(file);
        }, errorHandler);

    }, errorHandler);
}


function displayEntries(entries) {

    fileList.innerHTML = '';

    entries.forEach(function(entry, i) {
        var li = document.createElement('li');

        var link = document.createElement('a');
        link.innerHTML = entry.name;
        link.className = 'edit-file';
        li.appendChild(link);

        var delLink = document.createElement('a');
        delLink.innerHTML = '[x]';
        delLink.className = 'delete-file';
        li.appendChild(delLink);

        fileList.appendChild(li);


        link.addEventListener('click', function(e) {
            e.preventDefault();
            loadFile(entry.name);
        });


        delLink.addEventListener('click', function(e) {
            e.preventDefault();
            deleteFile(entry.name);
        });
    });
}


function listFiles() {
    var dirReader = filesystem.root.createReader();
    var entries = [];

    var fetchEntries = function() {
        dirReader.readEntries(function(results) {
            if (!results.length) {
                displayEntries(entries.sort().reverse());
            } else {
                entries = entries.concat(results);
                fetchEntries();
            }
        }, errorHandler);
    };

    fetchEntries();
}



function saveFile(filename, content) {
    filesystem.root.getFile(filename, {create: true}, function(fileEntry) {

        fileEntry.createWriter(function(fileWriter) {

            fileWriter.onwriteend = function(e) {

                listFiles();


                filenameInput.value = '';
                contentTextArea.value = '';


                messageBox.innerHTML = 'Arquivo salvo!';
            };

            fileWriter.onerror = function(e) {
                console.log('Write error: ' + e.toString());
                alert('Algum problema ocorreu e não foi salvo!');
            };

            var contentBlob = new Blob([content], {type: 'text/plain'});

            fileWriter.write(contentBlob);

        }, errorHandler);

    }, errorHandler);
}


function deleteFile(filename) {
    filesystem.root.getFile(filename, {create: false}, function(fileEntry) {

        fileEntry.remove(function(e) {

            listFiles();


            messageBox.innerHTML = 'Arquivo excluido!';
        }, errorHandler);

    }, errorHandler);
}



function setupFormEventListener() {

    form.addEventListener('submit', function(e) {
        e.preventDefault();


        var filename = filenameInput.value;
        var content = contentTextArea.value;


        saveFile(filename, content);
    });

}


if (window.requestFileSystem) {
    initFileSystem();
} else {
    alert('Sem suporte');
}