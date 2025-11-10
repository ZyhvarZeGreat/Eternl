"use client";

import React, { useMemo, useState, useRef, useEffect } from "react";

export default function SeedRestore({
  wordCounts = [24, 15, 12],
  onCancel,
  onConfirm,
}: {
  wordCounts?: number[];
  onCancel?: () => void;
  onConfirm?: (words: string[]) => void;
}) {
  const [step, setStep] = useState<"type" | "mnemonic">("type");
  const [selectedCount, setSelectedCount] = useState<number | null>(null);
  const [words, setWords] = useState<string[]>([]);
  const [pasteError, setPasteError] = useState<string | null>(null);
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (step === "mnemonic" && selectedCount) {
      setWords(new Array(selectedCount).fill(""));
      setTimeout(() => firstInputRef.current?.focus(), 50);
    }
  }, [step, selectedCount]);

  const columns = useMemo(() => 3, []);

  const updateWord = (index: number, val: string) => {
    setWords((prev) => {
      const copy = [...prev];
      copy[index] = val.trim();
      return copy;
    });
  };

  const handlePaste = async (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text").trim();
    if (!text) return;
    e.preventDefault();

    const split = text
      .replace(/\n+/g, " ")
      .replace(/\s+/g, " ")
      .split(" ")
      .map((w) => w.trim().toLowerCase())
      .filter(Boolean);

    if (!selectedCount) return;

    if (split.length !== selectedCount) {
      setPasteError(
        `Detected ${split.length} words — expected ${selectedCount}. Please check your phrase.`
      );
      setTimeout(() => setPasteError(null), 3500);
      return;
    }

    setWords(split);
    setPasteError(null);
  };

  const resetAll = () => {
    setWords((prev) => prev.map(() => ""));
    setTimeout(() => firstInputRef.current?.focus(), 50);
  };

  const handleConfirm = () => {
    if (!selectedCount) return;
    const allFilled = words.every((w) => w && w.length > 0);
    if (!allFilled) {
      firstInputRef.current?.focus();
      return;
    }
    onConfirm?.(words);
  };

  const goBackToType = () => {
    setStep("type");
    setWords([]);
    setSelectedCount(null);
  };

  const goNextFromType = () => {
    if (!selectedCount) return;
    setStep("mnemonic");
  };

  const renderTypeOption = (count: number) => {
    const desc =
      count === 24
        ? "Typically used by Daedalus or Eternl wallets"
        : count === 15
        ? "Common Yoroi wallet phrase"
        : "Standard 12-word wallet phrase";
    const active = selectedCount === count;
    return (
      <button
        key={count}
        onClick={() => setSelectedCount(count)}
        className={`w-full text-left rounded-2xl px-5 py-4 ring-1 transition-colors duration-150 ${
          active
            ? "bg-pink-500/10 ring-pink-400"
            : "bg-white/5 hover:bg-white/10 ring-white/10"
        }`}
      >
        <div className="font-semibold text-white">{count}-word phrase</div>
        <div className="text-sm text-white/60 mt-1">{desc}</div>
      </button>
    );
  };

  const renderMnemonicGrid = () => {
    if (!selectedCount) return null;

    const perColumn = Math.ceil(selectedCount / columns);
    const cols: number[][] = [];
    for (let c = 0; c < columns; c++) {
      cols[c] = [];
      for (let r = 0; r < perColumn; r++) {
        const idx = c * perColumn + r;
        if (idx < selectedCount) cols[c].push(idx);
      }
    }

    return (
      <div>
        <p className="text-white/70 mb-3 text-sm">
          Tip: You can paste your full seed phrase and it will auto-fill all
          fields.
        </p>

        {pasteError && (
          <div className="mb-3 text-red-400 text-sm bg-red-500/10 p-2 rounded-lg border border-red-500/30">
            {pasteError}
          </div>
        )}

        <div className="grid grid-cols-3 gap-x-6 gap-y-3">
          {cols.map((col, cIndex) => (
            <div key={cIndex} className="space-y-3">
              {col.map((idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 rounded-full bg-white/5 px-3 py-2 transition"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 text-sm">
                    {idx + 1}
                  </div>
                  <input
                    ref={idx === 0 ? firstInputRef : undefined}
                    value={words[idx] ?? ""}
                    onChange={(e) => updateWord(idx, e.target.value)}
                    onPaste={handlePaste}
                    placeholder=""
                    onFocus={(e) => e.target.select()}
                    className="flex-1 rounded-full bg-transparent px-3 py-2 text-white placeholder:text-white/30 outline-none ring-1 ring-white/10 focus:ring-pink-400/40 transition-all"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-end gap-4">
          <button
            onClick={resetAll}
            className="rounded-full bg-white/10 hover:bg-white/20 px-6 py-2 text-white transition"
          >
            Reset
          </button>
          <button
            onClick={handleConfirm}
            disabled={words.some((w) => !w)}
            className={`rounded-full px-6 py-2 text-white transition ${
              words.some((w) => !w)
                ? "bg-white/10 opacity-50 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-400 via-orange-300 to-fuchsia-500 hover:brightness-110"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      {step === "type" && (
        <div>
          <h4 className="text-lg font-semibold text-white">Seed phrase type</h4>
          <p className="mt-2 text-white/70">
            What kind of wallet would you like to restore?
          </p>

          <div className="mt-6 space-y-3">
            {wordCounts.map(renderTypeOption)}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onCancel}
              className="rounded-full bg-white/10 hover:bg-white/20 px-6 py-2 text-white mr-4 transition"
            >
              Cancel
            </button>
            <button
              onClick={goNextFromType}
              disabled={!selectedCount}
              className={`rounded-full px-6 py-2 text-white transition ${
                selectedCount
                  ? "bg-gradient-to-r from-pink-400 via-orange-300 to-fuchsia-500 hover:brightness-110"
                  : "bg-white/10 opacity-50 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === "mnemonic" && (
        <div>
          <div className="flex items-center justify-between">
            <button
              onClick={goBackToType}
              className="h-10 w-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/90 transition"
            >
              ‹
            </button>

            <div className="text-center w-full -ml-10">
              <h4 className="text-lg font-semibold text-white">
                Mnemonic phrase
              </h4>
              <p className="mt-2 text-white/70">
                Enter or paste your saved seed phrase
              </p>
            </div>

            <div style={{ width: 40 }} />
          </div>

          <div className="mt-6">{renderMnemonicGrid()}</div>
        </div>
      )}
    </div>
  );
}
