import imageCompression from 'browser-image-compression';
import type { ImagePath } from '~/types/plan';

export const useImageUpload = () => {
  const supabase = useSupabaseClient();

  const compressAndUpload = async (files: File[]): Promise<ImagePath[]> => {
    if (!files || files.length === 0) return [];
    if (files.length > 3) throw new Error('Máximo 3 imágenes por plan');

    const timestamp = Date.now();
    const uploadedPaths: ImagePath[] = [];

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: 'image/webp' as const,
    };

    for (let i = 0; i < files.length; i++) {
      const compressedFile = await imageCompression(files[i], options);
      const fileName = `temp/${timestamp}-${i + 1}.webp`;

      const { error } = await supabase.storage
        .from('plan-images')
        .upload(fileName, compressedFile, {
          contentType: 'image/webp',
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;

      uploadedPaths.push({ storage_path: fileName, position: i + 1 });
    }

    return uploadedPaths;
  };

  const deletePlanImages = async (paths: ImagePath[]): Promise<void> => {
    if (!paths || paths.length === 0) return;
    const filePaths = paths.map((p) => p.storage_path);
    await supabase.storage.from('plan-images').remove(filePaths);
  };

  return { compressAndUpload, deletePlanImages };
};
