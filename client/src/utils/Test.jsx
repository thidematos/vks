import { useState } from "react";
import Button from "../ui/Button";

function Test() {
  const [file, setFile] = useState(false);
  const [jsonlContent, setJsonlContent] = useState([]);
  const [index, setIndex] = useState(0);

  const fileReader = new FileReader();

  fileReader.onload = (event) => {
    const data = event.target.result;
    const lines = data.split("\n");
    const objects = [];
    let count = 0;
    lines.forEach((line) => {
      try {
        objects.push(JSON.parse(line));
      } catch (err) {
        return null;
      }

      count++;
    });
    console.log(count);
    setJsonlContent(objects);
  };

  if (jsonlContent.length !== 0 && index === 0) {
    console.log(jsonlContent[0]);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <Button
        onClick={() => {
          fileReader.readAsText(file);
        }}
      >
        <p className="fuck"> cliqueme</p>
      </Button>
      {jsonlContent.length !== 0 && (
        <div>
          <p className="text-lg text-purple-700">
            Actual content: <span>{index}</span>
          </p>
          <Button
            onClick={() => {
              setIndex((state) => state + 1);
              console.log(jsonlContent[index]);
            }}
          >
            <p className="text-xl">Next</p>
          </Button>
        </div>
      )}
    </div>
  );
}

export default Test;
