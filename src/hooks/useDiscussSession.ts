'use client';
/**
 * useDiscussSession
 * -----------------
 * Persists the visitor's name & email in sessionStorage so they don't
 * have to re-enter their info every time they post a comment or reply.
 *
 * No login required — purely client-side session storage.
 */

import { useState, useEffect, useCallback } from 'react';
import type { DiscussUserSession } from '@/types/discuss';

const SESSION_KEY = 'lema_discuss_user';

export function useDiscussSession() {
  const [session, setSessionState] = useState<DiscussUserSession | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Load from sessionStorage on mount
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) {
        setSessionState(JSON.parse(raw));
      }
    } catch {
      /* ignore */
    } finally {
      setLoaded(true);
    }
  }, []);

  const setSession = useCallback((data: DiscussUserSession) => {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
    } catch {
      /* ignore */
    }
    setSessionState(data);
  }, []);

  const clearSession = useCallback(() => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
    setSessionState(null);
  }, []);

  return { session, setSession, clearSession, loaded };
}
