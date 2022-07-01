import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
    form: document.querySelector('.feedback-form'),
    email: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea'),
};

const dataForm = {
    email: '',
    message: '',
}

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

populateInput();

function onFormSubmit(event) {  
    // что б не перезагружалась страница при отправке 
    event.preventDefault();

    //выводи объект с полями email, message и текущими их значениями в консоль
    const dataFormJson = JSON.parse(localStorage.getItem(STORAGE_KEY));
    console.log(dataFormJson);

    // очищает форму
    event.currentTarget.reset(); 

    // при отправке очищает localStorage
    localStorage.removeItem(STORAGE_KEY);   
}

function onFormInput(event) {
    // берем value input 
    dataForm[event.target.name] = event.target.value;

    // делаем из обьекта строку
    const dataFormJson = JSON.stringify(dataForm);

    // записываем строку в localStorage
    localStorage.setItem(STORAGE_KEY, dataFormJson);
}

function populateInput() {
    // берем данные из localStorage
    const saveDataForm = JSON.parse(localStorage.getItem(STORAGE_KEY));
    
    if (saveDataForm) {
        refs.email.value = saveDataForm.email;
        refs.textarea.value = saveDataForm.message;      
    };
    
};

