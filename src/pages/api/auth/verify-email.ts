import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const accessToken = url.searchParams.get('token');

  if (!accessToken) {
    return new Response('Invalid token', { status: 400 });
  }

  const { error } = await supabase.auth.setSession({
    access_token: accessToken,
   // refresh_token: 'your_refresh_token_here', // Replace with actual refresh token if necessary
  });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return new Response(null, { status: 303, headers: { Location: '/auth/signin' } });
};
