import { ATTRIBUTE_CONFIG, INITIAL_JEWELRY, JEWELRY_ENUM } from '@/config';
import { axiosPost } from '@/lib/axios';
import { cn } from '@/utils';
import { SendJewelryApiReq } from '@/verification';
import { Icon } from '@iconify/react/dist/iconify.js';
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Divider,
  Input,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { useRequest } from 'ahooks';
import { produce } from 'immer';
import { debounce, omit } from 'lodash-es';
import React from 'react';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
  useWatch,
} from 'react-hook-form';
import { toast } from 'react-toastify';

const jewelrySelectOptions = JEWELRY_ENUM.map(({ level, name, type }) => {
  const typeEnum = {
    4: '项链',
    5: '玉佩',
    6: '手镯',
  };
  return {
    label: `${level}级${typeEnum[type]} ${name}`,
    value: `${level}_${type}_${name}`,
  };
});

interface Inputs {
  jewelry: string;
  attributes: {
    attribute: number;
    value: number;
  }[];
  saveAsTpl: boolean;
  tplName?: string;
}

const defaultValues: Inputs = {
  jewelry: '80_6_闭月双环',
  attributes: [{ attribute: 65, value: 5 }],
  saveAsTpl: false,
  tplName: '',
};

const requestApi = (data: SendJewelryApiReq) => {
  SendJewelryApiReq.parse(data);
  return axiosPost('/api/jewelry', data);
};

const useHistoryTpl = () => {
  const [searchTxt, setSearchTxt] = React.useState('');

  const [allHistory, setAllHistory] = React.useState<typeof INITIAL_JEWELRY>(
    []
  );

  const [selectedTplTitles, setSelectedTplTitles] = React.useState<string[]>(
    []
  );

  const onSearchTxtChange = debounce((txt: string) => {
    setSearchTxt(txt);
  }, 1000);

  React.useEffect(() => {
    INITIAL_JEWELRY.sort((a, b) => {
      const getLevel = (i: string) => parseInt(i.split('_')[0]);

      return getLevel(a.key) - getLevel(b.key);
    });

    const result = [...INITIAL_JEWELRY];

    const existMap = new Map();

    INITIAL_JEWELRY.forEach((item) => {
      existMap.set(item.title, true);
    });

    const history = window.localStorage.getItem('jewelry_tpl_history');

    const historyList = history ? (JSON.parse(history) as typeof result) : [];

    historyList.forEach((item) => {
      if (!existMap.get(item.title)) {
        item.deleteble = true;
        result.unshift(item);
      }
    });

    setAllHistory(result);
  }, []);

  const filteredList = React.useMemo(() => {
    if (!searchTxt) {
      return allHistory;
    }

    return allHistory.filter(
      (item) => item.title.includes(searchTxt) || searchTxt.includes(item.title)
    );
  }, [allHistory, searchTxt]);

  React.useEffect(() => {
    if (!allHistory || !allHistory.length) {
      return;
    }

    window.localStorage.setItem(
      'jewelry_tpl_history',
      JSON.stringify(
        allHistory.filter((i) => i.deleteble).map((i) => omit(i, ['deleteble']))
      )
    );
  }, [allHistory]);

  const deleteHistory = (title: string) => {
    setAllHistory(
      produce((draft) => {
        const index = draft.findIndex((i) => i.title === title);
        if (index > -1) {
          draft.splice(index, 1);
        }
      })
    );
  };

  const addHistory = (data: (typeof INITIAL_JEWELRY)[number]) => {
    setAllHistory(
      produce((draft) => {
        const tarIndex = draft.findIndex((i) => i.title === data.title);
        const tar = draft[tarIndex];

        if (tar && !tar.deleteble) {
          return;
        }

        if (tar && tar.deleteble) {
          draft.splice(tarIndex, 1);
        }

        draft.unshift(data);
      })
    );
  };

  const onSelectedTplsChange = (value: string) => {
    setSelectedTplTitles(
      produce((draft) => {
        if (draft.includes(value)) {
          draft.splice(draft.indexOf(value), 1);
        } else {
          draft.push(value);
        }
      })
    );
  };

  const selectedTpls = allHistory.filter((i) =>
    selectedTplTitles.includes(i.title)
  );

  return {
    searchTxt,
    onSearchTxtChange,
    filteredList,
    deleteHistory,
    selectedTplTitles,
    onSelectedTplsChange,
    selectedTpls,
    clearSelect: () => {
      setSelectedTplTitles([]);
    },
    addHistory,
  };
};

interface JewelrySendProps {
  gids: string[];
}

/**
 * 首饰发送
 * @returns
 */
