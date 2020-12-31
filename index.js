/**
 * @fileoverview Rule to enforce certain return type of Service in services/functions.
 * @author Ashish Kafle
 */
"use strict";

const createServiceRule = (context) => {
  return {
    "ExportDefaultDeclaration  ReturnStatement": function (node) {
      if (!node.argument) report(context, node);
      else if (node.argument) {
        if (node.argument.type !== "ObjectExpression") report(context, node);

        const keys = node.argument.properties.map((e) => {
          return { key: e.key.name, value: e.value.type, raw: e.value.value };
        });
        if (keys.length !== 2) report(context, node);

        const status = keys.find((e) => e.key === "status");
        if (!status) report(context, node);
        else if (typeof status.raw !== "number") report(context, node);

        const payload = keys.find((e) => e.key === "payload");
        if (!payload) report(context, node);
        else if (payload.value !== "ObjectExpression") report(context, node);
      }
    },
  };
};

const report = (context, node) =>
  context.report({
    node: node,
    message:
      "Unexpected identifier. Return type must be '{status:number, payload:object}'",
    data: {
      identifier: node.name,
    },
  });

const meta = {
  type: "problem",
  docs: {
    description: "expect service return type",
    category: "Errors",
    recommended: true,
    //url: "https://eslint.org/docs/rules/no-extra-semi"
  },
  //fixable: "code",
  //schema: [] // no options
};

module.exports = {
  "service-rule": {
    meta: meta,
    create: createServiceRule,
  },
};
