'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addTag, removeTag, clearTags } from '@/redux/slice/tagSlice';

export interface Tag {
  id: string;
  label: string;
  color?: string;
}

interface TagsFilterSelectProps {
  tags: Tag[];
  placeholder?: string;
  className?: string;
  selectedTagsContainerId?: string; // ID to identify where to show selected tags
  selectedTags?: Tag[];
  onChange?: (tags: Tag[]) => void;
}

export function TagsFilterSelect({
  tags,
  placeholder = 'Select tags...',
  className,
  selectedTagsContainerId = 'default-tags-container',
  selectedTags: externalSelectedTags,
  onChange: externalOnChange,
}: TagsFilterSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  const dispatch = useAppDispatch();
  const reduxSelectedTags = useAppSelector(
    (state: any) => state.tags?.[selectedTagsContainerId] || []
  );
  const selectedTags = externalSelectedTags || reduxSelectedTags;

  const filteredTags = tags.filter((tag) =>
    tag.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleTagSelect = (tag: Tag) => {
    const isSelected = selectedTags.some(
      (selected: { id: string }) => selected.id === tag.id
    );

    if (externalOnChange) {
      // Use external onChange if provided
      if (isSelected) {
        externalOnChange(selectedTags.filter((t: Tag) => t.id !== tag.id));
      } else {
        externalOnChange([...selectedTags, tag]);
      }
    } else {
      if (isSelected) {
        dispatch(
          removeTag({ containerId: selectedTagsContainerId, tagId: tag.id })
        );
      } else {
        dispatch(addTag({ containerId: selectedTagsContainerId, tag }));
      }
    }
  };

  const handleTagRemove = (tagId: string) => {
    if (externalOnChange) {
      // Use external onChange if provided
      externalOnChange(selectedTags.filter((t: Tag) => t.id !== tagId));
    } else {
      // Use Redux if no external onChange is provided
      dispatch(removeTag({ containerId: selectedTagsContainerId, tagId }));
    }
  };

  return (
    <div className={cn('w-2xl', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between rounded-sm shadow-none border border-gray-300 h-10 px-3 bg-transparent"
          >
            <span className="text-muted-foreground">
              {selectedTags.length === 0
                ? placeholder
                : `${selectedTags.length} tag${selectedTags.length === 1 ? '' : 's'} selected`}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-w-sm p-0" align="start">
          <Command>
            <CommandList>
              <CommandEmpty>No tags found.</CommandEmpty>
              <CommandGroup>
                {filteredTags.map((tag) => {
                  const isSelected = selectedTags.some(
                    (selected: { id: string }) => selected.id === tag.id
                  );
                  return (
                    <CommandItem
                      key={tag.id}
                      value={tag.label}
                      onSelect={() => handleTagSelect(tag)}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          isSelected ? 'opacity-100' : 'opacity-0'
                        )}
                      />

                      {tag.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
