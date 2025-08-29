/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  // add more env vars here if you have them
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
