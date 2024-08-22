import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get('email')?.toString();

  if (!email) {
    return new Response('Email is required', { status: 400 });
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return new Response(null, { status: 303, headers: { Location: '/auth/password-reset-sent' } });
};