export const JewelrySend = ({ gids }: JewelrySendProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'attributes',
  });

  const {
    searchTxt,
    onSearchTxtChange,
    filteredList,
    selectedTplTitles,
    onSelectedTplsChange,
    deleteHistory,
    clearSelect,
    selectedTpls,
    addHistory,
  } = useHistoryTpl();

  const attrMap = React.useMemo(() => {
    const map = new Map<number, string>();

    ATTRIBUTE_CONFIG.forEach((item) => {
      map.set(item.key, item.description);
    });

    return map;
  }, []);

  const { loading, run } = useRequest(requestApi, {
    manual: true,
    onSuccess: () => {
      toast.success('发送成功');
    },
    onError: (error) => {
      toast.error((error as Error).message);
    },
  });

  const saveAsTplValue = useWatch({
    control,
    name: 'saveAsTpl',
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const [level, type, name] = data.jewelry.split('_');
    try {
      await requestApi({
        gid: gids[0],
        jewelrys: [
          {
            level: Number(level),
            type: Number(type),
            name,
            attributes: data.attributes,
          },
        ],
      });
      if (data.saveAsTpl) {
        addHistory({
          title: data.tplName || '新模板',
          key: data.jewelry,
          attributes: data.attributes,
          deleteble: true,
        });
      }
      toast.success('发送成功');
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <div>
        <div className="flex">
          <Input
            placeholder="模糊查询模板历史记录"
            onValueChange={onSearchTxtChange}
            startContent={<Icon icon="mdi:magnify" />}
            isClearable
          />
          <Button
            color="primary"
            variant="light"
            onClick={() => {
              clearSelect();
            }}
          >
            清空所选
          </Button>
        </div>

        <div className="mt-4 grid max-h-[calc(100dvh-260px)] grid-cols-3 gap-2 overflow-y-auto">
          {filteredList.map((item) => {
            const isSelected = selectedTplTitles.includes(item.title);

            const arr = item.key.split('_');

            return (
              <Card
                key={item.title}
                className={cn('mb-2 cursor-pointer', {
                  'box-border border-1 border-primary': isSelected,
                })}
              >
                <CardBody
                  // className="pt-0"
                  onClick={() => {
                    console.log(item.title);
                    onSelectedTplsChange(item.title);
                  }}
                >
                  <div className="text-tiny text-inherit">{item.title}</div>
                  <div className="text-small text-inherit">
                    {arr[arr.length - 1]}
                  </div>
                  {item.attributes.map((item) => {
                    const attr = attrMap.get(item.attribute);
                    return (
                      <div
                        key={item.attribute}
                        className="text-tiny text-foreground-400"
                      >
                        {attr || '??'} {item.value}
                      </div>
                    );
                  })}
                  {item.deleteble ? (
                    <div
                      onClick={(evt) => {
                        evt.stopPropagation;
                        deleteHistory(item.title);
                      }}
                    >
                      <Divider className="my-2" />
                      <div className="flex items-center text-tiny text-inherit">
                        <Icon
                          icon="material-symbols:delete"
                          width={14}
                          color="red"
                          className="mr-1"
                        />
                        删除该模板
                      </div>
                    </div>
                  ) : null}
                </CardBody>
              </Card>
            );
          })}
        </div>
        <Button
          className="mt-3 w-full"
          color="primary"
          isDisabled={
            !selectedTplTitles.length ||
            isSubmitting ||
            !gids ||
            gids.length < 1
          }
          isLoading={loading}
          onClick={() => {
            run({
              gid: gids[0],
              jewelrys: selectedTpls.map((items) => {
                const [level, type, name] = items.key.split('_');

                return {
                  level: Number(level),
                  type: Number(type),
                  name,
                  attributes: items.attributes,
                };
              }),
            });
          }}
        >
          {selectedTplTitles.length
            ? `发放已选选择的${selectedTplTitles.length}个模板`
            : '请选择模板进行发放'}
        </Button>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <h5>自定义发放信息</h5>
        <Select
          aria-label="首饰"
          placeholder="请选择首饰"
          {...register('jewelry', {
            required: true,
          })}
        >
          {jewelrySelectOptions.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </Select>
        <ul className="flex flex-col gap-4">
          {fields.map((field, index) => (
            <li key={field.id} className="flex gap-2">
              <div className="grid flex-grow grid-cols-4 gap-2">
                <Controller
                  name={`attributes.${index}.attribute`}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      aria-label="属性"
                      className="col-span-3"
                      placeholder="请选择属性"
                      isInvalid={!!errors.attributes?.[index]?.attribute}
                      selectedKeys={value ? [value.toString()] : []}
                      onChange={(v) => {
                        onChange(
                          v.target.value ? parseInt(v.target.value) : undefined
                        );
                      }}
                    >
                      {ATTRIBUTE_CONFIG.map(({ key, description }) => (
                        <SelectItem key={key} value={key}>
                          {description}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />

                <Input
                  aria-label="属性值"
                  type="number"
                  placeholder="属性值"
                  isInvalid={!!errors.attributes?.[index]?.value}
                  {...register(`attributes.${index}.value`, {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
              </div>

              <div
                className={cn('flex items-center', {
                  hidden: !fields || fields.length < 2,
                })}
              >
                <Icon
                  icon="carbon:subtract-filled"
                  width={24}
                  color="red"
                  onClick={() => {
                    remove(index);
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
        <Button
          onClick={() =>
            append(
              {} as {
                attribute: number;
                value: number;
              }
            )
          }
          startContent={<Icon width={24} icon="mdi:plus" />}
        >
          添加属性
        </Button>

        <div>
          <Controller
            name="saveAsTpl"
            control={control}
            render={({ field }) => (
              <Checkbox isSelected={field.value} onChange={field.onChange}>
                保存为模板
              </Checkbox>
            )}
          />
        </div>

        {saveAsTplValue && (
          <Input
            label="模板名称"
            placeholder="该名称作为唯一值，不可与之前添加的名称重复"
            isInvalid={!!errors['tplName']}
            errorMessage={errors['tplName']?.message}
            {...register('tplName', {
              required: saveAsTplValue,
            })}
          />
        )}

        <Button
          type="submit"
          color="primary"
          isDisabled={loading || !gids || gids.length < 1}
          isLoading={isSubmitting}
        >
          确认发送
        </Button>
      </form>
    </div>
  );
};
