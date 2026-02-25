import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactPayload {
  name: string;
  phone: string;
  program?: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 465),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: NextRequest) {
  let body: ContactPayload;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const { name, phone, program } = body;

  if (!name?.trim() || !phone?.trim()) {
    return NextResponse.json(
      { error: "Имя и телефон обязательны" },
      { status: 422 }
    );
  }

  const programLine = program?.trim()
    ? `<tr><td style="padding:6px 0;color:#6b7280;font-size:13px">Программа</td><td style="padding:6px 0;font-size:14px;font-weight:600">${program.trim()}</td></tr>`
    : "";

  const html = `
<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:system-ui,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 0">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0"
          style="background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb">
          <!-- Шапка -->
          <tr>
            <td style="background:linear-gradient(135deg,#1d4ed8,#3b82f6);padding:28px 32px">
              <p style="margin:0;font-size:18px;font-weight:700;color:#fff">
                Новая заявка с сайта
              </p>
              <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.75)">
                ЦОК Стандарт плюс — standart82.ru
              </p>
            </td>
          </tr>
          <!-- Тело -->
          <tr>
            <td style="padding:28px 32px">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:6px 0;color:#6b7280;font-size:13px">Имя</td>
                  <td style="padding:6px 0;font-size:14px;font-weight:600">${name.trim()}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:#6b7280;font-size:13px">Телефон</td>
                  <td style="padding:6px 0;font-size:14px;font-weight:600">
                    <a href="tel:${phone.trim()}" style="color:#1d4ed8;text-decoration:none">${phone.trim()}</a>
                  </td>
                </tr>
                ${programLine}
              </table>
            </td>
          </tr>
          <!-- Подвал -->
          <tr>
            <td style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb">
              <p style="margin:0;font-size:12px;color:#9ca3af">
                Заявка отправлена через форму на странице /contacts
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  try {
    await transporter.sendMail({
      from: `"Сайт ЦОК Стандарт плюс" <${process.env.SMTP_FROM}>`,
      to: process.env.SMTP_USER,
      subject: `Новая заявка: ${name.trim()}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact/route] SMTP error:", err);
    return NextResponse.json(
      { error: "Ошибка отправки письма" },
      { status: 500 }
    );
  }
}
