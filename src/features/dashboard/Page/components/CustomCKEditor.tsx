// src/components/CustomCKEditor.tsx
'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const CKEditorWrapper = dynamic(() => import('./CKEditorWrapper'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

type Props = {
  data: string;
  onChange: (data: string) => void;
};

const CustomCKEditor = ({ data, onChange }: Props) => {
  return <CKEditorWrapper data={data} onChange={onChange} />;
};

export default CustomCKEditor;
