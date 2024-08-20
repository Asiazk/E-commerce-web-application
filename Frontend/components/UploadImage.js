import { useState } from "react";

export default function Form() {
  const [file, setFile] = useState("");

  function handleForm(e) {
    e.preventDefault();
    
    const data = new FormData();
    data.append("image", file);

    fetch("http://localhost:8080/api/v1/uploadImage", {
      method: "POST",
      body: data,
    });
  }

  function handleFileChange(e) {
    if (e.target.files && e.target.files[0]){
        setFile(e.target.files[0]);
  }}

  return (
    <>
      <form>
        <input type="file" name="image" onChange={handleFileChange} />
        <button type="submit" onClick={(e) => handleForm(e)}>
          Submit
        </button>
      </form>
    </>
  );
}