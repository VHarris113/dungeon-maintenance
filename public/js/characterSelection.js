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
  .querySelector('.delete-character-button')
  .addEventListener('click', deleteCharacterHandler);