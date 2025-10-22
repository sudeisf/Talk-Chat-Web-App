'use client';

import { useAppSelector } from '@/redux/hooks';
import { Plus, X } from 'lucide-react';
import { useState, useRef } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface SkillsInputProps {
  value: String[];
  onChange: (skills: String[]) => void;
}

export const SkillsInput: React.FC<SkillsInputProps> = ({
  value,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const existingTags = useAppSelector((state) => {
    const allTags = new Set<string>();
    Object.values(state.proTags).forEach((container: any) => {
      container.forEach((tag: any) => {
        allTags.add(tag.label);
      });
    });
    return Array.from(allTags);
  });

  const suggestions = existingTags
    .filter(
      (tag) =>
        tag.toLowerCase().includes(inputValue.toLowerCase()) &&
        !value.includes(tag)
    )
    .slice(0, 5);

  const addSkill = (skill: string) => {
    const trimvalue = skill.trim();
    if (trimvalue && !value.includes(trimvalue)) {
      onChange([...value, trimvalue]);
    }
    setInputValue('');
    setShowSuggestions(false);
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(value.filter((skill) => skill !== skillToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue.trim()) {
        addSkill(inputValue);
      }
    }
    if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      const lastSkill = value[value.length - 1];
      removeSkill(lastSkill as string);
    }
  };

  return (
    <div className="space-y-3">
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((skill, index) => (
            <div
              key={`${skill}-${index}`}
              className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => removeSkill(skill as string)}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="relative">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder={
              value.length === 0
                ? 'Add skills (React, TypeScript, etc.)'
                : 'Add another skill...'
            }
            className="shadow-none rounded-sm border focus-visible:ring-0 right-0"
          />
          <Button
            type="button"
            onClick={() => inputValue.trim() && addSkill(inputValue)}
            disabled={!inputValue.trim()}
            className=" bg-[#03624C] text-white rounded-sm shadow-2xs hover:bg-[#03624C]/90 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
            {suggestions.map((suggestion) => (
              <Button
                key={suggestion}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => addSkill(suggestion)}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        )}
      </div>

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
