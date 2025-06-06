// src/components/CKEditorWrapper.tsx
'use client';

import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

type Props = {
  data: string;
  onChange: (data: string) => void;
};

const CKEditorWrapper = ({ data, onChange }: Props) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={data}
      onChange={(event: any, editor: any) => {
        const data = editor.getData();
        onChange(data);
      }}
    />
  );
};

export default CKEditorWrapper;
