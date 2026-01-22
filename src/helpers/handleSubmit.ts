export async function handleSubmit(
  e: React.FormEvent,
  callback?: () => void,
  onSubmitCallback?: () => void,
) {
  if (!callback && !onSubmitCallback) return;

  e.preventDefault();

  if (onSubmitCallback) onSubmitCallback();
  if (callback) callback();
}
