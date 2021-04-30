
//create character event handler
const createCharacterHandler = async (event) => {
    event.preventDefault();

    const charName = document.querySelector('#character-name').value.trim();
    const charRace = document.querySelector('#character-race').value.trim();
    const charClass = document.querySelector('#character-class').value.trim();
    const charDescription = document.querySelector('#character-description').value.trim();

    if (charName && charRace && charClass && charDescription) {
        const response = await fetch('/api/character/create', {
            method: 'POST',
            body: JSON.stringify({ charName, charRace, charClass, charDescription }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the profile page
            alert('Your character has been created!');
            document.location.replace('/character-selection');
        } else {
            alert('Failed to login. Try again.');
        }
    }
};

//delete character event handler
const deleteCharacterHandler = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/character/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Your character has been deleted!');
            document.location.replace('/character-selection');
        } else {
            alert('Failed to delete character');
        }
    }

};

//view all characters event handler

document
  .querySelector('.character-creation-form')
  .addEventListener('submit', createCharacterHandler);

document
  .querySelector('.delete-character-button')
  .addEventListener('click', deleteCharacterHandler);