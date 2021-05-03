console.log("in")
const createCharacterHandler = async (event) => {
event.preventDefault();

  const name = document.querySelector(".character-name").value.trim();
  const raceResponse = document.querySelector(".character-race");
  const race = raceResponse.options[raceResponse.selectedIndex].text;
  const charClassResponse = document.querySelector(".character-class");
  const char_class =
    charClassResponse.options[charClassResponse.selectedIndex].text;
  const description = document
    .querySelector(".character-description")
    .value.trim();
  // const charPhoto = document.querySelector('#character-photo');
  const image = document.getElementById("project-image").files[0];

  if (name && race && char_class && description) {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("race", race);
    formData.append("char_class", char_class);
    formData.append("description", description);
    formData.append("image", image);

    const response = await fetch(`/api/character`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log(response);
      
      alert("The gods have smiled upon your creation. Go forth, mortal.");
      window.location.replace('/api/character')
    } else {
      alert(
        "DISGRACE! You have angered the gods with your creation. Try again, mortal."
      );
    }
  }
};

document
  .querySelector(".character-creation-form")
  .addEventListener("submit", createCharacterHandler);