import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const POST: APIRoute = async ({ request, cookies }) => {
  const formData = await request.formData();
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    return new Response('Email and password are required', { status: 400 });
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  cookies.set('sb-access-token', data.session.access_token, { path: '/' });
  cookies.set('sb-refresh-token', data.session.refresh_token, { path: '/' });

  return new Response(null, { status: 303, headers: { Location: '/dashboard' } });
};
