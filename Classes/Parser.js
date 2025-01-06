class Parser {
  constructor() {}

  json(jsonStr) {
    const content = JSON.parse(jsonStr);

    return content;
  }

  jsonl(jsonlStr) {
    const jsonlObjects = [];
    const lines = jsonlStr.split('\n');

    lines.forEach((line) => {
      try {
        jsonlObjects.push(JSON.parse(line));
      } catch (err) {
        return null;
      }
    });

    return jsonlObjects;
  }
}

module.exports = Parser;
