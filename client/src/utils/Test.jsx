import { useState } from "react";
import Button from "../ui/Button";

function Test() {
  const [file, setFile] = useState(false);
  const fileReader = new FileReader();

  fileReader.onload = (event) => {
    const data = event.target.result;
    const lines = data.split("\n");
    let count = 0;
    lines.forEach((line) => {
      try {
        const object = JSON.parse(line);
        console.log(object);
      } catch (err) {
        return null;
      }

      count++;
    });
    console.log(count);
  };

  console.log(file);
  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <Button
        onClick={() => {
          fileReader.readAsText(file);
        }}
      >
        <p className="fuck"> cliqueme</p>
      </Button>
    </div>
  );
}

export default Test;
