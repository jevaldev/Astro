import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { supabase } from "../../lib/supabaseClient";
import { InputField } from "../forms/inputField";

import { validEmail, type adminLoginData } from "@utils/formTypes.ts";

export default function Login() {
  const methods = useForm();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (formData: adminLoginData) => {
    console.log(formData);
    const { email, password } = formData;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    setError("Login successful");
    console.log("Excelente loggin :)", data);
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center bg-primary-700/50 p-6 w-[420px] rounded-xl gap-4"
        >
          <InputField
            label="E-Mail:"
            name="email"
            type="email"
            registerOptions={validEmail}
          />
          <InputField
            label="Password:"
            name="password"
            type="password"
            registerOptions={{ required: "Password is required" }}
          />
          <button type="submit">Login</button>
          {isSubmitting && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-10">
              <div className="w-12 h-12 border-4 border-t-transparent border-accent rounded-full animate-spin"></div>
            </div>
          )}
        </form>
        <div className="min-h-5 flex justify-center mt-5">
          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>
      </FormProvider>
    </div>
  );
}
