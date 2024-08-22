// archivo para testear la api de autenticación de supabase

import { supabase } from './supabase.js';

const supabase = createClient(supabaseUrl, supabaseKey);


async function addCustomer() {
  let { data, error } = await supabase.auth.signUp({
    password: 'some-password',
    email: 'jehaha2671@iteradev.com',

    data:{
      first_name: 'John',
      last_name: 'Doe',
      phone: '+13334445555'

    }
  })

  if (error) {
    console.error('Error inserting data:', error);
  } else {
    console.log('Data inserted successfully:', data);
  }
}

addCustomer();