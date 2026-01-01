import imageCompression from 'browser-image-compression';

export const useImageUpload = () => {
  const supabase = useSupabaseClient();

  const uploadEventImages = async (files, eventId) => {
    if (!files || files.length === 0) return [];
    if (files.length > 3) throw new Error('Máximo 3 imágenes por evento');

    const uploadedImages = [];
    const timestamp = Date.now();

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: 'image/webp',
    };

    for (let i = 0; i < files.length; i++) {
      const compressedFile = await imageCompression(files[i], options);

      // TODO: Use temp folder for unauthenticated users only
      const fileName = `temp/${eventId}-${i + 1}-${timestamp}.webp`;

      const { data, error } = await supabase.storage
        .from('event-images')
        .upload(fileName, compressedFile, {
          contentType: 'image/webp',
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        throw error;
      }
      const { data: insertData, error: dbError } = await supabase
        .from('event_images')
        .insert({
          event_id: eventId,
          storage_path: fileName,
          position: i + 1,
        })
        .select();

      if (dbError) {
        throw dbError;
      }

      uploadedImages.push({
        storage_path: fileName,
        position: i + 1,
      });
    }

    return uploadedImages;
  };

  return { uploadEventImages };
};
