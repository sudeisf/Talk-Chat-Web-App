"use client"


import { useAppSelector } from "@/redux/hooks";
import { useState ,useRef } from "react";


interface SkillsInputProps {
    value : String[];
    onChange :(skills :String[]) => void;
}

export const  SkillsInput : React.FC<SkillsInputProps> = ({ value , onChange}) => {
    
    const [inputValue, setInputValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const existingTags = useAppSelector(state => {

        const allTags = new Set<string>();
            Object.values(state.proTags).forEach((container: any) => {
            container.forEach((tag: any) => {
                allTags.add(tag.label);
            });
            });
            return Array.from(allTags);
      });

      const suggestions = existingTags.filter(tag =>
        tag.toLowerCase().includes(inputValue.toLowerCase()) &&
        !value.includes(tag)
      ).slice(0, 5);

      const addSkill  =(skill : string)=>{
            const trimvalue = skill.trim();
            if (trimvalue && !value.includes(trimvalue)){
                onChange([...value,trimvalue]);
            }
            setInputValue('');
            setShowSuggestions(false);  

      }

    const removeSkill = (skillToRemove: string) => {
        onChange(value.filter(skill => skill !== skillToRemove));
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

    )

}