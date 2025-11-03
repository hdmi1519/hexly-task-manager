import path from "path";

const outDir = "./src/assets/icons";

const iconTemplate = (variables, { tpl }) => {
  return tpl`
import * as React from "react";
import type { SVGProps } from "react";

const ${variables.componentName} = (props: SVGProps<SVGSVGElement>) => (
  ${variables.jsx}
);

export default ${variables.componentName};
`;
};

const config = {
  outDir,
  icon: true,
  typescript: true,
  replaceAttrValues: {
    "#000": "currentColor",
    "#000000": "currentColor",
  },
  indexTemplate: (files) => {
    const compoundExportEntries = [];
    const importEntries = files.map((file) => {
      const componentName = path.basename(file.path, path.extname(file.path));
      compoundExportEntries.push(componentName);
      return `import ${componentName} from './${componentName}';`;
    });

    return `
${importEntries.join("\n")}

export const Icons = {
  ${compoundExportEntries.join(",\n  ")}
};

export {
  ${compoundExportEntries.join(",\n  ")}
};
`;
  },
  template: iconTemplate,
  svgoConfig: {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            removeViewBox: false,
            removeUnknownsAndDefaults: false,
          },
        },
      },
      {
        name: "removeAttrs",
        params: {
          attrs: "(data-original|style|data.*)",
        },
      },
    ],
  },
};

export default config;
