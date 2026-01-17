import { FaPlay, FaPause, FaStop } from 'react-icons/fa';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

interface TextToSpeechButtonProps {
    text: string;
    className?: string;
}

export function TextToSpeechButton({ text, className = '' }: TextToSpeechButtonProps) {
    const { isPlaying, isPaused, speak, pause, resume, stop } = useTextToSpeech();

    const handleToggle = () => {
        if (isPlaying && !isPaused) {
            pause();
        } else if (isPaused) {
            resume();
        } else {
            // Extract text từ HTML nếu cần
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = text;
            const plainText = tempDiv.textContent || tempDiv.innerText || '';
            
            if (plainText.trim()) {
                speak(plainText);
            }
        }
    };

    const handleStop = () => {
        stop();
    };

    // Kiểm tra xem trình duyệt có hỗ trợ text-to-speech không
    if (typeof window === 'undefined' || !window.speechSynthesis) {
        return null;
    }

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <button
                onClick={handleToggle}
                className={`
                    flex items-center justify-center gap-2 px-4 py-2 rounded-lg
                    transition-colors duration-200
                    ${isPlaying && !isPaused
                        ? 'bg-orange-500 hover:bg-orange-600 text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }
                `}
                title={isPlaying && !isPaused ? 'Tạm dừng' : isPaused ? 'Tiếp tục' : 'Đọc bài viết'}
            >
                {isPlaying && !isPaused ? (
                    <>
                        <FaPause className="w-4 h-4" />
                        <span className="hidden sm:inline">Tạm dừng</span>
                    </>
                ) : isPaused ? (
                    <>
                        <FaPlay className="w-4 h-4" />
                        <span className="hidden sm:inline">Tiếp tục</span>
                    </>
                ) : (
                    <>
                        <FaPlay className="w-4 h-4" />
                        <span className="hidden sm:inline">Đọc bài viết</span>
                    </>
                )}
            </button>

            {(isPlaying || isPaused) && (
                <button
                    onClick={handleStop}
                    className="
                        flex items-center justify-center gap-2 px-4 py-2 rounded-lg
                        bg-red-500 hover:bg-red-600 text-white
                        transition-colors duration-200
                    "
                    title="Dừng đọc"
                >
                    <FaStop className="w-4 h-4" />
                    <span className="hidden sm:inline">Dừng</span>
                </button>
            )}
        </div>
    );
}
