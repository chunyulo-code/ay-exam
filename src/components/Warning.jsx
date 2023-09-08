export default function Warning({ textToDisplay }) {
  return (
    <p className="w-full rounded-md text-orange-600 text-sm bg-red-100 p-2 ">
      {textToDisplay}
    </p>
  );
}
