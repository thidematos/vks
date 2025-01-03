function eventIterator(frames, typeKey) {
  const list = [];
  frames.forEach((frame) => {
    frame.events.forEach((event) => {
      if (event.type === typeKey) {
        list.push(event);
      }
    });
  });

  return list;
}

module.exports = eventIterator;
