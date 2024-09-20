import { RecordModel } from "pocketbase";

export function shuffleArray(array: RecordModel[]) {
  //   console.log("bye", array);
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  //   console.log("alo", array.slice(0, 3));
  return array.slice(0, 3);
}
