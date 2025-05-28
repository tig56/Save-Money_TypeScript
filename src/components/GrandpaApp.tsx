import React, { useState, useEffect } from "react";

const BANK_OPTIONS = [
  "三菱UFJ銀行",
  "三井住友銀行",
  "みずほ銀行",
  "りそな銀行",
  "楽天銀行",
  "ゆうちょ銀行",
  "積立NISA",
] as const;

type BankOption = typeof BANK_OPTIONS[number];

type Asset = {
  bank: BankOption;
  amount: string; 
};

const GrandpaApp: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("grandpaAssets");
    if (saved) setAssets(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("grandpaAssets", JSON.stringify(assets));
  }, [assets]);

  const addBank = () => {
    setAssets([...assets, { bank: BANK_OPTIONS[0], amount: "0" }]);
  };

  const updateAsset = (index: number, key: keyof Asset, value: string) => {
    const newAssets = [...assets];
    if (key === "amount") {
      if (value === "") {
        newAssets[index][key] = "";
      } else {
        if (value.length > 1 && value.startsWith("0")) {
          value = value.replace(/^0+/, "");
        }
        const num = Number(value);
        newAssets[index][key] = isNaN(num) || num < 0 ? "0" : value;
      }
    } else {
      newAssets[index][key] = value as BankOption;
    }
    setAssets(newAssets);
  };

  const deleteAsset = (index: number) => {
    setAssets(assets.filter((_, i) => i !== index));
  };

  const total = assets.reduce(
    (sum, asset) => sum + Number(asset.amount || 0),
    0
  );

  return (
    <div className="container container-items">
      <h1>資産管理アプリ</h1>
      <div className="button-wrapper">
        <button id="addBank" onClick={addBank}>
          銀行追加
        </button>
      </div>

      <div className="savings-grandpatable">
        <table id="assetTable">
          <thead>
            <tr>
              <th>銀行名</th>
              <th>貯蓄額(円)</th>
              <th>削除</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset, i) => (
              <tr key={i}>
                <td>
                  <select
                    value={asset.bank}
                    onChange={(e) =>
                      updateAsset(i, "bank", e.target.value)
                    }
                  >
                    {BANK_OPTIONS.map((bank) => (
                      <option key={bank} value={bank}>
                        {bank}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    value={asset.amount}
                    onFocus={(e) => {
                      if (asset.amount === "0") e.currentTarget.value = "";
                    }}
                    onChange={(e) => updateAsset(i, "amount", e.target.value)}
                  />
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteAsset(i)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>合計資産金額 : {total.toLocaleString()}円</h2>
    </div>
  );
};

export default GrandpaApp;