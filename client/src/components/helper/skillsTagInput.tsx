'use client';

import { useAppSelector } from '@/redux/hooks';
import { Plus, X } from 'lucide-react';
import { useState, useRef, useMemo } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface SkillsInputProps {
  value: string[];
  onChange: (skills: string[]) => void;
}

export const SkillsInput: React.FC<SkillsInputProps> = ({
  value,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  /** ----------------------------------------
   * Normalize helper (single source of truth)
   * ---------------------------------------- */
  const normalize = (v: string) => v.trim().toLowerCase();

  /** ----------------------------------------
   * Get existing tags from redux
   * ---------------------------------------- */
  const existingTags = useAppSelector((state) => {
    const set = new Set<string>();

    Object.values(state.proTags).forEach((container: any) => {
      if (!Array.isArray(container)) return;

      container.forEach((tag: any) => {
        const label =
          typeof tag?.label === 'string' ? tag.label.trim() : '';
        if (label) set.add(label);
      });
    });

    return Array.from(set);
  });

  /** ----------------------------------------
   * Suggestions (memoized)
   * ---------------------------------------- */
  const suggestions = useMemo(() => {
    if (!inputValue.trim()) return [];

    const selectedNormalized = new Set(value.map(normalize));

    return existingTags
      .filter(
        (tag) =>
          normalize(tag).includes(normalize(inputValue)) &&
          !selectedNormalized.has(normalize(tag))
      )
      .slice(0, 5);
  }, [existingTags, inputValue, value]);

  /** ----------------------------------------
   * Add skill (deduped + trimmed)
   * ---------------------------------------- */
  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed) return;

    const normalizedSet = new Set(value.map(normalize));
    if (normalizedSet.has(normalize(trimmed))) return;

    onChange([...value, trimmed]);
    setInputValue('');
    setShowSuggestions(false);
  };

  /** ----------------------------------------
   * Remove skill
   * ---------------------------------------- */
  const removeSkill = (skillToRemove: string) => {
    onChange(value.filter((skill) => skill !== skillToRemove));
  };

  /** ----------------------------------------
   * Keyboard handling
   * ---------------------------------------- */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(inputValue);
    }

    if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      removeSkill(value[value.length - 1]);
    }
  };

  const handleInputBlur = () => {
    if (inputValue.trim()) {
      addSkill(inputValue);
      return;
    }
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <div className="space-y-3">
      {/* Selected skills */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((skill) => (
            <div
              key={skill}
              className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input + Add */}
      <div className="relative">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            onBlur={handleInputBlur}
            placeholder={
              value.length === 0
                ? 'Add skills (React, TypeScript, etc.)'
                : 'Add another skill...'
            }
            className="shadow-none rounded-sm border focus-visible:ring-0"
          />

          <Button
            type="button" // ✅ CRITICAL
            onClick={() => addSkill(inputValue)}
            disabled={!inputValue.trim()}
            className="bg-[#03624C] text-white rounded-sm hover:bg-[#03624C]/90 disabled:bg-gray-400"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>

        {/* Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
            {suggestions.map((suggestion) => (
              <Button
                key={suggestion}
                type="button" // ✅ CRITICAL
                onMouseDown={(e) => e.preventDefault()} // prevent blur
                onClick={() => addSkill(suggestion)}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 border-b last:border-b-0"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Quick suggestions */}
      {inputValue === '' && (
        <div className="flex flex-wrap gap-2">
          {['React', 'JavaScript', 'TypeScript', 'Node.js', 'Python'].map(
            (skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => addSkill(skill)}
                disabled={value.includes(skill)}
                className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                  value.includes(skill)
                    ? 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {skill} +
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};