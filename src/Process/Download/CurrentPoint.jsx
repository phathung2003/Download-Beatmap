export default function CurrentPoint(beatmapList) {
  const count = beatmapList.reduce((accumulator, currentValue) => {
    if (currentValue.status === 1) {
      return accumulator + 1;
    }
    return accumulator;
  }, 0);

  return count;
}