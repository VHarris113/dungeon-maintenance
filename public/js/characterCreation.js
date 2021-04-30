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

document
  .querySelector('.character-creation-form')
  .addEventListener('submit', createCharacterHandler);