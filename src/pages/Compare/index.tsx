import React from "react";
import "./Compare.css";
import { Tag } from "antd";
import CodeHighlighter from "@components/CodeHighlighter";
import data from "../../data/compareData";
function Compare() {
  return (
    <div>
      <h1>React 와 Vue</h1>
      {data.map((v, i) => (
        <div key={`code_${i}`} className="compare_box">
          <h2># {v.title}</h2>
          <div className="code_compare">
            <div className="code_container">
              <h3>
                <Tag color="blue">react</Tag>
              </h3>
              <div className="text_box">
                {v.react_content.map((react_con, i) => (
                  <p key={`text_${i}`}>{react_con.content}</p>
                ))}
              </div>
              {v.react_code.map((code, i) => (
                <CodeHighlighter
                  key={`react${i}`}
                  type={code.type}
                  content={code.content}
                />
              ))}
            </div>
            <div className="code_container">
              <h3>
                <Tag color="cyan">vue</Tag>
              </h3>
              <div className="text_box">
                {v.vue_content.map((vue_con, i) => (
                  <p key={`vue_con_${i}`}>{vue_con.content}</p>
                ))}
              </div>
              {v.vue_code.map((code, i) => (
                <CodeHighlighter
                  key={`vue${i}`}
                  type={code.type}
                  content={code.content}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Compare;
