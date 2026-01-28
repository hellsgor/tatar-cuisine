export const resolveOptionLabel = <
  T extends readonly { value: string; label: string }[],
>(
  value: string,
  Options: T,
) => {
  const option = Options.find((opt) => opt.value === value);
  return option ? option.label : value;
};
