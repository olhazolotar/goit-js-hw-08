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


function onFormInput(event) {
    // берем value input 
    dataForm[event.target.name] = event.target.value;
    // console.log(dataForm);

    // делаем из обьекта строку
    const dataFormJson = JSON.stringify(dataForm);

    // записываем строку в localStorage
    localStorage.setItem(STORAGE_KEY, dataFormJson);
}

 
function onFormSubmit(event) {  
    // что б не перезагружалась страница при отправке 
    event.preventDefault();

    // очищает форму
    event.currentTarget.reset(); 
    
    // при отправке очищает localStorage
    localStorage.removeItem(STORAGE_KEY); 

    //выводи объект с полями email, message и текущими их значениями в консоль
    console.log(dataForm);
}


// берем данные из localStorage и заполняем им импут
function populateInput() {
    // берем данные из localStorage
    const saveDataForm = localStorage.getItem(STORAGE_KEY);
    
    if (saveDataForm) {
        const saveDataFormJson = JSON.parse(saveDataForm);
        refs.email.value = saveDataFormJson.email;
        refs.textarea.value = saveDataFormJson.message;      
    };
    
};