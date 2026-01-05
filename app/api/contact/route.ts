import { createClient } from "@sanity/client";
import { NextResponse } from "next/server";
import { Resend } from "resend";

// Sanity client with write permissions
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2025-01-05",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

// Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Save to Sanity
    const sanityDoc = await sanityClient.create({
      _type: "contact",
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
      read: false,
    });

    // Send email notification
    const contactEmail = process.env.CONTACT_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    if (contactEmail && process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: `bbautista.dev <${fromEmail}>`,
        to: contactEmail,
        replyTo: email, // Permite responder directamente al contacto
        subject: `Mensaje de ${name}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #1a1a1a; margin-bottom: 24px;">Nuevo Mensaje de Contacto</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #e5e5e5; color: #666; width: 100px;">De</td>
                <td style="padding: 12px; border-bottom: 1px solid #e5e5e5; color: #1a1a1a; font-weight: 500;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #e5e5e5; color: #666;">Email</td>
                <td style="padding: 12px; border-bottom: 1px solid #e5e5e5;"><a href="mailto:${email}" style="color: #0066cc;">${email}</a></td>
              </tr>
            </table>
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #0066cc;">
              <p style="margin: 0 0 8px 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Mensaje</p>
              <p style="margin: 0; color: #1a1a1a; white-space: pre-wrap; line-height: 1.6;">${message}</p>
            </div>
            
            <p style="color: #999; font-size: 12px; margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e5e5;">
              Enviado desde el formulario de contacto de tu portfolio
            </p>
          </body>
          </html>
        `,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
      id: sanityDoc._id,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
