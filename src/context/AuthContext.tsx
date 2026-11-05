import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithPopup, 
  signOut as fbSignOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../lib/firebase';

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

const SUPER_ADMIN_EMAIL = 'andrewandrre88@gmail.com';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Check if primary super admin email
        const isSuperAdmin = currentUser.email?.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase();
        
        if (isSuperAdmin) {
          setIsAdmin(true);
        } else {
          // Check admins collection in Firestore
          try {
            const adminDoc = await getDoc(doc(db, 'admins', currentUser.uid));
            setIsAdmin(adminDoc.exists());
          } catch {
            setIsAdmin(false);
          }
        }
      } else {
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
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      // Harmless user action or duplicate popup cancel
      if (err?.code === 'auth/cancelled-popup-request') {
        // Do not throw or log as fatal error
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
