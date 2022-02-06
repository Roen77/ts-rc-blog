import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
function CodeHighlighter(props: any) {
  return (
    <SyntaxHighlighter language={props.type} showLineNumbers wrapLongLines wrapLines style={a11yDark}>
      {props.content}
    </SyntaxHighlighter>
  );
}

export default CodeHighlighter;
