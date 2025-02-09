interface CommentExpression {
  style: "single-line" | "multi-line";
  content: string;
}

function Typescript(coli: CommentExpression) {
  const { style, content } = coli;
  let code = "";

  if (style === "single-line") {
    code += `// ${content}`;
  } else {
    code += "/**\n";
    content.split("\n").map((cmt) => (code += `* ${cmt}\n`));
    code += "*/";
  }

  return code;
}

function Python(coli: CommentExpression) {
  const { style, content } = coli;
  let code = "";

  if (style === "single-line") {
    code += `# ${content}`;
  } else {
    code += "'''\n";
    content.split("\n").map((cmt) => (code += `${cmt}\n`));
    code += "'''";
  }

  return code;
}

function Dart(coli: CommentExpression) {
  const { style, content } = coli;
  let code = "";

  if (style === "single-line") {
    code += `// ${content}`;
  } else {
    code += "/*\n";
    content.split("\n").map((cmt) => (code += `${cmt}\n`));
    code += "*/";
  }

  return code;
}

export const StringfyComment = {
  Typescript,
  Python,
  Dart,
};
