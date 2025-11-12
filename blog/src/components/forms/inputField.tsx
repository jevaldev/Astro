import { useFormContext, type RegisterOptions } from "react-hook-form";

type InputProps = {
  label: string;
  name: string;
  type: "text" | "email" | "password";
  registerOptions: RegisterOptions;
};

export const InputField = ({
  label,
  name,
  type,
  registerOptions,
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col w-full gap-2">
      <label className="font-bold text-lg text-secondary" htmlFor={name}>
        {label}
      </label>
      <input
        className="py-2 px-3 bg-primary-500/50 rounded"
        aria-invalid={errors[name] ? "true" : "false"}
        type={type}
        {...register(name, registerOptions)}
      />
      <div className="min-h-5">
        {errors[name] && (
          <p role="alert" className="text-red-400 text-sm">
            {errors[name]?.message as string}
          </p>
        )}
      </div>
    </div>
  );
};
