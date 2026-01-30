/**
 * Загружает изображение на сервер
 * @param file - Файл изображения
 * @param folder - Папка для сохранения (например, 'categories')
 * @returns URL загруженного изображения
 */
export async function uploadImage(
  file: File,
  folder: string = "categories"
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const uploadUrl =
    process.env.NEXT_PUBLIC_UPLOAD_URL ||
    "http://localhost:3000/upload/image";
  const url = `${uploadUrl}?folder=${folder}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      // JWT токен автоматически отправляется в cookies
    },
    body: formData,
    credentials: "include", // Важно для отправки cookies
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Ошибка загрузки изображения: ${response.status} ${errorText}`
    );
  }

  const data = await response.json();
  return data.url; // Возвращает URL загруженного файла
}
