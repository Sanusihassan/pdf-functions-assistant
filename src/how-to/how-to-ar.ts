import { type _howToSchema } from "./how-to";

export const howToSchema: _howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "كيفية استخدام مساعد PDF؟",
    description: "خطوات لاستخدام مساعد PDF على PDFEquips.",
    step: [
        {
            "@type": "HowToStep",
            name: "الخطوة 1",
            text: "افتح أداة مساعد PDF على PDFEquips."
        },
        {
            "@type": "HowToStep",
            name: "الخطوة 2",
            text: "قم برفع ملف PDF الذي ترغب في معالجته."
        },
        {
            "@type": "HowToStep",
            name: "الخطوة 3",
            text: "أضف توجيهاتك أو التعليمات في مربع الإدخال. على سبيل المثال، يمكنك طلب تلخيص، استخراج بيانات، أو تنفيذ مهام محددة."
        },
        {
            "@type": "HowToStep",
            name: "الخطوة 4",
            text: "اضغط على زر 'معالجة المستند' لبدء تشغيل العملية بواسطة الذكاء الاصطناعي."
        },
        {
            "@type": "HowToStep",
            name: "الخطوة 5",
            text: "انتظر النتائج ثم قم بتحميل الملف المعالج بمجرد أن يصبح جاهزاً."
        }
    ]
};

