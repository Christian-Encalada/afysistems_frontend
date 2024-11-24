import { dir } from 'i18next';
import { languages } from '@/i18n/settings';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './contexts/AuthContext';
import './styles/global.css';
import 'react-toastify/dist/ReactToastify.css';
import { Roboto_Slab } from 'next/font/google';
import ThemeProvider from './components/ThemeProvider';
import { TemplateColorProvider } from './contexts/TemplateColorContext';

const roboto = Roboto_Slab({
  subsets: ['latin'],
  display: 'swap',
});

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default async function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}) {
  return (
    <html
      lang={lng}
      dir={dir(lng)}
      className={roboto.className}
      suppressHydrationWarning
    >
      <head />
      <body>
        <AuthProvider>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
              <TemplateColorProvider>
                {children}
              <ToastContainer />
            </TemplateColorProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
