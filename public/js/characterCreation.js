//create character event handler
const createCharacterHandler = async (event) => {
    event.preventDefault();

    const charName = document.querySelector('#character-name').value.trim();
    const charRace = document.querySelector('#character-race').value.trim();
    const charClass = document.querySelector('#character-class').value.trim();
    const charDescription = document.querySelector('#character-description').value.trim();
    const charPhoto = document.querySelector('#character-photo');

    //TODO: ask how to display photo here
    if (charName && charRace && charClass && charDescription) {
        const response = await fetch('/api/character/create', {
            method: 'POST',
            body: JSON.stringify({ charName, charRace, charClass, charDescription }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the profile page
            alert('THE DND GODS SAY: We smile upon you and your creation. Go forth, mortal.');
            document.location.replace('/character-selection');
        } else {
            alert('THE DND GODS SAY: Your character does not please us. Try again, mortal.');
            return
        }
    }
};

document
    .querySelector('.character-creation-form')
    .addEventListener('submit', createCharacterHandler);