import { useState, useEffect, useRef } from 'react';

interface UseTextToSpeechReturn {
    isPlaying: boolean;
    isPaused: boolean;
    speak: (text: string) => void;
    pause: () => void;
    resume: () => void;
    stop: () => void;
    currentUtterance: SpeechSynthesisUtterance | null;
}

export function useTextToSpeech(): UseTextToSpeechReturn {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const voicesLoadedRef = useRef(false);

    useEffect(() => {
        const loadVoices = () => {
            if (window.speechSynthesis) {
                const voices = window.speechSynthesis.getVoices();
                if (voices.length > 0) {
                    voicesLoadedRef.current = true;
                }
            }
        };

        if (window.speechSynthesis) {
            loadVoices();
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }

        return () => {
            if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
                window.speechSynthesis.onvoiceschanged = null;
            }
        };
    }, []);

    const speak = (text: string) => {
        if (!window.speechSynthesis) {
            console.error('Text-to-speech không được hỗ trợ trên trình duyệt này');
            return;
        }

        // Dừng bất kỳ phát âm nào đang chạy
        window.speechSynthesis.cancel();

        // Tạo utterance mới
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Cấu hình giọng nói tiếng Việt nếu có
        const voices = window.speechSynthesis.getVoices();
        const vietnameseVoice = voices.find(
            voice => voice.lang.includes('vi') || voice.lang.includes('VN')
        );
        if (vietnameseVoice) {
            utterance.voice = vietnameseVoice;
        } else {
            // Fallback về giọng mặc định
            utterance.lang = 'vi-VN';
        }

        utterance.rate = 1.0; // Tốc độ đọc (0.1 - 10)
        utterance.pitch = 1.0; // Độ cao giọng (0 - 2)
        utterance.volume = 1.0; // Âm lượng (0 - 1)

        // Event handlers
        utterance.onstart = () => {
            setIsPlaying(true);
            setIsPaused(false);
        };

        utterance.onend = () => {
            setIsPlaying(false);
            setIsPaused(false);
            utteranceRef.current = null;
        };

        utterance.onerror = (event) => {
            console.error('Lỗi text-to-speech:', event);
            setIsPlaying(false);
            setIsPaused(false);
            utteranceRef.current = null;
        };

        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
    };

    const pause = () => {
        if (window.speechSynthesis && isPlaying) {
            window.speechSynthesis.pause();
            setIsPaused(true);
        }
    };

    const resume = () => {
        if (window.speechSynthesis && isPaused) {
            window.speechSynthesis.resume();
            setIsPaused(false);
        }
    };

    const stop = () => {
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
            setIsPlaying(false);
            setIsPaused(false);
            utteranceRef.current = null;
        }
    };

    return {
        isPlaying,
        isPaused,
        speak,
        pause,
        resume,
        stop,
        currentUtterance: utteranceRef.current,
    };
}
