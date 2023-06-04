import React from "react"
import ReactDOM from "react-dom/client"
import { Highlight, themes } from "prism-react-renderer"
import styles from 'styles.module.css'

const codeBlock = `
(function someDemo() {
  var test = "Hello World!";
  console.log(test);
})();
`

export const Editor = () => (
  <Highlight
    theme={themes.shadesOfPurple}
    code={codeBlock}
    language="tsx"  
  >
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre style={style}>
        {tokens.map((line, i) => (
          <div key={i} {...getLineProps({ line })}>
            {line.map((token, key) => (
              <span key={key} {...getTokenProps({ token })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
)
