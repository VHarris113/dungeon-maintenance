//view all characters event handler
const viewAllCharHandler = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/character/`, {
            method: 'GET',
        });

        if (response.ok) {
            alert('Your character has been deleted!');
            document.location.replace('/character-selection');
        } else {
            alert('Failed to delete character');
        }
    }
};

//view user characters event handler
const viewUserCharHandler = async (event) => {

};

//view one character event handler

const viewOneCharHandler = async (event) => {

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
document
  .querySelector('.view-allChar-button')
  .addEventListener('click', viewAllCharHandler);

document
  .querySelector('.view-userChar-button')
  .addEventListener('click', viewUserCharHandler);

  document
  .querySelector('.view-oneChar-button')
  .addEventListener('click', viewOneCharHandler);

  document
  .querySelector('.delete-character-button')
  .addEventListener('click', deleteCharacterHandler);