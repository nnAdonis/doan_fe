import { useState, useEffect, useRef } from 'react';

interface UseSpeechRecognitionReturn {
    isListening: boolean;
    transcript: string;
    error: string | null;
    startListening: () => void;
    stopListening: () => void;
    resetTranscript: () => void;
    isSupported: boolean;
}

export function useSpeechRecognition(): UseSpeechRecognitionReturn {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState<string | null>(null);
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    // Kiểm tra hỗ trợ của trình duyệt
    const isSupported = typeof window !== 'undefined' && 
        ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);

    useEffect(() => {
        if (!isSupported) {
            setError('Trình duyệt không hỗ trợ nhận diện giọng nói');
            return;
        }

        // Khởi tạo Speech Recognition
        const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognitionClass();

        recognition.continuous = false; // Dừng sau khi người dùng ngừng nói
        recognition.interimResults = false; // Chỉ trả về kết quả cuối cùng
        recognition.lang = 'vi-VN'; // Ngôn ngữ tiếng Việt

        recognition.onstart = () => {
            setIsListening(true);
            setError(null);
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const current = event.resultIndex;
            let transcriptText = event.results[current][0].transcript;
            transcriptText = transcriptText.trim().replace(/\.$/, '');
            setTranscript(transcriptText);
        };

        console.log(transcript)

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
            
            switch (event.error) {
                case 'no-speech':
                    setError('Không phát hiện giọng nói. Vui lòng thử lại.');
                    break;
                case 'audio-capture':
                    setError('Không thể truy cập microphone. Vui lòng kiểm tra quyền truy cập.');
                    break;
                case 'not-allowed':
                    setError('Quyền truy cập microphone bị từ chối. Vui lòng cấp quyền trong cài đặt trình duyệt.');
                    break;
                default:
                    setError(`Lỗi: ${event.error}`);
            }
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;

        // Cleanup
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, [isSupported]);

    const startListening = () => {
        if (!recognitionRef.current) return;
        
        setError(null);
        setTranscript('');
        
        try {
            recognitionRef.current.start();
        } catch (err) {
            console.error('Error starting speech recognition:', err);
            setError('Không thể bắt đầu nhận diện giọng nói');
        }
    };

    const stopListening = () => {
        if (!recognitionRef.current) return;
        
        try {
            recognitionRef.current.stop();
        } catch (err) {
            console.error('Error stopping speech recognition:', err);
        }
    };

    const resetTranscript = () => {
        setTranscript('');
        setError(null);
    };

    return {
        isListening,
        transcript,
        error,
        startListening,
        stopListening,
        resetTranscript,
        isSupported,
    };
}
