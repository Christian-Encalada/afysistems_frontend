declare module 'react-world-flags' {
    import React from 'react';
  
    interface FlagProps extends React.HTMLAttributes<HTMLImageElement> {
      code: string; // Código del país (ISO 3166-1 alpha-2)
      style?: React.CSSProperties;
      className?: string;
    }
  
    const Flag: React.FC<FlagProps>;
    export default Flag;
  }
  