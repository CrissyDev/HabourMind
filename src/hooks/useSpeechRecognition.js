import { useState, useEffect, useRef, useCallback } from 'react';

export const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);
  const isInitializedRef = useRef(false);

  const initializeRecognition = useCallback(() => {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      try {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognitionInstance = new SpeechRecognition();
        
        // Configure for Swahili (Kenya)
        recognitionInstance.continuous = false; // Stop after user finishes speaking
        recognitionInstance.interimResults = true; // Show interim results
        recognitionInstance.lang = 'sw-KE'; // Swahili (Kenya)
        recognitionInstance.maxAlternatives = 1;
      
      recognitionInstance.onstart = () => {
        console.log('Speech recognition started');
        setIsListening(true);
        setError(null);
      };

      recognitionInstance.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPiece = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPiece;
          } else {
            interimTranscript += transcriptPiece;
          }
        }

        if (finalTranscript) {
          setTranscript(finalTranscript);
          console.log('Final transcript:', finalTranscript);
        } else if (interimTranscript) {
          setTranscript(interimTranscript);
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        
        // Provide more helpful error messages
        let errorMessage = event.error;
        switch (event.error) {
          case 'not-allowed':
          case 'service-not-allowed':
            errorMessage = 'Microphone access denied. Please check your browser permissions.';
            break;
          case 'no-speech':
            errorMessage = 'No speech detected. Please try again.';
            break;
          case 'network':
            errorMessage = 'Network error. Please check your connection.';
            break;
          case 'aborted':
            errorMessage = 'Speech recognition aborted.';
            break;
          default:
            errorMessage = `Speech recognition error: ${event.error}`;
        }
        
        setError(errorMessage);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        console.log('Speech recognition ended');
        setIsListening(false);
      };

      return recognitionInstance;
      } catch (err) {
        console.error('Error initializing speech recognition:', err);
        return null;
      }
    }
    return null;
  }, []);

  useEffect(() => {
    if (!isInitializedRef.current) {
      recognitionRef.current = initializeRecognition();
      isInitializedRef.current = true;
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          console.log('Recognition cleanup error:', e);
        }
      }
    };
  }, [initializeRecognition]);

  const startListening = useCallback(() => {
    try {
      // Check if speech recognition is supported
      if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
        setError('Speech recognition is not supported in this browser. Please use Chrome or Edge on desktop/Android.');
        return;
      }

      // Create a fresh recognition instance each time
      if (!recognitionRef.current) {
        recognitionRef.current = initializeRecognition();
      }

      if (!recognitionRef.current) {
        setError('Unable to initialize speech recognition. Your browser may not support this feature.');
        return;
      }

      if (!isListening) {
        setTranscript('');
        setError(null);
        
        try {
          console.log('Attempting to start speech recognition...');
          recognitionRef.current.start();
        } catch (e) {
          console.error('Start recognition error:', e);
          
          if (e.name === 'InvalidStateError') {
            // Recognition already started, stop it first
            try {
              recognitionRef.current.stop();
            } catch (stopError) {
              console.error('Error stopping recognition:', stopError);
            }
            
            setTimeout(() => {
              recognitionRef.current = initializeRecognition();
              if (recognitionRef.current) {
                try {
                  recognitionRef.current.start();
                } catch (retryError) {
                  console.error('Retry start error:', retryError);
                  setError('Failed to start speech recognition. Please refresh the page and try again.');
                }
              }
            }, 100);
          } else if (e.name === 'NotAllowedError') {
            setError('Microphone permission denied. Please allow microphone access in your browser settings and refresh the page.');
          } else {
            setError(`Failed to start speech recognition: ${e.message || 'Unknown error'}`);
          }
        }
      }
    } catch (err) {
      console.error('startListening error:', err);
      setError('Failed to initialize speech recognition. Try using Chrome or Edge browser.');
    }
  }, [isListening, initializeRecognition]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.log('Stop recognition error:', e);
      }
    }
  }, [isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setError(null);
  }, []);

  return {
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
    resetTranscript,
    isSupported: !!(
      typeof window !== 'undefined' && 
      ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)
    )
  };
};

