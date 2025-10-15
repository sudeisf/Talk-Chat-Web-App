'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default function SearchDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        {' '}
        <Search className="h-4 w-4 text-muted-foreground" />{' '}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Search for a session or a question
        </DialogDescription>
        <Input type="text" placeholder="Search" />
        <DialogFooter>
          <Button>Search</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
