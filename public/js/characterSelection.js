//view all characters event handler
const viewAllCharHandler = async (event) => {
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

const viewUserCharHandler = async (event) => {

};

document
  .querySelector('.view-allChar-button')
  .addEventListener('click', viewAllCharHandler);

document
  .querySelector('.view-userChar-button')
  .addEventListener('click', viewUserCharHandler);