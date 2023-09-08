import Warning from "./Warning";

export default function AgeGroupSelect({
  index,
  ageGroup,
  setResult,
  checkAgeGroups
}) {
  const startAgeOptions = [];
  for (let i = 0; i <= 20; i++) {
    startAgeOptions.push(
      <option key={i} value={i} disabled={i > ageGroup[1]}>
        {i}
      </option>
    );
  }

  const endAgeOptions = [];
  for (let i = 0; i <= 20; i++) {
    endAgeOptions.push(
      <option key={i} value={i} disabled={i < ageGroup[0]}>
        {i}
      </option>
    );
  }

  const shouldShowWarnings = checkAgeGroups().overlap.length > 0;

  return (
    <div className="w-[400px] text-sm">
      <p>年齡</p>
      <div className="flex rounded-md mt-1">
        <select
          value={ageGroup[0]}
          onChange={(e) =>
            setResult((prev) => {
              const newResult = [...prev];
              newResult[index].ageGroup[0] = parseInt(e.target.value);
              return newResult;
            })
          }
          className="w-full px-2 border border-gray-300 focus:border-orange-400 rounded-none rounded-l-md"
        >
          {startAgeOptions}
        </select>
        <div className="px-2 py-3 bg-gray-200 border-y border-gray-300">~</div>
        <select
          value={ageGroup[1]}
          onChange={(e) =>
            setResult((prev) => {
              const newResult = [...prev];
              newResult[index].ageGroup[1] = parseInt(e.target.value);
              return newResult;
            })
          }
          className="w-full px-2 border border-gray-300 focus:border-orange-400 rounded-none rounded-r-md"
        >
          {endAgeOptions}
        </select>
      </div>
      {shouldShowWarnings && <Warning textToDisplay="年齡區間不可重疊" />}
    </div>
  );
}
