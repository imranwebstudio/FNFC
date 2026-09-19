"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import { Input, Label } from "~/components/ui";

type ComboboxProps = {
  id?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  required?: boolean;
  /** Shown under the field when value is typed and not in the list */
  allowCustomHint?: string;
};

export function Combobox({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
  required,
  allowCustomHint = "Not in the list? Type your own.",
}: ComboboxProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const listId = `${inputId}-list`;
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);

  const filtered = useMemo(() => {
    const q = value.trim().toLowerCase();
    const unique = Array.from(new Set(options.map((o) => o.trim()).filter(Boolean)));
    if (!q) return unique.slice(0, 12);
    return unique
      .filter((o) => o.toLowerCase().includes(q))
      .slice(0, 12);
  }, [options, value]);

  const exactMatch = options.some(
    (o) => o.trim().toLowerCase() === value.trim().toLowerCase(),
  );

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function selectOption(opt: string) {
    onChange(opt);
    setOpen(false);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(true);
      return;
    }
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, Math.max(filtered.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter" && filtered[highlight]) {
      e.preventDefault();
      selectOption(filtered[highlight]!);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <Label htmlFor={inputId}>{label}</Label>
      <Input
        id={inputId}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        autoComplete="off"
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
          setHighlight(0);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
      />
      {open && filtered.length > 0 ? (
        <ul
          id={listId}
          role="listbox"
          className="surface-card absolute z-20 mt-1.5 max-h-48 w-full overflow-auto rounded-2xl py-1.5"
        >
          {filtered.map((opt, i) => (
            <li key={opt} role="option" aria-selected={i === highlight}>
              <button
                type="button"
                className={`w-full px-3 py-2 text-left text-sm ${
                  i === highlight ? "bg-leaf/15 text-leaf-deep" : "hover:bg-sand/60"
                }`}
                onMouseEnter={() => setHighlight(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => selectOption(opt)}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {value.trim() && !exactMatch ? (
        <p className="mt-1 text-xs text-ink-muted">{allowCustomHint}</p>
      ) : null}
    </div>
  );
}

export type SearchSelectOption = {
  value: string;
  label: string;
  /** Extra text matched by search (email, employee id, etc.) */
  keywords?: string;
};

/** Searchable select — value is a stable id; UI filters by label/keywords. */
export function SearchSelect({
  id,
  label,
  value,
  onChange,
  options,
  placeholder = "Search…",
  required,
  emptyText = "No matches",
}: {
  id?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SearchSelectOption[];
  placeholder?: string;
  required?: boolean;
  emptyText?: string;
}) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const listId = `${inputId}-list`;
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);

  const selected = options.find((o) => o.value === value);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options.slice(0, 40);
    return options
      .filter((o) => {
        const hay = `${o.label} ${o.keywords ?? ""}`.toLowerCase();
        return hay.includes(q);
      })
      .slice(0, 40);
  }, [options, query]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Clear stale selection when options change (e.g. office switch)
  useEffect(() => {
    if (value && !options.some((o) => o.value === value)) {
      onChange("");
    }
  }, [options, value, onChange]);

  function selectOption(opt: SearchSelectOption) {
    onChange(opt.value);
    setQuery("");
    setOpen(false);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(true);
      return;
    }
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, Math.max(filtered.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter" && filtered[highlight]) {
      e.preventDefault();
      selectOption(filtered[highlight]!);
    } else if (e.key === "Escape") {
      setOpen(false);
      setQuery("");
    } else if (e.key === "Backspace" && !query && value) {
      onChange("");
    }
  }

  const shown = open ? query : (selected?.label ?? "");

  return (
    <div ref={rootRef} className="relative">
      <Label htmlFor={inputId}>{label}</Label>
      {/* Hidden input so HTML required works on form submit */}
      {required ? (
        <input
          tabIndex={-1}
          aria-hidden
          className="sr-only"
          value={value}
          onChange={() => undefined}
          required
        />
      ) : null}
      <Input
        id={inputId}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        autoComplete="off"
        placeholder={selected && !open ? selected.label : placeholder}
        value={shown}
        onChange={(e) => {
          const next = e.target.value;
          setQuery(next);
          setOpen(true);
          setHighlight(0);
          if (value) onChange("");
        }}
        onFocus={() => {
          setOpen(true);
          setQuery("");
          setHighlight(0);
        }}
        onKeyDown={onKeyDown}
      />
      {open ? (
        <ul
          id={listId}
          role="listbox"
          className="surface-card absolute z-20 mt-1.5 max-h-56 w-full overflow-auto rounded-2xl py-1.5"
        >
          {filtered.length === 0 ? (
            <li className="px-3 py-2 text-sm text-ink-muted">{emptyText}</li>
          ) : (
            filtered.map((opt, i) => (
              <li key={opt.value} role="option" aria-selected={i === highlight}>
                <button
                  type="button"
                  className={`w-full px-3 py-2 text-left text-sm ${
                    i === highlight || opt.value === value
                      ? "bg-leaf/15 text-leaf-deep"
                      : "hover:bg-sand/60"
                  }`}
                  onMouseEnter={() => setHighlight(i)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => selectOption(opt)}
                >
                  <span className="block font-medium">{opt.label}</span>
                  {opt.keywords ? (
                    <span className="block text-[11px] text-ink-muted">
                      {opt.keywords}
                    </span>
                  ) : null}
                </button>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
}
