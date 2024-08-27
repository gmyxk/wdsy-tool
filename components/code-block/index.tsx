'use client';

import React from 'react';

import hljs from 'highlight.js/lib/core';

import lua from 'highlight.js/lib/languages/lua';
// import java from "highlight.js/lib/languages/java";
// import csharp from "highlight.js/lib/languages/csharp";
// import php from "highlight.js/lib/languages/php";
// import python from "highlight.js/lib/languages/python";
// import objectivec from "highlight.js/lib/languages/objectivec";
// import bash from "highlight.js/lib/languages/bash";

// import "highlight.js/styles/default.css";
import { cn } from '@/utils';
import 'highlight.js/styles/atom-one-dark.css';
import 'highlight.js/styles/github.css';

hljs.registerLanguage('java', lua);
// hljs.registerLanguage("java", java);
// hljs.registerLanguage("csharp", csharp);
// hljs.registerLanguage("php", php);
// hljs.registerLanguage("python", python);
// hljs.registerLanguage("objectivec", objectivec);
// hljs.registerLanguage("bash", bash);

interface CodeBlockProps {
  language?: string;
  code: string;
  className?: string;
  classNames?: {
    pre?: string;
  };
  size?: 'sm' | 'md' | 'lg';
}

export default function CodeBlock(props: CodeBlockProps) {
  const { language = 'txt', code, className, classNames } = props;
  const preRef = React.useRef(null);

  const loaded = React.useRef(false);

  React.useEffect(() => {
    if (preRef.current && !loaded.current) {
      hljs.highlightBlock(preRef.current);
      loaded.current = true;
    }
  }, []);

  return (
    <div className={cn('relative mt-2', className)}>
      <pre
        className={cn(classNames?.pre, {
          'text-xs': props.size === 'sm',
        })}
      >
        <code ref={preRef} className={language}>
          {code}
        </code>
      </pre>
    </div>
  );
}
