export async function handleSubmit<T>(
  e: React.FormEvent,
  formData: T,
  callback: () => void,
) {
  e.preventDefault();
  console.log('Form submitted', formData);

  callback();
}
