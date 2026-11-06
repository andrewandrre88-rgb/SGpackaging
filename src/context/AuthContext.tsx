import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithPopup, 
  signOut as fbSignOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  isSigningIn: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  authError: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  loading: true,
  isSigningIn: false,
  loginWithGoogle: async () => {},
  logout: async () => {},
  authError: null,
  clearError: () => {},
});

export const ALLOWED_ADMIN_EMAILS = [
  'andrewandrre88@gmail.com',
  'packagingsg02@gmail.com'
];

export const isAuthorizedAdminEmail = (email?: string | null): boolean => {
  if (!email) return false;
  return ALLOWED_ADMIN_EMAILS.includes(email.trim().toLowerCase());
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const email = currentUser.email?.toLowerCase();
        const isAuthorized = isAuthorizedAdminEmail(email);
        
        if (isAuthorized) {
          setUser(currentUser);
          setIsAdmin(true);
        } else {
          // Immediately reject and sign out unauthorized users
          try {
            await fbSignOut(auth);
          } catch {
            // Ignore signout error
          }
          setUser(null);
          setIsAdmin(false);
          setAuthError(
            `Access Restricted: Only authorized administrator accounts (andrewandrre88@gmail.com and packagingsg02@gmail.com) are permitted to access this portal. The account "${currentUser.email}" is not authorized.`
          );
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    if (isSigningIn) {
      return;
    }

    setIsSigningIn(true);
    setAuthError(null);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const email = result.user?.email?.toLowerCase();
      
      if (!isAuthorizedAdminEmail(email)) {
        await fbSignOut(auth);
        setUser(null);
        setIsAdmin(false);
        setAuthError(
          `Access Restricted: Only authorized accounts (andrewandrre88@gmail.com and packagingsg02@gmail.com) are permitted. The account "${email || 'Unknown'}" is not authorized.`
        );
        return;
      }
    } catch (err: any) {
      if (err?.code === 'auth/cancelled-popup-request') {
        return;
      }
      
      if (err?.code === 'auth/popup-closed-by-user') {
        setAuthError('Sign-in popup was closed before completing.');
        return;
      }

      if (err?.code === 'auth/popup-blocked') {
        setAuthError('Sign-in popup was blocked by your browser. Please allow popups for this site.');
        return;
      }

      if (err?.code === 'auth/unauthorized-domain') {
        setAuthError(
          `Domain not authorized: Please add "${window.location.hostname}" to your Firebase Console under Authentication > Settings > Authorized domains.`
        );
        return;
      }

      console.warn('Google Sign-In Notice:', err?.message || err);
      setAuthError(err?.message || 'Failed to sign in with Google. Please try again.');
    } finally {
      setIsSigningIn(false);
    }
  };

  const logout = async () => {
    try {
      await fbSignOut(auth);
    } catch (err: any) {
      console.warn('Sign-out notice:', err);
    }
  };

  const clearError = () => setAuthError(null);

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, isSigningIn, loginWithGoogle, logout, authError, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
