import { useState, useEffect, useMemo } from "react";
import { uploadImage } from "@/shared/lib/upload";

interface UseCategoryImageOptions {
  initialImage?: string | null;
  editingCategoryImage?: string | null;
}

export function useCategoryImage({
  initialImage,
  editingCategoryImage,
}: UseCategoryImageOptions = {}) {
  const [userSelectedPreview, setUserSelectedPreview] = useState<
    string | null
  >(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Вычисляем preview: приоритет у выбранного пользователем изображения, иначе используем initialImage
  const imagePreview = useMemo(() => {
    return userSelectedPreview || initialImage || null;
  }, [userSelectedPreview, initialImage]);

  // Вычисляем imageChanged: true если пользователь выбрал новое изображение
  const imageChanged = useMemo(() => {
    return !!userSelectedPreview;
  }, [userSelectedPreview]);

  // Сбрасываем userSelectedPreview при изменении initialImage (когда редактируем другую категорию)
  useEffect(() => {
    if (initialImage && !userSelectedPreview) {
      // Если initialImage изменился, но пользователь не выбирал новое изображение,
      // ничего не делаем - userSelectedPreview уже null
    }
  }, [initialImage, userSelectedPreview]);

  // Обработка выбранного файла
  const handleImageFile = (file: File | null) => {
    if (!file) {
      if (!editingCategoryImage) {
        setUserSelectedPreview(null);
      }
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setUserSelectedPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Загрузка изображения
  const uploadImageFile = async (
    file: File | null
  ): Promise<string | undefined> => {
    if (!file || !imageChanged) {
      return editingCategoryImage || undefined;
    }

    try {
      setUploadingImage(true);
      const imageUrl = await uploadImage(file, "categories");
      setUploadingImage(false);
      return imageUrl;
    } catch (error) {
      setUploadingImage(false);
      throw error;
    }
  };

  // Сброс состояния
  const resetImageState = () => {
    setUserSelectedPreview(null);
  };

  // Установка preview (для внешнего использования)
  const setImagePreview = (preview: string | null) => {
    setUserSelectedPreview(preview);
  };

  return {
    imagePreview,
    uploadingImage,
    imageChanged,
    handleImageFile,
    uploadImageFile,
    resetImageState,
    setImagePreview,
  };
}
