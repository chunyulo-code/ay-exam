import Warning from "./Warning";

export default function PriceInput({ index, price, setResult }) {
  function addComma(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="w-[400px] text-sm">
      <p>入住費用（每人每晚）</p>
      <div className="flex rounded-md mt-1">
        <div className="px-2 py-3 bg-gray-200 border-y border-l border-gray-300 text-gray-500 rounded-l-md">
          TWD
        </div>
        <input
          className="px-2 w-full outline-none border border-gray-300 focus:border-orange-400 rounded-none rounded-r-md"
          value={price}
          onChange={(e) =>
            setResult((prev) => {
              const newResult = [...prev];
              newResult[index].price = addComma(e.target.value);
              return newResult;
            })
          }
          placeholder="請輸入費用"
        />
      </div>
      {price.length === 0 && <Warning textToDisplay="不可以為空白" />}
      <p className="text-right">輸入 0 表示免費</p>
    </div>
  );
}
