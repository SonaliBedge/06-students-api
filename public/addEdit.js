import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";
import { showStudents } from "./students.js";

let addEditDiv = null;
let schoolName = null;
let grade = null;
let subject = null;
let addingStudent = null;

export const handleAddEdit = () => {
  addEditDiv = document.getElementById("edit-student");
  schoolName = document.getElementById("schoolName");
  grade = document.getElementById("grade");
  subject = document.getElementById("subject");
  addingStudent = document.getElementById("adding-student");
  const editCancel = document.getElementById("edit-cancel");

  addEditDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      console.log(e.target);
      if (e.target === addingStudent) {
        enableInput(false);

        let method = "POST";
        let url = "/api/v1/students";
        if (addingStudent.textContent === "update") {
          method = "PATCH";
          url = `/api/v1/students/${addEditDiv.dataset.id}`;
        }

        try {
          const response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              SchoolName: schoolName.value,
              Grade: grade.value,
              Subject: subject.value,
            }),
          });
          const data = await response.json();
          if (response.status === 200 || response.status === 201) {
            if (response.status === 201) {
              if (response.status === 200) {
                // a 200 is expected for a successful update
                message.textContent = "The student entry was updated.";
              } else {
                // a 201 is expected for a successful create
                message.textContent = "The student entry was created.";
              }
              schoolName.value = "";
              grade.value = "";
              subject.value = "All";

              showStudents();
            } else {
              message.textContent = data.msg;
            }
          }
        } catch (err) {
          console.log(err);
          message.textContent = "A communication error occurred.";
        }

        enableInput(true);
      } else if (e.target === editCancel) {
        message.textContent = "";
        showStudents();
      }
      //  else if (e.target === editCancel) {
      //     message.textContent = "";
      //     showStudents();
      //   }
    }
  });
};
export const showAddDelete = async (studentId) => {
  enableInput(false);
  try {
    const response = await fetch(`/api/v1/students/${studentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    showStudents();
    if (response.status === 200) {
      message.textContent = "The student record was deleted.";
    } else {
      message.textContent = "The student record was not deleted.";
    }
  } catch (err) {
    console.log(err);
    message.textContent = "A communications error has occurred.";
    showStudents();
  }
  enableInput(true);
};
export const showAddEdit = async (studentId) => {
  if (!studentId) {
    schoolName.value = "";
    grade.value = "";
    subject.value = "All";
    addingStudent.textContent = "add";
    message.textContent = "";

    setDiv(addEditDiv);
  } else {
    enableInput(false);

    try {
      const response = await fetch(`/api/v1/students/${studentId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        schoolName.value = data.student.SchoolName;
        grade.value = data.student.Grade;
        subject.value = data.student.Subject;
        addingStudent.textContent = "update";
        message.textContent = "";
        addEditDiv.dataset.id = studentId;

        setDiv(addEditDiv);
      } else {
        // might happen if the list has been updated since last display
        message.textContent = "The students entry was not found";
        showStudents();
      }
    } catch (err) {
      console.log(err);
      message.textContent = "A communications error has occurred.";
      showStudents();
    }

    enableInput(true);
  }
};
