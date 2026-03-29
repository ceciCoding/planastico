import { serverSupabaseClient } from '#supabase/server';
import type { ImagePath, PlanForm } from '~/types/plan';

interface CreatePlanBody {
  plan: Omit<PlanForm, 'image_urls' | 'categories'>;
  categories: number[];
  imagePaths: ImagePath[];
  captchaToken: string;
}

interface TurnstileResponse {
  success: boolean;
  'error-codes': string[];
}

async function verifyCaptcha(token: string): Promise<void> {
  const { turnstile } = useRuntimeConfig();

  const result = await $fetch<TurnstileResponse>(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      body: `secret=${encodeURIComponent(turnstile.secretKey)}&response=${encodeURIComponent(token)}`,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    }
  );

  if (!result.success) {
    throw createError({ statusCode: 400, message: 'Captcha inválido. Inténtalo de nuevo.' });
  }
}

export default defineEventHandler(async (event) => {
  const { plan, categories, imagePaths, captchaToken } =
    await readBody<CreatePlanBody>(event);

  await verifyCaptcha(captchaToken);

  const supabase = await serverSupabaseClient(event);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const validationCode = !user
    ? crypto.randomInt(100000, 1000000).toString()
    : null;

  const planPayload = {
    ...plan,
    validation_code: validationCode,
    user_id: user?.id ?? null,
    validated: true,
    email_verified: !!user,
  };

  const { data, error } = await supabase.rpc('create_plan_with_images', {
    plan_data: planPayload as any,
    category_ids: categories as any,
    image_paths: imagePaths as any,
  });

  if (error) {
    throw createError({ statusCode: 500, message: 'Error al crear el plan. Inténtalo de nuevo.' });
  }

  return { data };
});
