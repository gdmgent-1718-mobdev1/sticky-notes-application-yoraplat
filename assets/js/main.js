function ready(cb) {
    /in/.test(document.readyState) ?
        setTimeout(ready.bind(null, cb), 90) :
        cb();
};

ready(function () {
    var createBtn = document.querySelector(".createButton");
    var inputValue = document.querySelector(".messageInput")
    var updateBtn = document.querySelectorAll(".stickyUpdate");
    var removeBtn = document.querySelectorAll(".stickyDelete");
    var stickyContainer = document.querySelector(".stickyContainer");
    var newMessage = document.querySelector(".messageInput");
    var stickyText = document.querySelector(".stickyMessage");



    createBtn.addEventListener("click", function () {
        // Update message input
        message = newMessage.value;
        console.log(message);
        if (message === null || message === "") {
            alert("New sticky needs a message");
        } else {
            App.newSticky();
            App.stickyApp();
        }
    });


    // Remove stickyNote


    var App = {
        "init": function () {
            this._applicationDbContext = ApplicationDbContext; // Reference to the ApplicationDbContext object
            this._applicationDbContext.init('ahs.nmd.stickynotes'); // Intialize the ApplicationDbContext with the connection string as parameter value
            this.stickyApp();
            this.removeSticky();
        },

        "stickyApp": function () {
            var data = ApplicationDbContext.getStickyNotes();

            var tempStr = "";

            for (i = 0; i < data.length; i++) {

                tempStr += `<div class="stickyForm">
                                        <div class="stickyMessage">${data[i].message}</div>
                                        <div class="stickyOptions"><button class="stickyUpdate" onclick="updateSticky">Edit</button>
                <button class="stickyDelete">Remove</button></div>        <div class="edit">
            <input type="text" class="updatedMessage">
            <button class="update">Save</button>
        </div></div>`;

            };


            stickyContainer.innerHTML = tempStr;

            for (var i = 0; i < updateBtn.length; i++) {
                updateBtn[i].addEventListener('click', function (event) {
                    var id = parseInt(this.id);

                    var editScreen = document.querySelector(".edit");
                    editScreen.style = "display:block";
                    App.stickyApp();

                    ApplicationDbContext.updateStickyNote(id);
                });
            }
        },

        "newSticky": function () {
            // 1. Get all sticky notes
            let data = this._applicationDbContext.getStickyNotes();
            // 2. Create a new sticky note
            let sn = new StickyNote();


            sn.message = message;

            sn = this._applicationDbContext.addStickyNote(sn); // add to db and save it
            // 3. Get allesticky notes
            data = this._applicationDbContext.getStickyNotes();
            console.log(data);
            // 4. Get sticky note by id
            //sn = this._applicationDbContext.getStickyNoteById();
            //console.log(sn);
            // 5. Delete sticky note by id
            //const deleted = this._applicationDbContext.deleteStickyNoteById(StickyNote.id);
            //console.log(deleted);
            // 6. Soft Delete sticky note with id: 1551637732407
            //const softDeleted = this._applicationDbContext.softDeleteStickyNoteById(1551637732407);
            //console.log(softDeleted);
            //sn = this._applicationDbContext.getStickyNoteById(1551637732407);
            //console.log(sn);
            // 6. Soft Delete sticky note with id: 1551637732407
            //const softUnDeleted = this._applicationDbContext.softUnDeleteStickyNoteById(StickyNote.id);
            //console.log(softUnDeleted);
            // Update sticky note with id: 1902577181167
            //sn = this._applicationDbContext.getStickyNoteById(StickyNote.id);
            //console.log(sn);
            //const updated = this._applicationDbContext.updateStickyNote(StickyNote.id);
            //console.log(updated);







        },
        "removeSticky": function () {

            for (var i = 0; i < removeBtn.length; i++) {
                removeBtn[i].addEventListener('click', function (event) {
                    var id = parseInt(this.id);
                    ApplicationDbContext.deleteStickyNoteById(id);
                });
            }

        },
        "updateSticky": function () {

        }





    };

    // Initialize the application
    App.init();


});
