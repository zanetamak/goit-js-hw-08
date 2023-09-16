'use strict';
import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';

let formState = { //let a nie const bo zmiana jest aktualizowana, a nie stała. początkowo pola puste
    email: '',
    message: ''
  };

const checkStorage = localStorage.getItem(localStorageKey); //tutaj przechowywane są dane formularza
if(checkStorage){ // Sprawdzasz, czy zmienna checkStorage zawiera wartość inną niż null. 
    formState = JSON.parse(checkStorage); // parsowanie (zapisanie stanu formularza) danych z local storage, które wcześniej były zapisane w formacie JSON.
    //Wynik parsowania (czyli wcześniej zapisany stan formularza) jest przypisywany do zmiennej formState, 
    //co aktualizuje stan formularza na podstawie danych z local storage.
  form.elements.email.value = formState.email;
  form.elements.message.value = formState.message;
}

const throttledSave = throttle((data) => {
    localStorage.setItem(localStorageKey, JSON.stringify(data)); // zapisywanie ciągu znaków w formacie JSON w localStorage
  }, 500);

  // obsługa  input
function saveData(evt) { // evt - obiekt zdarzenia. przyjmuje zdarzenie, dzięki czemu uzyskuje dostęp do zmienionego elementu formularza (czyli evt.target)
    formState[evt.target.name] = evt.target.value; // nazwa pola = wartość pola. aktualizacaj pól w obiekcie formState na nową wartość
    throttledSave(formState);
}
form.addEventListener("input", saveData);


// obsługa submit
const sentForm = eventSent => {
    eventSent.preventDefault(); // dzięki preventDefault nie dojdzie do ponownego załadowania strony po wciśnięciu submit
    const {
        elements: { email, message }, // destrukturyzacja, aby mieć dostęp do el. formularza
    } = eventSent.currentTarget; // odnosi się do elementu, który jest celem zdarzenia, czyli formularza.
// Usunięcie białych znaków 
    const emailValue = email.value.trim(); 
    const messageValue = message.value.trim();

    if (emailValue === "" || messageValue === "") {
 return  alert('All form fields are required.');
} 
    const objectData = { //dane wprowadzone przez uzytkownika
        email: email.value,
        message: message.value,
    };
    console.log(objectData);
    localStorage.removeItem(localStorageKey); // dane związane z formularzem zostaną usunięte po 'submit'
    formState = { // przypisane na nowo odpowiednich wartości
        email: '',
        message: ''
    };
    form.reset(); // wyczyszczanie pól, przygotowanie do ponownego uzycia 
};
form.addEventListener('submit', sentForm);
// Pusty nawias () - Anonimowa funkcja:
