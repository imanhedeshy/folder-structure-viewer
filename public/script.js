window.addEventListener('DOMContentLoaded', (event) => {
  const browseButton = document.querySelector('.file-structure-viewer__button');
  const fileTableBody = document.querySelector('.file-structure-viewer__tbody');
  const folderPathInput = document.querySelector('.file-structure-viewer__input');
  const collapseButton = document.querySelector('.collapse-button');

  browseButton.addEventListener('click', () => {
    const path = folderPathInput.value;
    fetch(`/files?dir=${encodeURIComponent(path)}`)
      .then(response => response.json())
      .then(files => {
        fileTableBody.innerHTML = '';
        files.forEach(file => {
          const tr = document.createElement('tr');
          const tdIndex = document.createElement('td');
          tdIndex.textContent = file.index;
          const tdType = document.createElement('td');
          tdType.textContent = file.isDirectory ? 'Directory' : 'File';
          const tdName = document.createElement('td');
          tdName.textContent = file.name;
          tr.appendChild(tdIndex);
          tr.appendChild(tdType);
          tr.appendChild(tdName);
          fileTableBody.appendChild(tr);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });

  collapseButton.addEventListener('click', () => {
    if(collapseButton.textContent === 'Collapse') {
      Array.from(fileTableBody.children).forEach(row => {
        row.style.display = 'none';
      });
      collapseButton.textContent = 'Expand';
    } else {
      Array.from(fileTableBody.children).forEach(row => {
        row.style.display = '';
      });
      collapseButton.textContent = 'Collapse';
    }
  });

  // New code
  const fileInput = document.getElementById("myFile");
  fileInput.addEventListener('change', () => {
    var txt = "";
    if ('files' in fileInput) {
      if (fileInput.files.length == 0) {
        txt = "Select one or more files.";
      } else {
        for (var i = 0; i < fileInput.files.length; i++) {
          txt += "<br><strong>" + (i+1) + ". file</strong><br>";
          var file = fileInput.files[i];
          if ('name' in file) {
            txt += "name: " + file.name + "<br>";
          }
          if ('size' in file) {
            txt += "size: " + file.size + " bytes <br>";
          }
        }
      }
    } 
    else {
      if (fileInput.value == "") {
        txt += "Select one or more files.";
      } else {
        txt += "The files property is not supported by your browser!";
        txt  += "<br>The path of the selected file: " + fileInput.value;
      }
    }
    document.getElementById("demo").innerHTML = txt;
  });
});
