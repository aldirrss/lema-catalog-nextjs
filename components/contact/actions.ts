'use server';

import { submitContactForm } from '@/lib/odoo';

export interface ContactFormState {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

export async function submitContact(
  prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = (formData.get('name') as string)?.trim();
  const email = (formData.get('email') as string)?.trim();
  const phone = (formData.get('phone') as string)?.trim();
  const company = (formData.get('company') as string)?.trim();
  const message = (formData.get('message') as string)?.trim();

  // Basic validation
  const errors: Record<string, string> = {};
  if (!name) errors.name = 'Name is required.';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'A valid email address is required.';
  }
  if (!message) errors.message = 'Message is required.';

  if (Object.keys(errors).length > 0) {
    return { success: false, message: 'Please fix the errors below.', errors };
  }

  try {
    const result = await submitContactForm({
      name,
      email,
      phone,
      company,
      message,
    });
    if (result.success) {
      return { success: true, message: result.message ?? 'Message sent successfully!' };
    }
    return { success: false, message: result.error ?? result.message ?? 'Something went wrong. Please try again.' };
  } catch {
    return { success: false, message: 'Unable to send message. Please try again later.' };
  }
}
