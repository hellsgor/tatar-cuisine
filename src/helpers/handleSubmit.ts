export async function handleSubmit(
  e: React.FormEvent,
  callback?: () => void,
  onSubmitCallback?: () => Promise<unknown>,
) {
  if (!callback && !onSubmitCallback) return;

  e.preventDefault();

  onSubmitCallback ? await onSubmitCallback() : null;
  if (callback) callback();
}
