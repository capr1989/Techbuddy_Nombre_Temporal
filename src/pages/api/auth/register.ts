import { supabase } from "../../../lib/supabase.js";
import { supabaseAdmin } from "../../../lib/supabase.js"; // Import the admin client

export const POST = async ({ request }) => {
  try {
    const formData = await request.formData();
    const firstName = formData.get("first-name");
    const lastName = formData.get("last-name");
    const email = formData.get("email");
    const phoneNumber = formData.get("phone-number");
    const password = formData.get("password");

    if (!firstName || !lastName || !email || !phoneNumber || !password) {
      return new Response("All fields are required", { status: 400 });
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          phone: phoneNumber,
        },
      }
    });

    if (authError) {
      console.error("Auth error:", authError);
      return new Response(authError.message, { status: 500 });
    }

    const userId = authData.user.id; 

    const { error: insertError } = await supabase
      .from('customers')
      .insert([
        {
          user_id: userId, 
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone_number: phoneNumber,
        }
      ])
      .select(); // Ensure the inserted data is returned (though it's not used in this case)

    if (insertError) {
      console.error("Insert error:", insertError);
      // Rollback the user creation if the insert fails
      await supabaseAdmin.auth.admin.deleteUser(userId);
      return new Response(insertError.message, { status: 500 });
    }

    // Redirect to the verification sent page after successful registration
    return new Response(null, { status: 303, headers: { Location: "/auth/verification-sent" } });

  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response("Unexpected server error", { status: 500 });
  }
};
