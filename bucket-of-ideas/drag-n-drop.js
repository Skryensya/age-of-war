// drag and drop
const draggableElements = document.querySelectorAll('[draggable="true"]');

draggableElements.forEach((draggableElement) => {
  // get id
  const id = draggableElement.id;
  const img = new Image();
  img.src = `/assets/units/${id}.webp`;
  // size

  draggableElement.addEventListener("dragstart", (event) => {
    // change the cursor to grabbing

    event.dataTransfer.setDragImage(img, 0, 0);
    // add to target the visibility: hidden
    event.target.style.opacity = "0";

    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.setData("text/plain", id);
  });

  // check if the element is not dropped in a zone, if not, show the element again
  draggableElement.addEventListener("dragend", (event) => {
    event.target.style.opacity = "1";
  });
});

const dropZoneElements = document.querySelectorAll("[drop-zone]");

dropZoneElements.forEach((dropZoneElement) => {
  dropZoneElement.addEventListener("dragenter", (event) => {
    event.preventDefault();
  });
  dropZoneElement.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  dropZoneElement.addEventListener("drop", (event) => {
    const text = event.dataTransfer.getData("text/plain");
    // event.target.textContent = text;
    // set the img to the target
    const img = new Image();
    img.src = `/assets/units/${text}.webp`;
    event.target.appendChild(img);
    event.preventDefault();
  });
});
