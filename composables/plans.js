export const useEvents = () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  const generateValidationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const createEvent = async (eventData) => {
    try {
      const validationCode = !user.value ? generateValidationCode() : null;

      const eventPayload = {
        name: eventData.name,
        description: eventData.description,
        address: eventData.address || null,
        place: eventData.place,
        meeting_link: eventData.meeting_link || null,
        frequency: eventData.frequency,
        start_date: eventData.start_date,
        end_date: eventData.end_date || null,
        recurrency: eventData.recurrency || null,
        start_time: eventData.start_time || null,
        end_time: eventData.end_time || null,
        cost: eventData.cost,
        price: eventData.price || null,
        contact_email: eventData.contact_email || null,
        validation_email: eventData.validation_email || null,
        // TODO: eliminar de la BD
        validation_code: validationCode,
        user_id: user.value?.id || null,
        validated: true,
        email_verified: user.value ? true : false,
      };

      const { data: event, error: eventError } = await supabase
        .from('events')
        .insert(eventPayload)
        .select()
        .single();

      if (eventError) throw eventError;

      const categoryInserts = eventData.categories.map((categoryId) => ({
        event_id: event.id,
        category_id: categoryId,
      }));

      const { error: categoriesError } = await supabase
        .from('event_categories')
        .insert(categoryInserts);

      if (categoriesError) throw categoriesError;

      return {
        data: event,
        error: null,
      };
    } catch (error) {
      console.error('Error al crear evento:', error);
      return { data: null, error: error.message };
    }
  };

  const getCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      return { data: null, error: error.message };
    }
  };

  const getEventById = async (eventId) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select(
          `
          *,
          event_categories (
            category_id,
            categories (
              id,
              name,
              slug
            )
          )
        `
        )
        .eq('id', eventId)
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Error al obtener evento:', error);
      return { data: null, error: error.message };
    }
  };

  const getEvents = async (filters = {}) => {
    try {
      let query = supabase
        .from('events')
        .select(
          `
          *,
          event_categories (
            category_id,
            categories (
              id,
              name,
              slug
            )
          )
        `
        )
        .eq('validated', true)
        .order('start_date', { ascending: true });

      if (filters.startDate) {
        query = query.gte('start_date', filters.startDate);
      }

      if (filters.endDate) {
        query = query.lte('start_date', filters.endDate);
      }

      const { data, error } = await query;

      if (error) throw error;

      let filteredData = data;
      if (filters.categories && filters.categories.length > 0) {
        filteredData = data?.filter((event) =>
          event.event_categories.some((ec) =>
            filters.categories?.includes(ec.category_id)
          )
        );
      }

      return { data: filteredData, error: null };
    } catch (error) {
      console.error('Error al obtener eventos:', error);
      return { data: null, error: error.message };
    }
  };

  const updateEventImages = async (eventId, imageUrls) => {
    try {
      const { error } = await supabase
        .from('events')
        .update({
          image_urls: imageUrls,
        })
        .eq('id', eventId);

      if (error) throw error;

      return { data: true, error: null };
    } catch (error) {
      console.error('Error al actualizar imágenes:', error);
      return { data: null, error: error.message };
    }
  };

  return {
    createEvent,
    getCategories,
    getEventById,
    getEvents,
    updateEventImages,
  };
};
