import { useEffect, useState } from "react";

function UseEffectApp() {
  const [exchangeData, setExchangeData] = useState({});
  const [bankData, setBankData] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setBankData({
        income: 100,
      });
    }, 1000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setExchangeData({
        returns: 100,
      });
    }, 1000);
  }, []);

  const incomeTax = (bankData.income + exchangeData.returns) * 0.3;

  return <div>hi there, your income tax returns are {incomeTax}</div>;
}

export default UseEffectApp;
