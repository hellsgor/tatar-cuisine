export async function handleSubmit(
  e: React.FormEvent,
  callback?: () => void,
  onSubmitCallback?: () => Promise<unknown>,
  onError?: (error: string) => void,
) {
  if (!callback && !onSubmitCallback) return;

  e.preventDefault();

  try {
    if (onSubmitCallback) await onSubmitCallback();
    if (callback) callback();
  } catch (error) {
    if (onError) {
      onError(error instanceof Error ? error.message : 'Произошла ошибка');
    }
  }
}
