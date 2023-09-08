import { useEffect } from "react";
import AgeGroupSelect from "./AgeGroupSelect";
import PriceInput from "./PriceInput";

export default function AgeGroupPriceList({
  index,
  data,
  result,
  setResult,
  onChange,
  checkAgeGroups
}) {
  function deleteHandler() {
    setResult((prev) => {
      const newResult = [...prev].filter(
        (_, indexInResult) => index !== indexInResult
      );

      return newResult;
    });
  }

  useEffect(() => {
    onChange(result);
  }, [result, onChange]);

  return (
    <div
      className={`py-8 w-[820px] ${
        index !== 0 ? "border-t border-gray-200" : ""
      }`}
    >
      <div className="text-lg flex items-center justify-between">
        <span>價格設定 - {index + 1}</span>
        {index !== 0 && (
          <button onClick={deleteHandler} className="text-orange-600">
            X 移除
          </button>
        )}
      </div>
      <div className="flex justify-between mt-2 w-full">
        <AgeGroupSelect
          index={index}
          ageGroup={data.ageGroup}
          setResult={setResult}
          checkAgeGroups={checkAgeGroups}
        />
        <PriceInput index={index} price={data.price} setResult={setResult} />
      </div>
    </div>
  );
}
