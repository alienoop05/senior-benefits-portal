"use client";

import { useState } from 'react';

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState<number>(50);
  const [retirementAge, setRetirementAge] = useState<number>(67);
  const [currentSavings, setCurrentSavings] = useState<number>(100000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [annualReturn, setAnnualReturn] = useState<number>(6);

  const calculateRetirement = () => {
    const yearsToGrow = retirementAge - currentAge;
    let balance = currentSavings;
    const monthlyRate = annualReturn / 100 / 12;

    for (let i = 0; i < yearsToGrow * 12; i++) {
      balance = balance * (1 + monthlyRate) + monthlyContribution;
    }
    return balance;
  };

  const finalBalance = calculateRetirement();

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 w-full max-w-2xl mx-auto my-8 dark:border-slate-700 dark:bg-slate-900">
      <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center dark:text-blue-200">Retirement Savings Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-slate-300">Current Age: {currentAge}</label>
          <input type="range" min="18" max="80" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} className="w-full accent-blue-600" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-slate-300">Retirement Age: {retirementAge}</label>
          <input type="range" min={currentAge + 1} max="90" value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value))} className="w-full accent-blue-600" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-slate-300">Current Savings ($)</label>
          <input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-slate-300">Monthly Contribution ($)</label>
          <input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-slate-300">Expected Annual Return (%): {annualReturn}%</label>
          <input type="range" min="1" max="15" value={annualReturn} onChange={(e) => setAnnualReturn(Number(e.target.value))} className="w-full accent-blue-600" />
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg text-center border border-blue-100 dark:border-slate-700 dark:bg-slate-800">
        <h3 className="text-lg text-gray-600 font-medium mb-2 dark:text-slate-300">Estimated Retirement Balance</h3>
        <p className="text-4xl font-extrabold text-blue-900 dark:text-blue-200">
          ${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(finalBalance)}
        </p>
        <p className="text-sm text-gray-500 mt-2 dark:text-slate-400">
          Assuming a {annualReturn}% annual return over {retirementAge - currentAge} years.
        </p>
      </div>
    </div>
  );
}
