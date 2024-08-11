import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from 'next-i18next.config.mjs' // Ensure correct path

const HomePage = () => {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <h1>Welcome to Acme</h1>
      <p>This is the example for the Next.js Learn Course, brought to you by Vercel.</p>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale as string;

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'page'], nextI18NextConfig)),
    },
  };
};

export default HomePage;
