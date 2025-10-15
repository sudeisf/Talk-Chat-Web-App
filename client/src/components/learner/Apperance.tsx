'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Palette, Sun, Moon, Monitor, Text } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const themeOptions = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
];

const fontSizeOptions = [
  { value: 'small', label: 'Small', icon: Text },
  { value: 'medium', label: 'Medium', icon: Text },
  { value: 'large', label: 'Large', icon: Text },
];

export default function AppearanceSettings() {
  const [theme, setTheme] = useState('system');
  const [fontSize, setFontSize] = useState('medium');

  return (
    <Card className="shadow-none border-b border-x-0 border-t-0 rounded-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-purple-600" />
          Appearance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Theme Selection */}
        <div className="space-y-3">
          <Label>Theme</Label>
          <div className="grid grid-cols-3 gap-3">
            {themeOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.value}
                  onClick={() => setTheme(option.value)}
                  className={cn(
                    'flex flex-col items-center justify-center p-4 border rounded-lg transition hover:shadow-md',
                    theme === option.value
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200'
                  )}
                >
                  <Icon className="h-6 w-6 mb-2 text-gray-700" />
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Font Size Selection */}
        <div className="space-y-3">
          <Label>Font Size</Label>
          <div className="grid grid-cols-3 gap-3">
            {fontSizeOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.value}
                  onClick={() => setFontSize(option.value)}
                  className={cn(
                    'flex flex-col items-center justify-center p-4 border rounded-lg transition hover:shadow-md',
                    fontSize === option.value
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200'
                  )}
                >
                  <Icon className="h-6 w-6 mb-2 text-gray-700" />
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
