import * as React from 'react';
import styled from 'styled-components';
import Quill from 'quill';

import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

const { useRef, useEffect } = React;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const EditorContent = styled.div`
  flex: 1;
`;

export default function QuillEditor() {
  const editorRef = useRef<HTMLDivElement>(null);
  const editor = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current != null) {
      editor.current = new Quill(editorRef.current, {
        bounds: editorRef.current,
        modules: {
          syntax: false,
          toolbar: [
            [
              { font: ['sofia', 'slabo', 'roboto', 'inconsolata', 'ubuntu'] },
              { size: [] },
            ],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }],
            [{ script: 'super' }, { script: 'sub' }],
            [{ header: '1' }, { header: '2' }, 'blockquote', 'code-block'],
            [
              { list: 'ordered' },
              { list: 'bullet' },
              { indent: '-1' },
              { indent: '+1' },
            ],
            [{ direction: 'rtl' }, { align: [] }],
            ['link', 'image', 'video', 'formula'],
            ['clean'],
          ],
        },
        theme: 'snow',
      });
    }
  }, []);

  return (
    <Container>
      <EditorContent ref={editorRef} />
    </Container>
  );
}
