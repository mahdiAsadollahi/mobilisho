import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import VerificationCode from "@/models/VerificationCode";
import { generateAuthCode, validatePhone, hashAuthCode } from "@/utils/auth";

const FARA_SMS_API_TOKEN = process.env.FARA_SMS_API_TOKEN;
const FARA_SMS_BASE_URL = "https://edge.ippanel.com/v1/api/send";
const PATTERN_CODE = "1aytkg1qmm42hih";
const FROM_NUMBER = "50002178584000";

export async function POST(req) {
  try {
    await connectToDB();

    const { phone } = await req.json();

    const isValidPhone = validatePhone(phone);
    if (!isValidPhone) {
      return Response.json({ message: "شماره نامعتبر" }, { status: 400 });
    }

    const existingUser = await UserModel.findOne({ phone });
    if (existingUser) {
      return Response.json(
        { message: "با این شماره قبلا ثبت نام شده - لطفا وارد شوید" },
        { status: 400 }
      );
    }

    const lastCode = await VerificationCode.findOne({ phone })
      .sort({ createdAt: -1 })
      .lean();

    if (lastCode) {
      const lastCodeTime = new Date(lastCode.createdAt).getTime();
      const timeDiff = Date.now() - lastCodeTime;

      if (timeDiff < 60000) {
        const remainingSeconds = Math.ceil((60000 - timeDiff) / 1000);
        return Response.json(
          {
            message: `لطفاً ${remainingSeconds} ثانیه صبر کنید`,
            retryAfter: remainingSeconds,
          },
          { status: 429 }
        );
      }
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaysAttempts = await VerificationCode.countDocuments({
      phone,
      createdAt: { $gte: today },
    });

    if (todaysAttempts >= 5) {
      return Response.json(
        { message: "تعداد درخواست‌های امروز شما به پایان رسیده" },
        { status: 429 }
      );
    }

    await VerificationCode.deleteMany({ phone });

    const code = generateAuthCode();
    const hashedCode = await hashAuthCode(code);

    await VerificationCode.create({
      phone,
      code,
      codeHash: hashedCode,
      expiresAt: new Date(Date.now() + 2 * 60 * 1000),
    });

    let formattedPhone = phone;
    if (phone.startsWith("+98")) {
      formattedPhone = "0" + phone.substring(3);
    } else if (phone.startsWith("98")) {
      formattedPhone = "0" + phone.substring(2);
    }

    console.log("Sending SMS to:", formattedPhone, "Code:", code);

    const smsResponse = await fetch(FARA_SMS_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: FARA_SMS_API_TOKEN,
      },
      body: JSON.stringify({
        sending_type: "pattern",
        from_number: "+983000505",
        code: PATTERN_CODE,
        recipients: ["+989120000000"],
        params: {
          verificationCode: code,
        },
      }),
    });

    console.log("SMS API Status:", smsResponse.status);

    const smsResult = await smsResponse.json();
    console.log("SMS API Response:", JSON.stringify(smsResult, null, 2));

    if (!smsResponse.ok) {
      console.error("SMS API HTTP Error:", smsResult);
      return Response.json(
        {
          message: "خطا در ارتباط با سرویس پیامک",
        },
        { status: 500 }
      );
    }

    if (smsResult.success === false || smsResult.status === false) {
      console.error("SMS API Business Error:", smsResult);
      return Response.json(
        {
          message: "خطا در ارسال کد تایید. لطفا دوباره تلاش کنید",
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        message: "کد تایید ارسال شد",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Send code error:", err);
    return Response.json(
      {
        message: "خطا در ارسال کد تایید",
      },
      { status: 500 }
    );
  }
}
