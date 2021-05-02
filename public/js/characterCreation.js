//create character event handler
const createCharacterHandler = async (event) => {
    console.log("################### Button Pressed");
    event.preventDefault();

    const name = document.querySelector('.character-name').value.trim();
    const race = document.querySelector('.character-race').value.trim();
    const char_class = document.querySelector('.character-class').value.trim();
    const description = document.querySelector('.character-description').value.trim();
    // const charPhoto = document.querySelector('#character-photo');

    //TODO: ask how to display photo here
    if (name && race && char_class && description) {
        const response = await fetch('/api/character', {
            method: 'POST',
            body: JSON.stringify({ name, race, char_class, description }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the profile page
            alert('Your character has been created!');
            // document.location.replace('/character-selection');
        } else {
            alert('Failed to login. Try again.');
        }
    }
};

document
    .querySelector('.character-creation-form')
    .addEventListener('submit', createCharacterHandler);