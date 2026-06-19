'use client';
import { useFormStatus } from 'react-dom';

export const SubmitButton = ({ children, className = '', pendingText, ...props }) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
      {...props}
    >
      {pending && pendingText ? pendingText : children}
    </button>
  );
};
