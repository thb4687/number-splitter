import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

/**
 * Number Splitter - تطبيق تقسيم الأرقام
 * Design: Minimalist Functional Design
 * - واجهة بسيطة وواضحة
 * - أزرار تفاعلية قابلة للنسخ
 * - ردود فعل فورية وواضحة
 */
export default function Home() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState<number | null>(null);

  // تقسيم الأرقام إلى ثلاث مجموعات (5، 5، 4)
  const splitNumbers = (numbers: string) => {
    const cleaned = numbers.replace(/\D/g, ""); // إزالة أي أحرف غير رقمية
    if (cleaned.length !== 14) return null;
    
    return [
      cleaned.slice(0, 5),
      cleaned.slice(5, 10),
      cleaned.slice(10, 14),
    ];
  };

  const parts = input.length > 0 ? splitNumbers(input) : null;

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    toast.success("تم النسخ بنجاح!", {
      duration: 2000,
    });
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">مقسم الأرقام</h1>
          <p className="text-slate-600">أدخل 14 رقماً لتقسيمها إلى ثلاث مجموعات</p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-slate-200">
          <label htmlFor="numbers" className="block text-sm font-medium text-slate-700 mb-3">
            أدخل 14 رقماً
          </label>
          <input
            id="numbers"
            type="text"
            inputMode="numeric"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="مثال: 73636362910373"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors font-mono text-lg tracking-wider"
            maxLength={20}
          />
          {input.length > 0 && (
            <p className="text-xs text-slate-500 mt-2">
              {input.replace(/\D/g, "").length} / 14 رقم
            </p>
          )}
        </div>

        {/* Output Section */}
        {parts ? (
          <div className="space-y-4">
            {parts.map((part, index) => (
              <button
                key={index}
                onClick={() => handleCopy(part, index)}
                className={`w-full p-4 rounded-lg font-mono text-lg font-semibold transition-all duration-200 flex items-center justify-between group ${
                  copied === index
                    ? "bg-green-500 text-white shadow-md"
                    : "bg-blue-50 text-blue-900 border-2 border-blue-200 hover:bg-blue-100 hover:border-blue-300 shadow-sm hover:shadow-md"
                }`}
              >
                <span className="tracking-wider">{part}</span>
                {copied === index ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Copy className="w-5 h-5 opacity-60 group-hover:opacity-100" />
                )}
              </button>
            ))}
          </div>
        ) : input.length > 0 ? (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-center text-red-700 font-medium">
            ⚠️ يرجى إدخال 14 رقماً بالضبط
          </div>
        ) : null}
      </div>
    </div>
  );
}
