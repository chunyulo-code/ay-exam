import { useState } from "react";
import AgeGroupPriceList from "./components/AgeGroupPriceList";

export default function App() {
  const [result, setResult] = useState([{ ageGroup: [0, 20], price: 0 }]);

  function getNumberIntervals(intervals) {
    const MIN = 0;
    const MAX = 20;
    const range = Array(MAX - MIN + 1).fill(0);

    function findIntervals(rangeArray) {
      const result = {
        overlap: [],
        notInclude: []
      };

      let currentOverlapInterval = null;
      let currentNotIncludeInterval = null;

      for (let i = 0; i < rangeArray.length; i++) {
        const value = rangeArray[i];

        if (value === 0) {
          if (currentNotIncludeInterval) {
            currentNotIncludeInterval[1] = i;
          } else {
            currentNotIncludeInterval = [i, i];
          }
        }

        if (value >= 2) {
          if (currentOverlapInterval) {
            currentOverlapInterval[1] = i;
          } else {
            currentOverlapInterval = [i, i];
          }
        }

        if (value === 1 || i === rangeArray.length - 1) {
          if (currentOverlapInterval) {
            result.overlap.push(currentOverlapInterval);
            currentOverlapInterval = null;
          }

          if (currentNotIncludeInterval) {
            result.notInclude.push(currentNotIncludeInterval);
            currentNotIncludeInterval = null;
          }
        }
      }

      return result;
    }

    for (const interval of intervals) {
      const [start, end] = interval;
      for (let i = start; i <= end; i++) {
        range[i] += 1;
      }
    }

    return findIntervals(range);
  }

  function checkAgeGroups() {
    const extractedAgeGroups = result.map((item) => item.ageGroup);
    const checkedResult = getNumberIntervals(extractedAgeGroups);
    return checkedResult;
  }

  const shouldDisabled = checkAgeGroups().notInclude.length === 0;

  return (
    <div className="p-5">
      {result.map((data, index) => (
        <AgeGroupPriceList
          key={index}
          index={index}
          data={data}
          result={result}
          setResult={setResult}
          onChange={(result) => console.log(result)}
          checkAgeGroups={checkAgeGroups}
        />
      ))}
      <button
        onClick={() =>
          setResult((prev) => [...prev, { ageGroup: [0, 20], price: 0 }])
        }
        className={shouldDisabled ? "text-gray-300" : "text-teal-500"}
        disabled={shouldDisabled}
      >
        + 新增價格設定
      </button>
    </div>
  );
}
