import React from 'react';
import {
  TableBody,
  TableCell,
  TableRow,
} from '@/[lng]/components/ui/tableClient';

export default function SkeletonTable({ rows = 5, columns = 5 }) {
  return (
    <TableBody>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <TableCell key={colIndex}>
              <div className='h-6 rounded bg-gray-200 dark:bg-gray-700'></div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
