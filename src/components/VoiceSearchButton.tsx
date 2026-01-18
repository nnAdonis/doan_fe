import {FaMicrophone, FaMicrophoneSlash} from 'react-icons/fa';
import {useSpeechRecognition} from '../hooks/useSpeechRecognition';
import {useEffect, useRef} from 'react';

interface VoiceSearchButtonProps {
    onTranscript: (text: string) => void;
    className?: string;
}

export function VoiceSearchButton({onTranscript, className = ''}: VoiceSearchButtonProps) {
    const {isListening, transcript, error, startListening, stopListening, isSupported} = useSpeechRecognition();
    const onTranscriptRef = useRef(onTranscript);

    useEffect(() => {
        console.log(transcript)
    },);

    useEffect(() => {
        onTranscriptRef.current = onTranscript;
    }, [onTranscript]);

    useEffect(() => {
        if (transcript && !isListening) {
            onTranscriptRef.current(transcript);
        }
    }, [transcript, isListening]);

    const handleToggle = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    if (!isSupported) {
        return null;
    }

    return (
        <div className={`relative ${className}`}>
            <button
                onClick={handleToggle}
                className={`
                    flex items-center justify-center
                    w-10 h-10 rounded-full
                    transition-all duration-200
                    ${isListening
                    ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }
                `}
                title={isListening ? 'Dừng ghi âm' : 'Tìm kiếm bằng giọng nói'}
                type="button">
                {isListening ? (
                    <FaMicrophone className="w-5 h-5"/>
                ) : (
                    <FaMicrophoneSlash className="w-5 h-5"/>
                )}
            </button>
            {error && (
                <div
                    className="absolute top-full left-0 mt-2 p-2 bg-red-100 border border-red-300 rounded text-xs text-red-700 whitespace-nowrap z-50">
                    {error}
                </div>
            )}
            {isListening && (
                <div
                    className="absolute top-full left-0 mt-2 p-2 bg-blue-100 border border-blue-300 rounded text-xs text-blue-700 whitespace-nowrap z-50">
                    Đang nghe...
                </div>
            )}
        </div>
    );
}
