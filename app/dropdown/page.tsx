'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use this for App Router
import { languageOptions } from '../content/page'; 

export default function LanguageDropdown() {
    const router = useRouter();
    const [selectedLang, setSelectedLang] = useState('');

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLocale = e.target.value;
        setSelectedLang(newLocale);

        // Navigate to just the new locale path
        router.push(`/${newLocale}`);
    };

    return (
        <select value={selectedLang} onChange={handleLanguageChange}>
            {languageOptions.map(op => (
                <option value={op.value} key={op.id}>
                    {op.label}
                </option>
            ))}
        </select>
    );
}
