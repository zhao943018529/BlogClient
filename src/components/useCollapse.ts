import { useState } from 'react';

export default function useCollapse() {
  return useState(false);
}
