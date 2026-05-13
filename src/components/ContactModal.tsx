"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Loader2 } from 'lucide-react';

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    };

    window.addEventListener('openContactModal', handleOpen);
    return () => {
      window.removeEventListener('openContactModal', handleOpen);
      document.body.style.overflow = '';
    };
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    // Agregamos la Access Key de Web3Forms (debes reemplazar 'YOUR_ACCESS_KEY_HERE' con tu clave real)
    formData.append('access_key', 'f0ab59bf-0c3c-4eb0-aee4-35beb0620cf9');
    // Para que no envíe captcha en desarrollo/versión simple
    formData.append('from_name', 'SkullDevs Website Contact');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setStatus('success');
        // Reset form after 3 seconds and close modal
        setTimeout(() => {
          setStatus('idle');
          closeModal();
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-root">
          {/* Backdrop */}
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
          />

          {/* Modal Container */}
          <div className="modal-wrapper" style={{ pointerEvents: 'none' }}>
            <motion.div
              className="modal-content bento-item"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{ pointerEvents: 'auto' }}
            >
              <button className="modal-close" onClick={closeModal}>
                <X className="w-5 h-5" />
              </button>

              <div className="mb-8">
                <h2 className="heading-m mb-2">Hablemos de tu proyecto</h2>
                <p className="text-gray-400 text-sm">
                  Déjanos tus datos y te contactaremos a la brevedad para aterrizar tus ideas.
                </p>
              </div>

              {status === 'success' ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <CheckCircle2 className="w-16 h-16 text-accent mb-4" />
                  <h3 className="text-xl font-bold mb-2">¡Mensaje Enviado!</h3>
                  <p className="text-gray-400 text-center">
                    Hemos recibido tu información. Nos pondremos en contacto pronto.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="input-group">
                    <label htmlFor="name" className="input-label">Nombre</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="input-field"
                      placeholder="Ej. David Vato"
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="email" className="input-label">Correo Electrónico</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="input-field"
                      placeholder="tucorreo@empresa.com"
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="message" className="input-label">Requerimiento</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="input-field resize-none"
                      placeholder="Cuéntanos brevemente qué necesitas construir..."
                    ></textarea>
                  </div>

                  {status === 'error' && (
                    <p className="text-red-500 text-sm">
                      Hubo un error al enviar el mensaje. Intenta de nuevo o contáctanos por email.
                    </p>
                  )}

                  <button
                    type="submit"
                    className="btn-primary flex items-center justify-center gap-2 mt-2"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Enviar Mensaje
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
