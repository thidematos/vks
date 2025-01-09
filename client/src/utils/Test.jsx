import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { format } from "date-fns";

function Test() {
  const [file, setFile] = useState(false);
  const [jsonlContent, setJsonlContent] = useState([]);
  const [index, setIndex] = useState(0);
  const [filter, setFilter] = useState("game_info");

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
    objects.map((event) => {
      if (event.gameTime) {
        event.formattedTimestamp = format(event.gameTime, "mm:ss");
      }

      return event;
    });
    setJsonlContent(objects);
  };

  if (jsonlContent.length !== 0 && index === 0) {
    console.log(jsonlContent[0]);
  }

  useEffect(() => {
    if (jsonlContent.length === 0) return;

    console.log(jsonlContent.filter((event) => event.rfc461Schema === filter));
  }, [filter, jsonlContent]);

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
      {jsonlContent.length !== 0 && (
        <select
          defaultValue={"game_info"}
          onChange={(e) => setFilter(e.target.value)}
        >
          {[...new Set(jsonlContent.map((event) => event.rfc461Schema))].map(
            (event, ind) => (
              <option key={ind} value={event}>
                {event}
              </option>
            ),
          )}
        </select>
      )}
    </div>
  );
}

export default Test;
