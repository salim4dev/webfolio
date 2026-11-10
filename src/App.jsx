import { useState } from 'react';
import AppFR from './AppFR';
import AppEN from './AppEN';

export default function App() {
  const [lang, setLang] = useState('FR');

  return lang === 'FR'
    ? <AppFR onLanguageChange={setLang} />
    : <AppEN onLanguageChange={setLang} />;
}