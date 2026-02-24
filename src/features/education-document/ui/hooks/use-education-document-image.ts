import { useState, useMemo } from "react";
import { uploadImage } from "@/shared/lib/upload";

interface UseEducationDocumentImageOptions {
  initialImage?: string | null;
  editingImage?: string | null;
}

export function useEducationDocumentImage({
  initialImage,
  editingImage,
}: UseEducationDocumentImageOptions = {}) {
  const [userSelectedPreview, setUserSelectedPreview] = useState<
    string | null
  >(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const imagePreview = useMemo(() => {
    return userSelectedPreview || initialImage || null;
  }, [userSelectedPreview, initialImage]);

  const imageChanged = useMemo(
    () => !!userSelectedPreview,
    [userSelectedPreview]
  );

  const handleImageFile = (file: File | null) => {
    if (!file) {
      if (!editingImage) setUserSelectedPreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserSelectedPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const uploadImageFile = async (
    file: File | null
  ): Promise<string | undefined> => {
    if (!file || !imageChanged) {
      return editingImage || undefined;
    }
    try {
      setUploadingImage(true);
      const imageUrl = await uploadImage(file, "education-documents");
      setUploadingImage(false);
      return imageUrl;
    } catch (error) {
      setUploadingImage(false);
      throw error;
    }
  };

  const resetImageState = () => setUserSelectedPreview(null);

  return {
    imagePreview,
    uploadingImage,
    imageChanged,
    handleImageFile,
    uploadImageFile,
    resetImageState,
  };
}
