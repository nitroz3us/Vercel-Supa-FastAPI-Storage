document.addEventListener("DOMContentLoaded", (event) => {
    document
      .getElementById("myForm")
      .addEventListener("submit", function (e) {
        e.preventDefault(); // Cancel the default action
        submitForm();
      });
  });


function dataFileDnD() {
    return  {
        files: [],
        fileDragging: null,
        fileDropping: null,
        humanFileSize(size) {
            const i = Math.floor(Math.log(size) / Math.log(1024));
            return (
                (size / Math.pow(1024, i)).toFixed(2) * 1 +
                " " +
                ["B", "kB", "MB", "GB", "TB"][i]
            );
        },
        remove(index) {
            let files = [...this.files];
            files.splice(index, 1);

            this.files = createFileList(files);
        },
        drop(e) {
            let removed, add;
            let files = [...this.files];

            removed = files.splice(this.fileDragging, 1);
            files.splice(this.fileDropping, 0, ...removed);

            this.files = createFileList(files);

            this.fileDropping = null;
            this.fileDragging = null;
        },
        dragenter(e) {
            let targetElem = e.target.closest("[draggable]");

            this.fileDropping = targetElem.getAttribute("data-index");
        },
        dragstart(e) {
            this.fileDragging = e.target
                .closest("[draggable]")
                .getAttribute("data-index");
            e.dataTransfer.effectAllowed = "move";
        },
        loadFile(file) {
            const preview = document.querySelectorAll(".preview");
            const blobUrl = URL.createObjectURL(file);

            preview.forEach(elem => {
                elem.onload = () => {
                    URL.revokeObjectURL(elem.src); // free memory
                };
            });

            return blobUrl;
        },
        addFiles(e) {
            const files = [...e.target.files].filter((file) => file.type === "application/pdf");
            if (files.length > 0) {
                this.files = createFileList([], [files[0]]);
                this.formData = new FormData();
                this.formData.append("file", files[0]);
            }
        },
          
    };
}

function submitForm() {
	var formElement = document.getElementById("myForm");
	var data = new FormData(formElement);
    showLoadingUI();
	fetch("/", {
			method: "POST",
			body: data,
		})
        .then((response) => response.text())
		.then((data) => {
            toast('Success', 'File uploaded successfully', toastStyles.success, 4000);
            hideLoadingUI();
		})
		.catch((error) => {
			console.error(error);
            toast('Error', 'Upload failed!', toastStyles.error, 4000);
		});
}

function showLoadingUI() {
    // Show loading UI (e.g., display a spinner or show a loading message)
    const uploadingBtn = document.getElementById("uploadingBtn");
    const submitBtn = document.getElementById("submitBtn");
    uploadingBtn.style.display = "block";
    submitBtn.style.display = "none";
    console.log("Uploading...")
  }
  
function hideLoadingUI() {
    // Hide loading UI (e.g., hide the spinner or remove the loading message)
    const submitBtn = document.getElementById("submitBtn");
    const uploadingBtn = document.getElementById("uploadingBtn");
    submitBtn.style.display = "block";
    uploadingBtn.style.display = "none";
    console.log("Uploaded!")
}
  


