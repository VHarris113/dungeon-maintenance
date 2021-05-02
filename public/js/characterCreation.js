//create character event handler
const createCharacterHandler = async (event) => {
    event.preventDefault();

    const charName = document.querySelector('.character-name').value.trim();
    const charRace = document.querySelector('.character-race').value.trim();
    const charClass = document.querySelector('.character-class').value.trim();
    const charDescription = document.querySelector('.character-description').value.trim();
    const profile_image = document.getElementById('project-img').files[0];

    //TODO: ask how to display photo here
    if (charName && charRace && charClass && charDescription) {
        const response = await fetch('/api/character', {
            method: 'POST',
            body: JSON.stringify({ charName, charRace, charClass, charDescription, profile_image }),
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