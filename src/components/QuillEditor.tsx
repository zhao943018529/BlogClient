import * as React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
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

const UploadImage = gql`
  mutation uploadImage($file: Upload!) {
    uploadImage(file: $file) {
      code
      success
      message
      data
    }
  }
`;

interface FileResponse {
  uploadImage: IBaseResponse<any>;
}

export default function QuillEditor() {
  const editorRef = useRef<HTMLDivElement>(null);
  const editor = useRef<Quill>();
  const [uploadFile, { data }] = useMutation<FileResponse, { file: File }>(
    UploadImage
  );

  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      validity,
      files: [file],
    } = event.target;
    if (validity) {
      uploadFile({ variables: { file } });
    }
  };

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('accept', 'image/*');
    input.setAttribute('type', 'file');
    input.click();
    input.onchange = handleAddImage;
  };

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
      const toolbar = editor.current.getModule('toolbar');
      toolbar.addHandler('image', imageHandler);
    }
  }, []);

  useEffect(() => {
    if (data?.uploadImage.success) {
      const range = editor.current?.getSelection();
      editor.current?.insertEmbed(
        range?.index,
        'image',
        `http://10.11.1.140:13892${data.uploadImage.data}`
      );
    }
  }, [data]);

  return (
    <Container>
      <EditorContent ref={editorRef} />
    </Container>
  );
}
