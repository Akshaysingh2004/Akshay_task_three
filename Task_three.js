const inputFieldsContainer = document.getElementById('inputField');
const addFieldBtn = document.getElementById('add');
const dynamicForm = document.getElementById('Form');
const customAlert = document.getElementById('Alert');

addFieldBtn.addEventListener('click', addInputField);

function addInputField() {
    const inputGroup = document.createElement('div');
    inputGroup.classList.add('input-group');

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.placeholder = 'Enter text...';

    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');

    inputField.addEventListener('input', () => {
        if (inputField.value.trim() === '') {
            errorMessage.textContent = 'This field cannot be empty';
            errorMessage.style.display = 'block';
        } else {
            errorMessage.textContent = '';
            errorMessage.style.display = 'none';
        }
    });

   

    inputGroup.appendChild(inputField);
    inputGroup.appendChild(errorMessage);
    inputFieldsContainer.appendChild(inputGroup);

    const removalTimer = setTimeout(() => {
        if (inputField.value.trim() === '') {
            inputFieldsContainer.removeChild(inputGroup);
        }
    }, 10000); 

    inputField.addEventListener('input', () => {
        clearTimeout(removalTimer);
    });
}


dynamicForm.addEventListener('submit', (event) => {
    event.preventDefault(); 

    let isValid = true;

    [...inputFieldsContainer.children].forEach(inputGroup => {
        const inputField = inputGroup.querySelector('input');
        const errorMessage = inputGroup.querySelector('.error-message');

        if (inputField.value.trim() === '') {
            errorMessage.textContent = 'This field cannot be empty';
            errorMessage.style.display = 'block';
            isValid = false;
        } else {
            errorMessage.style.display = 'none';
        }
    });

    if (isValid) {
        showAlert('Form submitted successfully!');
        clearInputValues(); 
    } 
});


function showAlert(message) {
    customAlert.textContent = message;
    customAlert.classList.remove('hidden');

    setTimeout(() => {
        customAlert.classList.add('hidden');
    }, 6000); 
}


function clearInputValues() {
    [...inputFieldsContainer.children].forEach(inputGroup => {
        const inputField = inputGroup.querySelector('input');
        inputField.value = ''; 
    });
}


function addDefaultField() {
    addInputField(); 
}


window.addEventListener('DOMContentLoaded', () => {
    addDefaultField();
});
