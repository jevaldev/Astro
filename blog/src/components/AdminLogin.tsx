import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    console.log({ email, password });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (data) {
      console.log("Login perfecto", data);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col items-center justify-center bg-primary-700/50 p-6 w-7/12 rounded-xl gap-4"
    >
      <div className="flex flex-col w-full gap-2">
        <label htmlFor="" className="font-bold text-lg text-secondary">
          Email:
        </label>
        <input
          className="py-2 px-3 bg-primary-500/50 rounded"
          type="email"
          value={email}
          onChange={(e) => {
            console.log(e.target.value);
            setEmail(e.target.value);
          }}
        />
        <small className="text-stone-300">Ejemplo: juan123@gmail.com</small>
      </div>
      <div className="flex flex-col w-full gap-2">
        <label htmlFor="" className="font-bold text-lg text-secondary">
          Password:
        </label>
        <input
          className="py-2 px-3 bg-primary-500/50 rounded"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="min-h-5">
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
      <button
        className="cursor-pointer bg-primary-700 font-bold py-3 px-6 rounded "
        type="submit"
        disabled={loading}
      >
        INICIAR SESIÓN
      </button>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-10">
          <div className="w-12 h-12 border-4 border-t-transparent border-accent rounded-full animate-spin"></div>
        </div>
      )}
    </form>
  );
}
