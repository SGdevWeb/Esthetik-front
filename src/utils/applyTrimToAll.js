import * as Yup from "yup";

export const applyTrimToAllStrings = (schema) => {
  const fields = schema.fields;
  Object.keys(fields).forEach((fieldName) => {
    if (fields[fieldName] instanceof Yup.string) {
      fields[fieldName] = fields[fieldName].transform((value) =>
        value ? value.trim() : value
      );
    }
  });
  return schema;
};
