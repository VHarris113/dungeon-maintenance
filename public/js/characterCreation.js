//create character event handler
const createCharacterHandler = async (event) => {
    console.log("################### Button Pressed");
    event.preventDefault();

    const name = document.querySelector('.character-name').value.trim();
    const raceResponse = document.querySelector('.character-race');
    const race = raceResponse.options[raceResponse.selectedIndex].text;
    const charClassResponse = document.querySelector('.character-class');
    const char_class = charClassResponse.options[charClassResponse.selectedIndex].text;
    const description = document.querySelector('.character-description').value.trim();
    // const charPhoto = document.querySelector('#character-photo');

    if (name && race && char_class && description) {
        const response = await fetch('/api/character', {
            method: 'POST',
            body: JSON.stringify({ name, race, char_class, description }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the profile page
            alert('The gods have smiled upon your creation. Go forth, mortal.');
            // document.location.replace('/character-selection');
        } else {
            alert('DISGRACE! You have angered the gods with your creation. Try again, mortal.');
        }
    }
};

document
    .querySelector('.character-creation-form')
    .addEventListener('submit', createCharacterHandler);