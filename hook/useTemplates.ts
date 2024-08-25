import { produce } from 'immer';
import { debounce, omit } from 'lodash-es';
import React from 'react';

type InData<T = any> = {
  templateName: string;
  data: T;
  deleteble?: boolean;
};

interface UseTemplatesOption<T = any> {
  storgeKey: string;
  initTemplates: InData<T>[];
}

export const useTemplates = <T = any>(opeions: UseTemplatesOption<T>) => {
  const { storgeKey, initTemplates } = opeions;

  const [templates, setTemplates] = React.useState<InData<T>[]>([]);

  const [queryTemplateNameStr, setQueryTemplateNameStr] = React.useState('');

  const [selectedTemplateNames, setSelectedTemplateNames] = React.useState<
    string[]
  >([]);

  React.useEffect(() => {
    const history = window.localStorage.getItem(storgeKey);

    let all = initTemplates;

    if (history) {
      const allPreTplname = initTemplates.reduce<Record<string, true>>(
        (pre, cur) => {
          pre[cur.templateName] = true;
          return pre;
        },
        {}
      );

      const list = (JSON.parse(history) as InData<T>[])
        .map((i) => ({
          ...i,
          deleteble: true,
        }))
        .filter((i) => !allPreTplname[i.templateName]);

      all = [...list, ...all];
    }

    setTemplates(all);
  }, [storgeKey, initTemplates]);

  React.useEffect(() => {
    if (!templates || !templates.length) {
      return;
    }

    window.localStorage.setItem(
      storgeKey,
      JSON.stringify(
        templates.filter((i) => i.deleteble).map((i) => omit(i, ['deleteble']))
      )
    );
  }, [templates, storgeKey]);

  /**
   * 模糊查询
   */
  const toQueryTemplate = debounce(
    (query: string) => setQueryTemplateNameStr(query),
    1000
  );

  const showTemplates = React.useMemo(() => {
    if (!queryTemplateNameStr) {
      return templates;
    }
    return templates.filter((i) =>
      i.templateName.includes(queryTemplateNameStr)
    );
  }, [queryTemplateNameStr, templates]);

  /**
   * 删除历史记录
   * @param templateName
   */
  const deleteHistory = (templateName: string) => {
    setTemplates(
      produce((draft) => {
        const index = draft.findIndex((i) => i.templateName === templateName);
        if (index > -1 && draft[index].deleteble) {
          draft.splice(index, 1);
        }
      })
    );
  };

  /**
   * 新增历史记录
   * @param data
   */
  const addHistory = (data: InData) => {
    setTemplates(
      produce((draft) => {
        const tarIndex = draft.findIndex(
          (i) => i.templateName === data.templateName
        );
        const tar = draft[tarIndex];

        if (tar && !tar.deleteble) {
          return;
        }

        if (tar && tar.deleteble) {
          draft.splice(tarIndex, 1);
        }

        draft.unshift({ ...data, deleteble: true });
      })
    );
  };

  const toggleSelectTemplate = (templateName: string) => {
    setSelectedTemplateNames(
      produce((draft) => {
        const index = draft.findIndex((i) => i === templateName);
        if (index > -1) {
          draft.splice(index, 1);
        } else {
          draft.push(templateName);
        }
      })
    );
  };

  const selectedTemplates = React.useMemo(() => {
    return templates.filter((i) =>
      selectedTemplateNames.includes(i.templateName)
    );
  }, [selectedTemplateNames, templates]);

  return {
    toQueryTemplate,
    showTemplates,
    deleteHistory,
    addHistory,
    clearSelectedTemplate: () => {
      setSelectedTemplateNames([]);
    },
    toggleSelectTemplate,
    selectedTemplates,
  };
};
