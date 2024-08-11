/** @type {import('next').NextConfig} */
import { i18n } from './next-i18next.config.mjs';

const nextConfig = {
  experimental: {
    ppr: 'incremental',
  },
  i18n, // Add the i18n configuration to nextConfig
};

export default nextConfig;
