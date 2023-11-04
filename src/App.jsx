import { useState, useRef } from "react";
import "./App.css";
import image1 from "./assets/image-1.webp";
import image2 from "./assets/image-2.webp";
import image3 from "./assets/image-3.webp";
import image4 from "./assets/image-4.webp";
import image5 from "./assets/image-5.webp";
import image6 from "./assets/image-6.webp";
import image7 from "./assets/image-7.webp";
import image8 from "./assets/image-8.webp";
import image9 from "./assets/image-9.webp";
import image10 from "./assets/image-10.jpeg";
import image11 from "./assets/image-11.jpeg";

function App() {
  const [elements, setElements] = useState([
    { url: image1, isSelected: false, id: 0 },
    { url: image2, isSelected: false, id: 2 },
    { url: image3, isSelected: false, id: 3 },
    { url: image4, isSelected: false, id: 4 },
    { url: image5, isSelected: false, id: 5 },
    { url: image6, isSelected: false, id: 6 },
    { url: image7, isSelected: false, id: 7 },
    { url: image8, isSelected: false, id: 8 },
    { url: image9, isSelected: false, id: 9 },
    { url: image10, isSelected: false, id: 10 },
    { url: image11, isSelected: false, id: 11 },
  ]);
  const [sCount, setSCount] = useState(0);

  const fileInputRef = useRef();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result;

        const elems = [...elements];
        elems.push({
          url: imageUrl,
          isSelected: false,
          id: elems.length,
        });
        setElements(elems);
      };
      reader.readAsDataURL(file);
    }
  };

  let draggedItem = null;
  let draggedIndex = -1;

  function dragStart(event, index) {
    draggedItem = event.target;
    draggedIndex = index;
  }

  function allowDrop(event) {
    event.preventDefault();
  }

  function CheckUncheck(index) {
    const elems = [...elements];
    elems[index].isSelected = !elems[index].isSelected;
    setElements(elems);
    const count = elements.filter((e) => e.isSelected);
    setSCount(count.length);
  }

  function drop(event, index) {
    event.preventDefault();
    if (draggedItem !== event.target) {
      const elem = JSON.parse(JSON.stringify(elements));
      const tempChild = elem[draggedIndex];
      elem[draggedIndex] = elem[index];
      elem[index] = tempChild;

      setElements(elem);
    }
  }

  return (
    <>
      {sCount ? (
        <div className="flex justify-between container bg-slate-300">
          <div className="font-semibold">{sCount} File Selected</div>
          <div>
            <button
              className="text-red-600 font-semibold"
              onClick={() => {
                const elem = elements.filter((f) => f.isSelected === false);
                setElements(elem);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div className="container font-semibold bg-slate-300">Gallery</div>
      )}
      <input
        type="file"
        accept="image/jpeg"
        id="imageUpload"
        style={{ display: "none" }}
        onChange={handleImageUpload}
        ref={fileInputRef}
      />
      <div className="grid-container container">
        {elements &&
          elements.map((e, index) => (
            <div
              key={index}
              draggable="true"
              className="draggable-item image-container"
              style={{ position: "relative" }}
              onClick={() => CheckUncheck(index)}
              onDragStart={(event) => dragStart(event, index)}
              onDrop={(event) => drop(event, index)}
              onDragOver={(event) => allowDrop(event)}
            >
              {e.isSelected && (
                <input
                  onChange={() => CheckUncheck(index)}
                  style={{ position: "absolute", left: 5, top: 5 }}
                  type="checkbox"
                  checked={e.isSelected}
                />
              )}
              <img src={e.url} alt={`Image ${index}`} />
              <div className="ripple"></div>
            </div>
          ))}
        <button
          className="grid-item clickable"
          onClick={() => fileInputRef.current.click()}
        >
          +
        </button>
      </div>
    </>
  );
}

export default App;
