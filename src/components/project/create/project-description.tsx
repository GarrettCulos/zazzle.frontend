import React, { useCallback, useEffect, useState } from 'react';
import useDebounce from '@hooks/onDebounce';
import Wyzi from '../../atomic/wysiwyg/wysiwyg';

interface BaseFormInterface {
  onChange?: Function;
  isValid?: Function;
  data?: any;
}

export const ProjectDescription: React.FC<BaseFormInterface> = ({ data, onChange, isValid }: BaseFormInterface) => {
  const [description, setTextData]: [any, Function] = useState(data);

  const setFormData = useCallback(
    (data: any) => {
      setTextData(data);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [description, setTextData]
  );

  const descriptionDebounce = useDebounce(description, 250);
  useEffect(() => {
    if (isValid) {
      isValid(true);
    }
    if (onChange) {
      onChange(descriptionDebounce);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [descriptionDebounce]);

  return <Wyzi integrated={true} minHeight={'300px'} onChange={setFormData} />;
};
