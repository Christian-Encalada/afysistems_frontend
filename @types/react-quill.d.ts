declare module 'react-quill' {
  import React from 'react';

  interface ReactQuillProps {
    value: string;
    onChange: (content: string) => void;
    theme?: string;
    modules?: object;
    formats?: string[];
    bounds?: string | HTMLElement;
    placeholder?: string;
    readOnly?: boolean;
    scrollingContainer?: string | HTMLElement;
    preserveWhitespace?: boolean;
    className?: string;
  }

  const ReactQuill: React.FC<ReactQuillProps>;
  export default ReactQuill;
}
