import AuthProvider from '../app/providers/sessionProvider';
import Navbar from '../components/navigation';
import './globals.css';

export const metadata = {
  title: 'Bitcoin Wallet',
  description: 'Connect your bank account and buy bitcoin',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <AuthProvider>
          <header>
            <Navbar />
          </header>

          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
