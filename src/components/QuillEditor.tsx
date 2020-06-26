import * as React from 'react';
import styled from 'styled-components';
import Quill, { TextChangeHandler, RangeStatic } from 'quill';
import katex from 'katex';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import cpp from 'highlight.js/lib/languages/cpp';

import 'highlight.js/scss/github.scss';
import 'katex/dist/katex.min.css';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

const { useRef, useEffect, useCallback } = React;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const EditorContent = styled.div`
  flex: 1;
`;

export type InsertImageCallback = (url: string) => void;

export type UploadImage = (file: File, callback: InsertImageCallback) => void;

type Mode = 'Design' | 'Render';

interface QuillEditorProps {
  value: string | null;
  textChange?: TextChangeHandler;
  uploadImage?: UploadImage;
  className?: string;
  mode?: Mode;
  onCompleted?(change: any): void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export function QuillEditor({
  textChange,
  uploadImage,
  className,
  mode,
  value,
  onCompleted,
}: QuillEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const editor = useRef<Quill>();
  const changeRef = useRef<TextChangeHandler>(textChange || noop);

  const insertImageCallback = useCallback<InsertImageCallback>(
    (url: string) => {
      const inst = editor.current;
      if (inst != null) {
        if (!inst.hasFocus) inst.focus();
        const range = inst.getSelection() as RangeStatic;
        inst.insertEmbed(range.index, 'image', url);
      }
    },
    [editor]
  );

  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('accept', 'image/*');
    input.setAttribute('type', 'file');
    input.click();
    input.onchange = (evt: React.ChangeEvent<HTMLInputElement>) => {
      const { validity, files } = evt.target;
      if (validity && files && uploadImage) {
        uploadImage(files[0], insertImageCallback);
      }
    };
  }, [uploadImage, editor]);

  useEffect(() => {
    if (editorRef.current != null) {
      hljs.registerLanguage('javascript', javascript);
      hljs.registerLanguage('c++', cpp);
      window.katex = katex;
      let readOnly = true;
      let toolbarConfig: any[] = [];
      if (mode === 'Design') {
        const Font = Quill.import('formats/font');
        const fonts = ['sofia', 'slabo', 'roboto', 'inconsolata', 'ubuntu'];
        Font.whitelist = fonts;
        Quill.register(Font, true);
        toolbarConfig = [
          [{ font: fonts }, { size: [] }],
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
        ];
        readOnly = false;
      }

      const inst = new Quill(editorRef.current, {
        bounds: editorRef.current,
        modules: {
          formula: true,
          syntax: {
            highlight: (text: string) => hljs.highlightAuto(text).value,
          },
          toolbar: toolbarConfig,
        },
        theme: readOnly ? 'bubble' : 'snow',
        readOnly,
      });
      if (mode === 'Design') {
        const toolbar = inst.getModule('toolbar');
        toolbar.addHandler('image', imageHandler);
        inst.on('text-change', function (a, b, c) {
          changeRef.current(inst.getContents());
        });
      } else {
        inst.once('text-change', function (change) {
          if (onCompleted) {
            onCompleted(change);
          }
        });
      }
      if (value) {
        inst.setContents(JSON.parse(value));
        // changeRef.current(value);
      }
      editor.current = inst;
    }
  }, []);

  useEffect(() => {
    if (editor.current != null && textChange) {
      changeRef.current = textChange;
    }
  }, [textChange]);

  return (
    <Container className={className}>
      <EditorContent ref={editorRef} />
    </Container>
  );
}
