import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import CodeBlock from "../code-block";
import DeclartionTitle from "../declarations/common/title";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentColiEditorOption } from "../../states/option.state";
import { stringfy, StringfyLanguage } from "../../../packages/export-string";
import { CommentExpression as CommentClass } from "coli/lib/expressions/comment";
import { currentDeclarationAtom } from "../../states/declaration.state";
import AutoGrowTextArea from "../auto-grow-textarea";
import Selector from "../selector";
import { CodePreview } from "../code-preview";

export interface CommentExpression {
  style: string;
  content: string;
}

const fields = ["line", "content"];
const lineValue = [
  {
    label: "single",
    value: "single-line",
  },
  {
    label: "multi",
    value: "multi-line",
  },
];

export default function CommentExpression(props: {
  id: number;
  data: CommentExpression;
}) {
  const { id, data } = props;
  const setExpression = useSetRecoilState(
    currentDeclarationAtom<CommentExpression>("function", id)
  );
  const editorOption = useRecoilValue(currentColiEditorOption);
  const [expressionValue, setExpressionValue] = useState<CommentExpression>({
    style: "",
    content: "",
  });

  useEffect(() => {
    setExpressionValue(data);
  }, [data]);

  useEffect(() => {
    setExpression(data);
  }, [expressionValue]);

  const onChangeExpressionValue = (v: string, n: string, k?: number) => {
    setExpressionValue((d) => {
      return {
        ...d,
        [n]: v == "" ? data[n] : v,
      };
    });
  };

  const onChangeLineValue = (v: any) => {
    setExpressionValue((d) => {
      return {
        ...d,
        style: v,
      };
    });
  };
  return (
    <Positioner>
      <Wrapper>
        <DeclartionTitle lable="COMMENT EXPRESSION" />
        <CodeBlock>
          {stringfy(new CommentClass(expressionValue), {
            language: editorOption.lauangue as StringfyLanguage,
          })}
        </CodeBlock>
        <Body>
          {Object.keys(data).map((i, idx) => (
            <div
              style={
                idx === 1
                  ? { flexDirection: "column", alignItems: "flex-start" }
                  : {}
              }
              className="coli-values"
              key={idx}
            >
              <label>{fields[idx]}</label>
              {idx == 0 ? (
                <Selector
                  onChange={onChangeLineValue}
                  value={expressionValue.style}
                  options={lineValue}
                />
              ) : (
                <AutoGrowTextArea
                  name={i}
                  onChange={onChangeExpressionValue}
                  placeholder={data[i]}
                  value={expressionValue.style}
                />
              )}
            </div>
          ))}
        </Body>
      </Wrapper>
      <CodePreview value={expressionValue} interface={CommentClass} />
    </Positioner>
  );
}

const Positioner = styled.div`
  display: flex;
  margin-top: 32px;
  padding: 17px 0px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;

  pre {
    width: 70%;
    font-size: 0.8em !important;
  }
`;

const Body = styled.div`
  margin-top: 20px;
  width: 50%;
  display: flex;
  flex-direction: column;

  .coli-values {
    margin: 10px 0px;
    display: flex;
    align-items: center;

    label {
      flex: 1;
      font-size: 14px;
      color: #959595;
    }
  }
`;
