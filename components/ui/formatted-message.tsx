// file: components/ui/formatted-message.tsx
import type React from 'react';

interface FormattedMessageProps {
    text: string;
}

// Helper function để render inline markdown (chữ đậm)
function renderInline(text: string): React.ReactNode[] {
    const parts = text.split(/(\*\*.*?\*\*)/g).filter(part => part);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        return <span key={index}>{part}</span>;
    });
}

export function FormattedMessage({ text }: FormattedMessageProps) {
    const lines = text.split('\n');

    const messageLines = lines.map((line, index) => {
        // Bỏ qua các dòng trống
        if (line.trim() === '') {
            return <div key={index} className="h-2" />;
        }

        // Xử lý gạch đầu dòng
        if (line.trim().startsWith('* ')) {
            const content = line.trim().substring(2);
            // Kiểm tra gạch đầu dòng cấp 2 (thụt lề)
            const indentClass = line.startsWith('    ') ? 'pl-8' : 'pl-4';
            return (
                <div key={index} className={`relative ${indentClass}`}>
                    <span className="absolute left-0 text-muted-foreground">•</span>
                    <span>{renderInline(content)}</span>
                </div>
            );
        }

        // Dòng bình thường
        return <p key={index}>{renderInline(line)}</p>;
    });

    return <div className="space-y-2">{messageLines}</div>;
}