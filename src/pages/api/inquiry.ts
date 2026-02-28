import type { APIRoute } from "astro";
import { Resend } from "resend";

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.RESEND_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Server configuration error" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  const resend = new Resend(apiKey);

  try {
    const data = await request.json();
    const { name, email, message, items } = data;

    if (!name || typeof name !== "string" || !name.trim()) {
      return new Response(JSON.stringify({ error: "El nombre es obligatorio" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!email || typeof email !== "string") {
      return new Response(JSON.stringify({ error: "El email es obligatorio" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Formato de email inválido" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return new Response(
        JSON.stringify({ error: "Debes seleccionar al menos un producto" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const formatter = new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    });

    const itemsHtml = items
      .map(
        (item: { title: string; price: number; slug: string }) =>
          `<tr>
            <td style="padding: 8px 12px; border-bottom: 1px solid #e5e5e5;">
              <a href="https://efimera.xyz/tienda/${item.slug}" style="color: #1a1a1a; text-decoration: none;">${item.title}</a>
            </td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #e5e5e5; text-align: right;">
              ${formatter.format(item.price)}
            </td>
          </tr>`,
      )
      .join("");

    const total = items.reduce(
      (sum: number, item: { price: number }) => sum + item.price,
      0,
    );

    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a1a;">Nueva consulta de tienda</h2>
        <p><strong>Nombre:</strong> ${name.trim()}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        ${message ? `<p><strong>Mensaje:</strong></p><p>${message.trim().replace(/\n/g, "<br>")}</p>` : ""}
        <h3 style="margin-top: 24px; color: #1a1a1a;">Productos seleccionados</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="padding: 8px 12px; border-bottom: 2px solid #1a1a1a; text-align: left;">Producto</th>
              <th style="padding: 8px 12px; border-bottom: 2px solid #1a1a1a; text-align: right;">Precio</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
            <tr>
              <td style="padding: 8px 12px; font-weight: bold;">Total</td>
              <td style="padding: 8px 12px; font-weight: bold; text-align: right;">${formatter.format(total)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    const result = await resend.emails.send({
      from: "Efímera Tienda <tienda@efimera.xyz>",
      to: "info@efimera.xyz",
      replyTo: email,
      subject: `Nueva consulta de tienda — ${name.trim()}`,
      html,
    });

    if (result.error) {
      return new Response(
        JSON.stringify({
          error: result.error.message || "Error al enviar el email",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error al enviar. Inténtalo de nuevo." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
